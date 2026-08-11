import { useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ScrollAxis } from "./components/Axios/ScrollAxis";
import "./css/axis.css";
import "./css/scroll.css";

import { useElementScrollObserver } from "./hooks/useElementScrollObserver";
import { useFuture } from "./hooks/useFuture";
import { useMounted } from "./hooks/useMounted";
import { useTargetRect } from "./hooks/useTargetRect";
import type { ScrollToFutureInterface } from "./types/scroll-to-future.type";
import { isPageScrollTarget } from "./utils/helper";
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
    overlayHide = false,
}: ScrollToFutureInterface) => {
    const anchorRef = useRef<HTMLSpanElement | null>(null);
    const targetRef = useRef<HTMLElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);

    const mounted = useMounted();

    const [findedTarget, setFindedTarget] = useState<HTMLElement | null>(null);

    const config = merge({
        scrollBar,
        thumb,
        selectTheme,
        optionsTheme,
    });

    const vars = variables(config.optionsTheme);

    const mode = config.scrollBar.mode;
    const positionMode = config.scrollBar?.positionMode ?? "after";

    const superimposition = config.scrollBar?.superimposition ?? "over";

    const nativeScrollOnMobile = shouldUseNativeScrollbar() && nativeOnMobile;

    const metrics = useElementScrollObserver(findedTarget);

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

    const placement =
        findedTarget && !isPageScrollTarget(findedTarget) ? "local" : "fixed";
    const portalTarget =
        !mounted || !findedTarget
            ? null
            : placement === "local"
              ? findedTarget.parentElement
              : document.body;
    const overlayEnabled = Boolean(findedTarget && portalTarget);

    useTargetRect(
        findedTarget,
        portalTarget,
        overlayRef,
        placement,
        overlayEnabled,
    );

    if (!mounted || nativeScrollOnMobile) {
        return null;
    }

    const overlay =
        findedTarget && overlayEnabled ? (
            <div
                ref={overlayRef}
                className={`scroll-to-future__overlay ${placement === "fixed" ? "scroll-to-future__overlay--fixed" : "scroll-to-future__overlay--local"}`}
                data-scroll-to-future-overlay=""
            >
                {showY && (
                    <ScrollAxis
                        vars={vars}
                        theme={config.optionsTheme}
                        axis="y"
                        target={findedTarget}
                        metrics={metrics.y}
                        scrollBar={config.scrollBar}
                        thumb={config.thumb}
                        positionMode={positionMode}
                        superimposition={superimposition}
                        hasCrossAxis={showX}
                    />
                )}

                {showX && (
                    <ScrollAxis
                        vars={vars}
                        theme={config.optionsTheme}
                        axis="x"
                        target={findedTarget}
                        metrics={metrics.x}
                        scrollBar={config.scrollBar}
                        thumb={config.thumb}
                        positionMode={positionMode}
                        superimposition={superimposition}
                        hasCrossAxis={showY}
                    />
                )}
            </div>
        ) : null;

    return (
        <>
            {!target && (
                <span
                    ref={anchorRef}
                    aria-hidden="true"
                    style={{ display: "none" }}
                />
            )}

            {overlay && portalTarget && createPortal(overlay, portalTarget)}
        </>
    );
};
