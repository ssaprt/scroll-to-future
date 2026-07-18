import { useEffect, useState } from "react";

export const useRefReady = (target: HTMLElement | null | undefined): number => {
    const [tick, setTick] = useState(0);

    useEffect(() => {
        if (target) return;
        let rafId: number;
        const check = () => {
            if (target) {
                setTick((t) => t + 1);
            } else {
                rafId = requestAnimationFrame(check);
            }
        };
        rafId = requestAnimationFrame(check);
        return () => cancelAnimationFrame(rafId);
    }, [target]);

    return tick;
};
