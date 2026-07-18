import { ScrollToFutureThemeProps } from "../scroll-to-future.theme.type";

export const primary: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(0, 0, 0, 0.15)",
            borderRadius: "8px",
            transition: "background-color 0.3s ease",
        },
        hover: {
            backgroundColor: "rgba(0, 0, 0, 0.25)",
        },
        active: {
            backgroundColor: "rgba(0, 0, 0, 0.35)",
            transition: "background-color 0.15s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(255, 255, 255, 0.35)",
            borderRadius: "8px",
        },
        hover: {
            backgroundColor: "rgba(255, 255, 255, 0.55)",
            transform: "scale(1)",
            transition: "background-color 0s ease, transform 0s ease",
        },
        active: {
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            transform: "scale(1.1)",
            transition: "background-color 0.15s ease, transform 0.15s ease",
        },
    },
};
