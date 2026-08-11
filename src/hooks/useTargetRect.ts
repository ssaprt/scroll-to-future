import { type RefObject, useLayoutEffect } from "react";

const hostPositionRecords = new WeakMap<
    HTMLElement,
    { count: number; changed: boolean; originalInlinePosition: string }
>();

const retainPositionedHost = (host: HTMLElement) => {
    const currentRecord = hostPositionRecords.get(host);

    if (currentRecord) {
        currentRecord.count += 1;
        return () => {
            currentRecord.count -= 1;
            if (currentRecord.count > 0) {
                return;
            }
            if (currentRecord.changed && host.style.position === "relative") {
                host.style.position = currentRecord.originalInlinePosition;
            }
            hostPositionRecords.delete(host);
        };
    }

    const originalInlinePosition = host.style.position;
    const computedPosition = window.getComputedStyle(host).position;
    const changed = computedPosition === "static";

    if (changed) {
        host.style.position = "relative";
    }

    const record = {
        count: 1,
        changed,
        originalInlinePosition,
    };

    hostPositionRecords.set(host, record);

    return () => {
        record.count -= 1;
        if (record.count > 0) {
            return;
        }
        if (record.changed && host.style.position === "relative") {
            host.style.position = record.originalInlinePosition;
        }
        hostPositionRecords.delete(host);
    };
};

export const useTargetRect = (
    target: HTMLElement | null,
    portalHost: HTMLElement | null,
    overlayRef: RefObject<HTMLDivElement | null>,
    placement: "fixed" | "local",
    enabled: boolean,
): void => {
    useLayoutEffect(() => {
        if (!enabled || !target) {
            return;
        }

        if (placement === "local" && !portalHost) {
            return;
        }

        const releaseHostPosition =
            placement === "local" && portalHost
                ? retainPositionedHost(portalHost)
                : () => {};

        let rafId: number | null = null;

        const updatePosition = () => {
            const overlay = overlayRef.current;

            if (!overlay) {
                return;
            }

            if (placement === "local") {
                if (!portalHost) {
                    return;
                }

                const targetRect = target.getBoundingClientRect();
                const hostRect = portalHost.getBoundingClientRect();
                const left =
                    targetRect.left -
                    hostRect.left -
                    portalHost.clientLeft +
                    portalHost.scrollLeft +
                    target.clientLeft;
                const top =
                    targetRect.top -
                    hostRect.top -
                    portalHost.clientTop +
                    portalHost.scrollTop +
                    target.clientTop;
                const width = target.clientWidth;
                const height = target.clientHeight;

                overlay.style.transform = `translate3d(${left}px, ${top}px, 0)`;
                overlay.style.width = `${width}px`;
                overlay.style.height = `${height}px`;
                overlay.style.visibility =
                    width > 0 && height > 0 ? "visible" : "hidden";
                return;
            }

            const viewport = window.visualViewport;
            const width = viewport?.width ?? window.innerWidth;
            const height = viewport?.height ?? window.innerHeight;
            const left = viewport?.offsetLeft ?? 0;
            const top = viewport?.offsetTop ?? 0;

            overlay.style.transform = `translate3d(${left}px, ${top}px, 0)`;
            overlay.style.width = `${width}px`;
            overlay.style.height = `${height}px`;
            overlay.style.visibility =
                width > 0 && height > 0 ? "visible" : "hidden";
        };

        const scheduleUpdate = () => {
            if (rafId !== null) {
                return;
            }
            rafId = window.requestAnimationFrame(() => {
                rafId = null;
                updatePosition();
            });
        };

        const resizeObserver = new ResizeObserver(scheduleUpdate);
        const mutationObserver = new MutationObserver((mutations) => {
            const overlay = overlayRef.current;
            const shouldUpdate = mutations.some((mutation) => {
                if (!overlay) {
                    return true;
                }
                if (mutation.target === overlay) {
                    return false;
                }
                if (
                    mutation.target instanceof Node &&
                    overlay.contains(mutation.target)
                ) {
                    return false;
                }
                return true;
            });
            if (shouldUpdate) {
                scheduleUpdate();
            }
        });

        resizeObserver.observe(target);
        if (portalHost) {
            resizeObserver.observe(portalHost);
            mutationObserver.observe(portalHost, {
                attributes: true,
                childList: true,
                subtree: true,
                attributeFilter: ["class", "style", "hidden"],
            });
        }

        window.addEventListener("resize", scheduleUpdate, { passive: true });
        window.visualViewport?.addEventListener("resize", scheduleUpdate, {
            passive: true,
        });

        scheduleUpdate();

        return () => {
            resizeObserver.disconnect();
            mutationObserver.disconnect();
            releaseHostPosition();
            window.removeEventListener("resize", scheduleUpdate);
            window.visualViewport?.removeEventListener(
                "resize",
                scheduleUpdate,
            );
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, [enabled, overlayRef, placement, portalHost, target]);
};
