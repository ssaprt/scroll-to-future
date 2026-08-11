import { useEffect, useRef, useState } from "react";
import { DEFAULT_TRACK_THICKNESS } from "src/utils/constants";
import { computeReservedSpace, parsePxValue } from "src/utils/helper";
import { hideNativeScrollbar } from "src/utils/native-scrollbar";

type PaddingSide = "left" | "right" | "top" | "bottom";

type PaddingValues = Record<PaddingSide, number>;

type InlinePaddingValues = Record<PaddingSide, string>;

type Reservation = PaddingValues;

type PaddingRegistry = {
    base: PaddingValues;
    inline: InlinePaddingValues;
    reservations: Map<symbol, Reservation>;
};

const paddingRegistries = new WeakMap<HTMLElement, PaddingRegistry>();

const keyboardInputTypes = new Set([
    "text",
    "search",
    "email",
    "url",
    "tel",
    "password",
    "number",
    "date",
    "datetime-local",
    "month",
    "time",
    "week",
]);

const isKeyboardInput = (element: Element | null): boolean => {
    if (element instanceof HTMLTextAreaElement) {
        return !element.disabled && !element.readOnly;
    }

    if (element instanceof HTMLInputElement) {
        return (
            !element.disabled &&
            !element.readOnly &&
            keyboardInputTypes.has(element.type)
        );
    }

    return element instanceof HTMLElement && element.isContentEditable;
};

const getViewportReferenceHeight = (): number =>
    Math.max(
        document.documentElement.clientHeight,
        window.innerHeight,
        window.visualViewport?.height ?? 0,
    );

const useVirtualKeyboardOpen = (mounted: boolean): boolean => {
    const [open, setOpen] = useState(false);
    const baselineHeightRef = useRef(0);

    useEffect(() => {
        if (!mounted || typeof window === "undefined") {
            return;
        }

        const viewport = window.visualViewport;

        if (!viewport) {
            return;
        }

        let rafId: number | null = null;

        const update = () => {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }

            rafId = requestAnimationFrame(() => {
                rafId = null;

                const activeInput = isKeyboardInput(document.activeElement);
                const referenceHeight = getViewportReferenceHeight();

                if (!activeInput) {
                    baselineHeightRef.current = referenceHeight;
                    setOpen(false);
                    return;
                }

                if (baselineHeightRef.current <= 0) {
                    baselineHeightRef.current = referenceHeight;
                }

                baselineHeightRef.current = Math.max(
                    baselineHeightRef.current,
                    referenceHeight,
                );

                const hiddenHeight =
                    baselineHeightRef.current - viewport.height;

                const threshold = Math.max(
                    100,
                    baselineHeightRef.current * 0.15,
                );

                setOpen(hiddenHeight > threshold);
            });
        };

        const handleFocusIn = () => {
            if (isKeyboardInput(document.activeElement)) {
                baselineHeightRef.current = Math.max(
                    baselineHeightRef.current,
                    getViewportReferenceHeight(),
                );
            }

            update();
        };

        baselineHeightRef.current = getViewportReferenceHeight();

        document.addEventListener("focusin", handleFocusIn);
        document.addEventListener("focusout", update);
        window.addEventListener("resize", update);
        viewport.addEventListener("resize", update);
        viewport.addEventListener("scroll", update);

        update();

        return () => {
            document.removeEventListener("focusin", handleFocusIn);
            document.removeEventListener("focusout", update);
            window.removeEventListener("resize", update);
            viewport.removeEventListener("resize", update);
            viewport.removeEventListener("scroll", update);

            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [mounted]);

    return open;
};

const readPadding = (element: HTMLElement): PaddingValues => {
    const style = window.getComputedStyle(element);

    return {
        left: Number.parseFloat(style.paddingLeft) || 0,
        right: Number.parseFloat(style.paddingRight) || 0,
        top: Number.parseFloat(style.paddingTop) || 0,
        bottom: Number.parseFloat(style.paddingBottom) || 0,
    };
};

const readInlinePadding = (element: HTMLElement): InlinePaddingValues => ({
    left: element.style.paddingLeft,
    right: element.style.paddingRight,
    top: element.style.paddingTop,
    bottom: element.style.paddingBottom,
});

const getPaddingRegistry = (element: HTMLElement): PaddingRegistry => {
    const existing = paddingRegistries.get(element);

    if (existing) {
        return existing;
    }

    const registry: PaddingRegistry = {
        base: readPadding(element),
        inline: readInlinePadding(element),
        reservations: new Map(),
    };

    paddingRegistries.set(element, registry);

    return registry;
};

const applyPaddingRegistry = (
    element: HTMLElement,
    registry: PaddingRegistry,
) => {
    const reserved: PaddingValues = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    };

    for (const reservation of registry.reservations.values()) {
        reserved.left = Math.max(reserved.left, reservation.left);
        reserved.right = Math.max(reserved.right, reservation.right);
        reserved.top = Math.max(reserved.top, reservation.top);
        reserved.bottom = Math.max(reserved.bottom, reservation.bottom);
    }

    element.style.paddingLeft = `${registry.base.left + reserved.left}px`;
    element.style.paddingRight = `${registry.base.right + reserved.right}px`;
    element.style.paddingTop = `${registry.base.top + reserved.top}px`;
    element.style.paddingBottom = `${registry.base.bottom + reserved.bottom}px`;
};

const restoreInlinePadding = (
    element: HTMLElement,
    registry: PaddingRegistry,
) => {
    element.style.paddingLeft = registry.inline.left;
    element.style.paddingRight = registry.inline.right;
    element.style.paddingTop = registry.inline.top;
    element.style.paddingBottom = registry.inline.bottom;
};

const setPaddingReservation = (
    element: HTMLElement,
    id: symbol,
    reservation: Reservation,
) => {
    const registry = getPaddingRegistry(element);

    registry.reservations.set(id, reservation);
    applyPaddingRegistry(element, registry);
};

const removePaddingReservation = (element: HTMLElement, id: symbol) => {
    const registry = paddingRegistries.get(element);

    if (!registry) {
        return;
    }

    registry.reservations.delete(id);

    if (registry.reservations.size === 0) {
        restoreInlinePadding(element, registry);
        paddingRegistries.delete(element);
        return;
    }

    applyPaddingRegistry(element, registry);
};

export const useFuture = ({
    target,
    anchorRef,
    targetRef,
    setFindedTarget,
    mounted,
    config,
    showY,
    showX,
    superimposition,
    findedTarget,
    positionMode,
    coversAllScrollableAxes,
    nativeOnMobile,
}: {
    target?: React.RefObject<HTMLElement | null> | null;
    anchorRef: React.RefObject<HTMLSpanElement | null>;
    targetRef: React.RefObject<HTMLElement | null>;
    setFindedTarget: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    mounted: boolean;
    config: any;
    showY: boolean;
    showX: boolean;
    superimposition: "over" | "after";
    findedTarget: HTMLElement | null;
    positionMode: "before" | "after";
    coversAllScrollableAxes: boolean;
    nativeOnMobile: boolean;
}) => {
    const reservationIdRef = useRef(Symbol("scroll-to-future-reservation"));
    const virtualKeyboardOpen = useVirtualKeyboardOpen(mounted);

    useEffect(() => {
        if (!mounted) return;

        let rafId: number | null = null;
        let stopped = false;

        const getPageTarget = (): HTMLElement =>
            document.scrollingElement instanceof HTMLElement
                ? document.scrollingElement
                : document.documentElement;

        const resolveTarget = () => {
            if (stopped) return;

            const explicitTarget = target?.current ?? null;
            const parentTarget = anchorRef.current?.parentElement ?? null;

            const nextTarget =
                explicitTarget ?? parentTarget ?? getPageTarget();

            targetRef.current = nextTarget;

            setFindedTarget((previousTarget) =>
                previousTarget === nextTarget ? previousTarget : nextTarget,
            );

            if (target && !explicitTarget) {
                rafId = requestAnimationFrame(resolveTarget);
            }
        };

        resolveTarget();

        return () => {
            stopped = true;

            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [mounted, target, anchorRef, targetRef, setFindedTarget]);

    useEffect(() => {
        const element = findedTarget ?? targetRef.current;

        if (!element) return;

        const trackThickness =
            parsePxValue(config.scrollBar?.widthTrack) ??
            DEFAULT_TRACK_THICKNESS;

        const reservationMode = virtualKeyboardOpen ? "over" : superimposition;

        const reservedY = showY
            ? computeReservedSpace(
                  config.scrollBar?.boundaryOffset,
                  trackThickness,
                  reservationMode,
              )
            : 0;

        const reservedX = showX
            ? computeReservedSpace(
                  config.scrollBar?.boundaryOffset,
                  trackThickness,
                  reservationMode,
              )
            : 0;

        const reservation: Reservation = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        };

        if (reservedY > 0) {
            if (positionMode === "before") {
                reservation.left = reservedY;
            } else {
                reservation.right = reservedY;
            }
        }

        if (reservedX > 0) {
            if (positionMode === "before") {
                reservation.top = reservedX;
            } else {
                reservation.bottom = reservedX;
            }
        }

        const reservationId = reservationIdRef.current;

        setPaddingReservation(element, reservationId, reservation);

        return () => {
            removePaddingReservation(element, reservationId);
        };
    }, [
        findedTarget,
        showX,
        showY,
        positionMode,
        superimposition,
        config.scrollBar?.boundaryOffset,
        config.scrollBar?.widthTrack,
        virtualKeyboardOpen,
    ]);

    useEffect(() => {
        if (!findedTarget) return;

        const mode = config.scrollBar?.hideNativeScrollbar ?? false;

        if (mode === false || !coversAllScrollableAxes) {
            return;
        }

        return hideNativeScrollbar(findedTarget, mode, nativeOnMobile);
    }, [
        findedTarget,
        coversAllScrollableAxes,
        nativeOnMobile,
        config.scrollBar?.hideNativeScrollbar,
    ]);
};
