import { useRef, useState } from "react";
import { ScrollAxis } from "./components/Axios/ScrollAxis";
import "./css/axis.css";
import "./css/scroll.css";

import { useElementScrollObserver } from "./hooks/useElementScrollObserver";
import { useFuture } from "./hooks/useFuture";
import { useMounted } from "./hooks/useMounted";
import { useTargetRect } from "./hooks/useTargetRect";
import type { ScrollToFutureInterface } from "./types/scroll-to-future.type";
import { merge } from "./utils/merge";
import { shouldUseNativeScrollbar } from "./utils/mobile-detect";

import { variables } from "./utils/variables-css";

export const ScrollToFuture = ({
    target,
    scrollBar = {},
    thumb = {},
    selectTheme = "primary",
    optionsTheme = {},
    nativeOnMobile = true,
}: ScrollToFutureInterface) => {
    const anchorRef = useRef<HTMLSpanElement | null>(null);
    const targetRef = useRef<HTMLElement | null>(null);
    const mounted = useMounted();
    const [findedTarget, setFindedTarget] = useState<HTMLElement | null>(null);

    const config = merge({ scrollBar, thumb, selectTheme, optionsTheme });
    const vars = variables(config.optionsTheme);
    const mode = config.scrollBar?.mode ?? "both";
    const positionMode = config.scrollBar?.positionMode ?? "after";
    const superimposition = config.scrollBar?.superimposition ?? "over";
    const nativeScrollOnMobile = shouldUseNativeScrollbar() && nativeOnMobile;

    const metrics = useElementScrollObserver(findedTarget);
    const rect = useTargetRect(findedTarget);
    const wantsY = mode === "vertical" || mode === "both";
    const wantsX = mode === "horizontal" || mode === "both";
    const showY = wantsY && metrics.y.canScroll;
    const showX = wantsX && metrics.x.canScroll;
    const coversAllScrollableAxes =
        (!metrics.x.canScroll || showX) && (!metrics.y.canScroll || showY);

    useFuture({
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
    });

    if (!mounted || nativeScrollOnMobile) {
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
