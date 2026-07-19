export const shouldUseNativeScrollbar = (): boolean => {
    if (typeof window === "undefined") {
        return true;
    }

    const primaryPointerIsCoarse =
        window.matchMedia("(pointer: coarse)").matches;

    const hasAnyFinePointer = window.matchMedia("(any-pointer: fine)").matches;

    return primaryPointerIsCoarse && !hasAnyFinePointer;
};
