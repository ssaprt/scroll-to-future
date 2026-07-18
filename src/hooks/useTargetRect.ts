import { useEffect, useState } from "react";
import { isPageScrollTarget } from "../utils/helper";
import { useRefReady } from "./useRefReady";

export interface TargetRect {
    top: number;
    left: number;
    width: number;
    height: number;
}

const EMPTY_RECT: TargetRect = { top: 0, left: 0, width: 0, height: 0 };

export const useTargetRect = (
    target: HTMLElement | null | undefined,
): TargetRect => {
    const [rect, setRect] = useState<TargetRect>(EMPTY_RECT);
    const ready = useRefReady(target);

    useEffect(() => {
        const el = target;
        if (!el) {
            //eslint-disable-next-line
            setRect(EMPTY_RECT);
            return;
        }

        let rafId: number | null = null;
        const pageScroll = isPageScrollTarget(el);

        const measure = () => {
            const r = pageScroll
                ? {
                      top: 0,
                      left: 0,
                      width: window.innerWidth,
                      height: window.innerHeight,
                  }
                : el.getBoundingClientRect();
            setRect((prev) => {
                if (
                    prev.top === r.top &&
                    prev.left === r.left &&
                    prev.width === r.width &&
                    prev.height === r.height
                ) {
                    return prev;
                }
                return {
                    top: r.top,
                    left: r.left,
                    width: r.width,
                    height: r.height,
                };
            });
        };

        const scheduleMeasure = () => {
            if (rafId != null) return;
            rafId = requestAnimationFrame(() => {
                rafId = null;
                measure();
            });
        };

        measure();

        const resizeObserver = new ResizeObserver(scheduleMeasure);
        resizeObserver.observe(el);

        window.addEventListener("scroll", scheduleMeasure, {
            capture: true,
            passive: true,
        });
        window.addEventListener("resize", scheduleMeasure);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("scroll", scheduleMeasure, true);
            window.removeEventListener("resize", scheduleMeasure);
            if (rafId != null) cancelAnimationFrame(rafId);
        };
    }, [target, ready]);

    return rect;
};
