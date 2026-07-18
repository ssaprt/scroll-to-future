import { useEffect, useRef, useState } from "react";
import { ScrollAxis } from "./components/Axios/ScrollAxis";
import "./css/axis.css";
import "./css/scroll.css";
import { DEFAULT_TRACK_THICKNESS } from "./utils/constants";
import { computeReservedSpace, parsePxValue } from "./utils/helper";

import { useElementScrollObserver } from "./hooks/useElementScrollObserver";
import { useMounted } from "./hooks/useMounted";
import { useTargetRect } from "./hooks/useTargetRect";
import type { ScrollToFutureInterface } from "./types/scroll-to-future.type";
import { merge } from "./utils/merge";
import { variables } from "./utils/variables-css";

export const ScrollToFuture = ({
    target,
    scrollBar = {},
    thumb = {},
    selectTheme = "primary",
    optionsTheme = {},
}: ScrollToFutureInterface) => {
    const anchorRef = useRef<HTMLSpanElement>(null);
    const targetRef = useRef<HTMLElement | null>(null);
    const mounted = useMounted();
    const [findedTarget, setFindedTarget] = useState<HTMLElement | null>(null);

    const config = merge({ scrollBar, thumb, selectTheme, optionsTheme });
    const vars = variables(config.optionsTheme);
    console.log(vars);
    const mode = config.scrollBar?.mode ?? "both";
    const positionMode = config.scrollBar?.positionMode ?? "after";
    const superimposition = config.scrollBar?.superimposition ?? "over";

    useEffect(() => {
        if (!mounted) return;

        let rafId: number | null = null;

        const resolveTarget = () => {
            const nextTarget = target
                ? target.current
                : (anchorRef.current?.parentElement ?? null);

            if (nextTarget) {
                targetRef.current = nextTarget;
                setFindedTarget((previousTarget) =>
                    previousTarget === nextTarget ? previousTarget : nextTarget,
                );
                return;
            }
            rafId = requestAnimationFrame(resolveTarget);
        };
        resolveTarget();

        return () => {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [mounted, target]);

    const metrics = useElementScrollObserver(findedTarget);
    const rect = useTargetRect(findedTarget);
    const wantsY = mode === "vertical" || mode === "both";
    const wantsX = mode === "horizontal" || mode === "both";
    const showY = wantsY && metrics.y.canScroll;
    const showX = wantsX && metrics.x.canScroll;

    useEffect(() => {
        const el = targetRef.current;
        if (!el) return;

        const trackThickness =
            parsePxValue(config.scrollBar?.widthTrack) ??
            DEFAULT_TRACK_THICKNESS;
        const reservedY = showY
            ? computeReservedSpace(
                  config.scrollBar?.boundaryOffset,
                  trackThickness,
                  superimposition,
              )
            : 0;
        const reservedX = showX
            ? computeReservedSpace(
                  config.scrollBar?.boundaryOffset,
                  trackThickness,
                  superimposition,
              )
            : 0;
        const previousInlinePadding = {
            left: el.style.paddingLeft,
            right: el.style.paddingRight,
            top: el.style.paddingTop,
            bottom: el.style.paddingBottom,
        };
        const computedStyle = window.getComputedStyle(el);
        const basePadding = {
            left: Number.parseFloat(computedStyle.paddingLeft) || 0,
            right: Number.parseFloat(computedStyle.paddingRight) || 0,
            top: Number.parseFloat(computedStyle.paddingTop) || 0,
            bottom: Number.parseFloat(computedStyle.paddingBottom) || 0,
        };

        if (reservedY > 0) {
            if (positionMode === "before") {
                el.style.paddingLeft = `${basePadding.left + reservedY}px`;
            } else {
                el.style.paddingRight = `${basePadding.right + reservedY}px`;
            }
        }

        if (reservedX > 0) {
            if (positionMode === "before") {
                el.style.paddingTop = `${basePadding.top + reservedX}px`;
            } else {
                el.style.paddingBottom = `${basePadding.bottom + reservedX}px`;
            }
        }

        return () => {
            el.style.paddingLeft = previousInlinePadding.left;
            el.style.paddingRight = previousInlinePadding.right;
            el.style.paddingTop = previousInlinePadding.top;
            el.style.paddingBottom = previousInlinePadding.bottom;
        };
    }, [
        findedTarget,
        showX,
        showY,
        positionMode,
        superimposition,
        config.scrollBar?.boundaryOffset,
        config.scrollBar?.widthTrack,
    ]);

    if (!mounted) {
        return null;
    }

    const canRenderOverlay =
        findedTarget !== null && rect.width > 0 && rect.height > 0;

    return (
        <>
            {!target && (
                <span
                    ref={anchorRef}
                    aria-hidden="true"
                    style={{ display: "none" }}
                />
            )}

            {canRenderOverlay && (
                <div
                    className="scroll-to-future__overlay"
                    style={{
                        top: rect.top,
                        left: rect.left,
                        width: rect.width,
                        height: rect.height,
                    }}
                >
                    {showY && (
                        <ScrollAxis
                            vars={vars}
                            axis="y"
                            target={findedTarget}
                            metrics={metrics.y}
                            scrollBar={config.scrollBar!}
                            thumb={thumb}
                            positionMode={positionMode}
                            superimposition={superimposition}
                            hasCrossAxis={showX}
                        />
                    )}

                    {showX && (
                        <ScrollAxis
                            vars={vars}
                            axis="x"
                            target={findedTarget}
                            metrics={metrics.x}
                            scrollBar={config.scrollBar!}
                            thumb={thumb}
                            positionMode={positionMode}
                            superimposition={superimposition}
                            hasCrossAxis={showY}
                        />
                    )}
                </div>
            )}
        </>
    );
};
