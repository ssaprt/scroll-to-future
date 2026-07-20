import { useEffect, useRef, useState } from "react";
import { isPageScrollTarget } from "../utils/helper";

export interface TargetRect {
    top: number;
    left: number;
    width: number;
    height: number;

    clipTop: number;
    clipRight: number;
    clipBottom: number;
    clipLeft: number;

    isVisible: boolean;
}

const EMPTY_RECT: TargetRect = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,

    clipTop: 0,
    clipRight: 0,
    clipBottom: 0,
    clipLeft: 0,

    isVisible: false,
};

const EPSILON = 0.1;

const isNearlyEqual = (first: number, second: number): boolean =>
    Math.abs(first - second) < EPSILON;

const areRectsEqual = (first: TargetRect, second: TargetRect): boolean =>
    isNearlyEqual(first.top, second.top) &&
    isNearlyEqual(first.left, second.left) &&
    isNearlyEqual(first.width, second.width) &&
    isNearlyEqual(first.height, second.height) &&
    isNearlyEqual(first.clipTop, second.clipTop) &&
    isNearlyEqual(first.clipRight, second.clipRight) &&
    isNearlyEqual(first.clipBottom, second.clipBottom) &&
    isNearlyEqual(first.clipLeft, second.clipLeft) &&
    first.isVisible === second.isVisible;

const CLIPPING_OVERFLOW = /^(hidden|clip|auto|scroll|overlay)$/;

const getElementClipRect = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();

    const left = rect.left + element.clientLeft;
    const top = rect.top + element.clientTop;

    return {
        left,
        top,
        right: left + element.clientWidth,
        bottom: top + element.clientHeight,
    };
};

const measureTarget = (target: HTMLElement): TargetRect => {
    if (isPageScrollTarget(target)) {
        const viewport = window.visualViewport;

        const width = viewport?.width ?? document.documentElement.clientWidth;

        const height =
            viewport?.height ?? document.documentElement.clientHeight;

        return {
            top: viewport?.offsetTop ?? 0,
            left: viewport?.offsetLeft ?? 0,
            width,
            height,

            clipTop: 0,
            clipRight: 0,
            clipBottom: 0,
            clipLeft: 0,

            isVisible: width > 0 && height > 0,
        };
    }

    const targetRect = target.getBoundingClientRect();

    const viewport = window.visualViewport;

    const viewportLeft = viewport?.offsetLeft ?? 0;
    const viewportTop = viewport?.offsetTop ?? 0;

    const viewportWidth =
        viewport?.width ?? document.documentElement.clientWidth;

    const viewportHeight =
        viewport?.height ?? document.documentElement.clientHeight;

    let visibleLeft = viewportLeft;
    let visibleTop = viewportTop;
    let visibleRight = viewportLeft + viewportWidth;
    let visibleBottom = viewportTop + viewportHeight;

    let parent = target.parentElement;

    while (
        parent &&
        parent !== document.body &&
        parent !== document.documentElement
    ) {
        const style = window.getComputedStyle(parent);

        const paintContain = /\b(paint|strict|content)\b/.test(style.contain);

        const clipsX = paintContain || CLIPPING_OVERFLOW.test(style.overflowX);

        const clipsY = paintContain || CLIPPING_OVERFLOW.test(style.overflowY);

        if (clipsX || clipsY) {
            const parentClipRect = getElementClipRect(parent);

            if (clipsX) {
                visibleLeft = Math.max(visibleLeft, parentClipRect.left);

                visibleRight = Math.min(visibleRight, parentClipRect.right);
            }

            if (clipsY) {
                visibleTop = Math.max(visibleTop, parentClipRect.top);

                visibleBottom = Math.min(visibleBottom, parentClipRect.bottom);
            }
        }

        parent = parent.parentElement;
    }

    const intersectionLeft = Math.max(targetRect.left, visibleLeft);

    const intersectionTop = Math.max(targetRect.top, visibleTop);

    const intersectionRight = Math.min(targetRect.right, visibleRight);

    const intersectionBottom = Math.min(targetRect.bottom, visibleBottom);

    const isVisible =
        intersectionRight > intersectionLeft &&
        intersectionBottom > intersectionTop;

    const clipTop = Math.max(0, intersectionTop - targetRect.top);

    const clipRight = Math.max(0, targetRect.right - intersectionRight);

    const clipBottom = Math.max(0, targetRect.bottom - intersectionBottom);

    const clipLeft = Math.max(0, intersectionLeft - targetRect.left);

    return {
        top: targetRect.top,
        left: targetRect.left,
        width: targetRect.width,
        height: targetRect.height,

        clipTop,
        clipRight,
        clipBottom,
        clipLeft,

        isVisible,
    };
};

export const useTargetRect = (target: HTMLElement | null): TargetRect => {
    const [rect, setRect] = useState<TargetRect>(EMPTY_RECT);

    const lastRectRef = useRef<TargetRect>(EMPTY_RECT);

    useEffect(() => {
        if (!target) {
            lastRectRef.current = EMPTY_RECT;
            setRect(EMPTY_RECT);

            return;
        }

        let frameId = 0;
        let destroyed = false;

        const update = () => {
            if (destroyed) return;

            if (!target.isConnected) {
                if (!areRectsEqual(lastRectRef.current, EMPTY_RECT)) {
                    lastRectRef.current = EMPTY_RECT;
                    setRect(EMPTY_RECT);
                }

                frameId = requestAnimationFrame(update);
                return;
            }

            const nextRect = measureTarget(target);

            if (!areRectsEqual(lastRectRef.current, nextRect)) {
                lastRectRef.current = nextRect;
                setRect(nextRect);
            }

            frameId = requestAnimationFrame(update);
        };

        const initialRect = measureTarget(target);

        lastRectRef.current = initialRect;
        setRect(initialRect);

        frameId = requestAnimationFrame(update);

        return () => {
            destroyed = true;
            cancelAnimationFrame(frameId);
        };
    }, [target]);

    return rect;
};
