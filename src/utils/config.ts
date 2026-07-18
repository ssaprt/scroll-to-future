import { ScrollToFutureInterface } from "../types/scroll-to-future.type";

export const defaultConfig: Required<Omit<ScrollToFutureInterface, "target">> =
    {
        scrollBar: {
            mode: "both",
            positionMode: "after",
            superimposition: "after",
            boundaryOffset: "4px",
            heightTrack: "98%",
        },

        thumb: {
            boundaryOffset: "1px 1px",
            heightTrack: "auto",
        },

        selectTheme: "primary",
        optionsTheme: {},
    };
