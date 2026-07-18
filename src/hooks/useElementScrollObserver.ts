import { useEffect, useRef, useState } from "react";
import { isPageScrollTarget } from "../utils/helper";

import { AxisMetrics, TargetMetrics } from "../types/config/axis.type";
import { EMPTY_AXIS_METRICS } from "../utils/constants";
import { useRefReady } from "./useRefReady";

const isSameAxisMetrics = (previous: AxisMetrics, next: AxisMetrics): boolean =>
    previous.scrollSize === next.scrollSize &&
    previous.clientSize === next.clientSize &&
    previous.scrollPos === next.scrollPos &&
    previous.canScroll === next.canScroll;

const getActualScrollPosition = (...values: number[]): number =>
    values.reduce((current, value) => {
        return Math.abs(value) > Math.abs(current) ? value : current;
    }, 0);

export const useElementScrollObserver = (
    target: HTMLElement | null | undefined,
): TargetMetrics => {
    const [metrics, setMetrics] = useState<TargetMetrics>({
        x: EMPTY_AXIS_METRICS,
        y: EMPTY_AXIS_METRICS,
    });

    const rafRef = useRef<number | null>(null);
    const ready = useRefReady(target);

    useEffect(() => {
        const targetElement = target;

        if (!targetElement) {
            //eslint-disable-next-line
            setMetrics({
                x: EMPTY_AXIS_METRICS,
                y: EMPTY_AXIS_METRICS,
            });

            return;
        }

        const pageScroll = isPageScrollTarget(targetElement);

        const measure = () => {
            let nextX: AxisMetrics;
            let nextY: AxisMetrics;

            if (pageScroll) {
                const root = document.documentElement;
                const body = document.body;
                const scrollingElement =
                    document.scrollingElement as HTMLElement | null;

                const scrollWidth = Math.max(
                    root.scrollWidth,
                    body.scrollWidth,
                    scrollingElement?.scrollWidth ?? 0,
                    targetElement.scrollWidth,
                );

                const scrollHeight = Math.max(
                    root.scrollHeight,
                    body.scrollHeight,
                    scrollingElement?.scrollHeight ?? 0,
                    targetElement.scrollHeight,
                );

                const clientWidth =
                    window.visualViewport?.width ?? window.innerWidth;

                const clientHeight =
                    window.visualViewport?.height ?? window.innerHeight;

                /*
                 * Важно: не читаем только window.scrollY.
                 * body может быть самостоятельным overflow-контейнером.
                 */
                const scrollLeft = getActualScrollPosition(
                    window.scrollX,
                    root.scrollLeft,
                    body.scrollLeft,
                    scrollingElement?.scrollLeft ?? 0,
                    targetElement.scrollLeft,
                );

                const scrollTop = getActualScrollPosition(
                    window.scrollY,
                    root.scrollTop,
                    body.scrollTop,
                    scrollingElement?.scrollTop ?? 0,
                    targetElement.scrollTop,
                );

                nextX = {
                    scrollSize: scrollWidth,
                    clientSize: clientWidth,
                    scrollPos: scrollLeft,
                    canScroll: scrollWidth - clientWidth > 1,
                };

                nextY = {
                    scrollSize: scrollHeight,
                    clientSize: clientHeight,
                    scrollPos: scrollTop,
                    canScroll: scrollHeight - clientHeight > 1,
                };
            } else {
                nextX = {
                    scrollSize: targetElement.scrollWidth,
                    clientSize: targetElement.clientWidth,
                    scrollPos: targetElement.scrollLeft,
                    canScroll:
                        targetElement.scrollWidth - targetElement.clientWidth >
                        1,
                };

                nextY = {
                    scrollSize: targetElement.scrollHeight,
                    clientSize: targetElement.clientHeight,
                    scrollPos: targetElement.scrollTop,
                    canScroll:
                        targetElement.scrollHeight -
                            targetElement.clientHeight >
                        1,
                };
            }

            setMetrics((previous) => {
                const sameX = isSameAxisMetrics(previous.x, nextX);
                const sameY = isSameAxisMetrics(previous.y, nextY);

                if (sameX && sameY) {
                    return previous;
                }

                return {
                    x: nextX,
                    y: nextY,
                };
            });
        };

        const scheduleMeasure = () => {
            if (rafRef.current !== null) return;

            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;
                measure();
            });
        };

        measure();

        const resizeObserver = new ResizeObserver(scheduleMeasure);

        if (pageScroll) {
            resizeObserver.observe(document.documentElement);
            resizeObserver.observe(document.body);

            if (
                targetElement !== document.documentElement &&
                targetElement !== document.body
            ) {
                resizeObserver.observe(targetElement);
            }
        } else {
            resizeObserver.observe(targetElement);

            Array.from(targetElement.children).forEach((child) => {
                resizeObserver.observe(child);
            });
        }

        const mutationRoot = pageScroll
            ? document.documentElement
            : targetElement;

        const mutationObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type !== "childList") continue;

                mutation.addedNodes.forEach((node) => {
                    if (!(node instanceof Element)) return;

                    try {
                        resizeObserver.observe(node);
                    } catch {}
                });
            }

            scheduleMeasure();
        });

        mutationObserver.observe(mutationRoot, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["style", "class", "hidden"],
        });

        window.addEventListener("scroll", scheduleMeasure, {
            capture: true,
            passive: true,
        });

        targetElement.addEventListener("scroll", scheduleMeasure, {
            passive: true,
        });

        window.addEventListener("resize", scheduleMeasure);

        window.visualViewport?.addEventListener("resize", scheduleMeasure);

        window.visualViewport?.addEventListener("scroll", scheduleMeasure);

        return () => {
            resizeObserver.disconnect();
            mutationObserver.disconnect();

            window.removeEventListener("scroll", scheduleMeasure, true);

            targetElement.removeEventListener("scroll", scheduleMeasure);

            window.removeEventListener("resize", scheduleMeasure);

            window.visualViewport?.removeEventListener(
                "resize",
                scheduleMeasure,
            );

            window.visualViewport?.removeEventListener(
                "scroll",
                scheduleMeasure,
            );

            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, [target, ready]);

    return metrics;
};
