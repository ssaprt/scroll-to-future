import { ScrollToFutureThemeProps } from "src/types/theme/scroll-to-future.theme.type";

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

export const midnight: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(15, 23, 42, 0.55)",
            borderRadius: "8px",
            transition: "background-color 0.3s ease",
        },
        hover: {
            backgroundColor: "rgba(30, 41, 59, 0.72)",
        },
        active: {
            backgroundColor: "rgba(51, 65, 85, 0.88)",
            transition: "background-color 0.15s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(148, 163, 184, 0.55)",
            borderRadius: "8px",
        },
        hover: {
            backgroundColor: "rgba(203, 213, 225, 0.78)",
            transform: "scale(1)",
            transition: "background-color 0s ease, transform 0s ease",
        },
        active: {
            backgroundColor: "rgba(241, 245, 249, 0.96)",
            transform: "scale(1.1)",
            transition: "background-color 0.15s ease, transform 0.15s ease",
        },
    },
};

export const neonCyan: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(6, 78, 89, 0.35)",
            borderRadius: "4px",
            transition: "background-color 0.25s ease",
        },
        hover: {
            backgroundColor: "rgba(8, 145, 178, 0.48)",
        },
        active: {
            backgroundColor: "rgba(14, 116, 144, 0.68)",
            transition: "background-color 0.12s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(34, 211, 238, 0.58)",
            borderRadius: "3px",
        },
        hover: {
            backgroundColor: "rgba(103, 232, 249, 0.85)",
            transform: "scale(1.02)",
            transition: "background-color 0.15s ease, transform 0.15s ease",
        },
        active: {
            backgroundColor: "rgba(207, 250, 254, 1)",
            transform: "scale(1.12)",
            transition: "background-color 0.12s ease, transform 0.12s ease",
        },
    },
};

export const ocean: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(7, 89, 133, 0.22)",
            borderRadius: "999px",
            transition: "background-color 0.35s ease",
        },
        hover: {
            backgroundColor: "rgba(3, 105, 161, 0.35)",
        },
        active: {
            backgroundColor: "rgba(2, 132, 199, 0.5)",
            transition: "background-color 0.18s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(14, 165, 233, 0.58)",
            borderRadius: "999px",
        },
        hover: {
            backgroundColor: "rgba(56, 189, 248, 0.82)",
            transform: "scale(1)",
            transition: "background-color 0.2s ease",
        },
        active: {
            backgroundColor: "rgba(186, 230, 253, 0.98)",
            transform: "scale(1.08)",
            transition: "background-color 0.14s ease, transform 0.14s ease",
        },
    },
};

export const deepSea: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(2, 44, 55, 0.62)",
            borderRadius: "999px",
            transition: "background-color 0.3s ease",
        },
        hover: {
            backgroundColor: "rgba(6, 78, 89, 0.78)",
        },
        active: {
            backgroundColor: "rgba(14, 116, 144, 0.9)",
            transition: "background-color 0.15s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(8, 145, 178, 0.62)",
            borderRadius: "999px",
        },
        hover: {
            backgroundColor: "rgba(34, 211, 238, 0.82)",
            transform: "scale(1.03)",
            transition: "background-color 0.18s ease, transform 0.18s ease",
        },
        active: {
            backgroundColor: "rgba(165, 243, 252, 0.98)",
            transform: "scale(1.12)",
            transition: "background-color 0.12s ease, transform 0.12s ease",
        },
    },
};

export const forest: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(20, 83, 45, 0.25)",
            borderRadius: "999px",
            transition: "background-color 0.3s ease",
        },
        hover: {
            backgroundColor: "rgba(21, 128, 61, 0.38)",
        },
        active: {
            backgroundColor: "rgba(22, 163, 74, 0.52)",
            transition: "background-color 0.15s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(34, 197, 94, 0.55)",
            borderRadius: "999px",
        },
        hover: {
            backgroundColor: "rgba(74, 222, 128, 0.8)",
            transform: "scale(1)",
            transition: "background-color 0.2s ease",
        },
        active: {
            backgroundColor: "rgba(187, 247, 208, 0.98)",
            transform: "scale(1.1)",
            transition: "background-color 0.15s ease, transform 0.15s ease",
        },
    },
};

export const moss: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(54, 83, 20, 0.28)",
            borderRadius: "6px",
            transition: "background-color 0.3s ease",
        },
        hover: {
            backgroundColor: "rgba(63, 98, 18, 0.42)",
        },
        active: {
            backgroundColor: "rgba(77, 124, 15, 0.58)",
            transition: "background-color 0.14s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(132, 204, 22, 0.55)",
            borderRadius: "5px",
        },
        hover: {
            backgroundColor: "rgba(163, 230, 53, 0.8)",
            transform: "scale(1.02)",
            transition: "background-color 0.18s ease, transform 0.18s ease",
        },
        active: {
            backgroundColor: "rgba(217, 249, 157, 0.98)",
            transform: "scale(1.1)",
            transition: "background-color 0.12s ease, transform 0.12s ease",
        },
    },
};

export const lava: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(69, 10, 10, 0.45)",
            borderRadius: "999px",
            transition: "background-color 0.22s ease",
        },
        hover: {
            backgroundColor: "rgba(127, 29, 29, 0.62)",
        },
        active: {
            backgroundColor: "rgba(153, 27, 27, 0.78)",
            transition: "background-color 0.1s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(239, 68, 68, 0.62)",
            borderRadius: "999px",
        },
        hover: {
            backgroundColor: "rgba(249, 115, 22, 0.88)",
            transform: "scale(1.03)",
            transition: "background-color 0.16s ease, transform 0.16s ease",
        },
        active: {
            backgroundColor: "rgba(253, 186, 116, 1)",
            transform: "scale(1.14)",
            transition: "background-color 0.1s ease, transform 0.1s ease",
        },
    },
};

export const ember: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(67, 20, 7, 0.32)",
            borderRadius: "5px",
            transition: "background-color 0.25s ease",
        },
        hover: {
            backgroundColor: "rgba(124, 45, 18, 0.48)",
        },
        active: {
            backgroundColor: "rgba(154, 52, 18, 0.65)",
            transition: "background-color 0.12s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(234, 88, 12, 0.6)",
            borderRadius: "4px",
        },
        hover: {
            backgroundColor: "rgba(251, 146, 60, 0.86)",
            transform: "scale(1)",
            transition: "background-color 0.18s ease",
        },
        active: {
            backgroundColor: "rgba(254, 215, 170, 0.98)",
            transform: "scale(1.1)",
            transition: "background-color 0.12s ease, transform 0.12s ease",
        },
    },
};

export const gold: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(113, 63, 18, 0.25)",
            borderRadius: "999px",
            transition: "background-color 0.3s ease",
        },
        hover: {
            backgroundColor: "rgba(161, 98, 7, 0.4)",
        },
        active: {
            backgroundColor: "rgba(202, 138, 4, 0.55)",
            transition: "background-color 0.15s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(234, 179, 8, 0.62)",
            borderRadius: "999px",
        },
        hover: {
            backgroundColor: "rgba(250, 204, 21, 0.85)",
            transform: "scale(1.02)",
            transition: "background-color 0.2s ease, transform 0.2s ease",
        },
        active: {
            backgroundColor: "rgba(254, 240, 138, 1)",
            transform: "scale(1.1)",
            transition: "background-color 0.14s ease, transform 0.14s ease",
        },
    },
};

export const roseQuartz: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(136, 19, 55, 0.18)",
            borderRadius: "999px",
            transition: "background-color 0.32s ease",
        },
        hover: {
            backgroundColor: "rgba(190, 24, 93, 0.28)",
        },
        active: {
            backgroundColor: "rgba(219, 39, 119, 0.4)",
            transition: "background-color 0.16s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(251, 113, 133, 0.58)",
            borderRadius: "999px",
        },
        hover: {
            backgroundColor: "rgba(244, 114, 182, 0.8)",
            transform: "scale(1)",
            transition: "background-color 0.2s ease",
        },
        active: {
            backgroundColor: "rgba(253, 164, 175, 0.98)",
            transform: "scale(1.1)",
            transition: "background-color 0.15s ease, transform 0.15s ease",
        },
    },
};

export const violet: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(76, 29, 149, 0.3)",
            borderRadius: "999px",
            transition: "background-color 0.28s ease",
        },
        hover: {
            backgroundColor: "rgba(91, 33, 182, 0.45)",
        },
        active: {
            backgroundColor: "rgba(109, 40, 217, 0.62)",
            transition: "background-color 0.14s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(139, 92, 246, 0.62)",
            borderRadius: "999px",
        },
        hover: {
            backgroundColor: "rgba(167, 139, 250, 0.86)",
            transform: "scale(1.03)",
            transition: "background-color 0.18s ease, transform 0.18s ease",
        },
        active: {
            backgroundColor: "rgba(221, 214, 254, 1)",
            transform: "scale(1.12)",
            transition: "background-color 0.12s ease, transform 0.12s ease",
        },
    },
};

export const royal: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(30, 27, 75, 0.48)",
            borderRadius: "999px",
            transition: "background-color 0.3s ease",
        },
        hover: {
            backgroundColor: "rgba(49, 46, 129, 0.65)",
        },
        active: {
            backgroundColor: "rgba(67, 56, 202, 0.82)",
            transition: "background-color 0.15s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(99, 102, 241, 0.65)",
            borderRadius: "999px",
        },
        hover: {
            backgroundColor: "rgba(165, 180, 252, 0.86)",
            transform: "scale(1.02)",
            transition: "background-color 0.2s ease, transform 0.2s ease",
        },
        active: {
            backgroundColor: "rgba(224, 231, 255, 1)",
            transform: "scale(1.12)",
            transition: "background-color 0.14s ease, transform 0.14s ease",
        },
    },
};

export const arctic: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(186, 230, 253, 0.22)",
            borderRadius: "999px",
            transition: "background-color 0.35s ease",
        },
        hover: {
            backgroundColor: "rgba(125, 211, 252, 0.36)",
        },
        active: {
            backgroundColor: "rgba(56, 189, 248, 0.5)",
            transition: "background-color 0.18s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(224, 242, 254, 0.65)",
            borderRadius: "999px",
        },
        hover: {
            backgroundColor: "rgba(240, 249, 255, 0.88)",
            transform: "scale(1)",
            transition: "background-color 0.2s ease",
        },
        active: {
            backgroundColor: "rgba(255, 255, 255, 1)",
            transform: "scale(1.08)",
            transition: "background-color 0.15s ease, transform 0.15s ease",
        },
    },
};

export const glass: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            borderRadius: "999px",
            transition: "background-color 0.3s ease",
        },
        hover: {
            backgroundColor: "rgba(255, 255, 255, 0.14)",
        },
        active: {
            backgroundColor: "rgba(255, 255, 255, 0.22)",
            transition: "background-color 0.15s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(255, 255, 255, 0.28)",
            borderRadius: "999px",
        },
        hover: {
            backgroundColor: "rgba(255, 255, 255, 0.46)",
            transform: "scale(1)",
            transition: "background-color 0.2s ease",
        },
        active: {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            transform: "scale(1.08)",
            transition: "background-color 0.15s ease, transform 0.15s ease",
        },
    },
};

export const graphite: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(17, 24, 39, 0.52)",
            borderRadius: "3px",
            transition: "background-color 0.22s ease",
        },
        hover: {
            backgroundColor: "rgba(31, 41, 55, 0.7)",
        },
        active: {
            backgroundColor: "rgba(55, 65, 81, 0.88)",
            transition: "background-color 0.1s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(107, 114, 128, 0.65)",
            borderRadius: "2px",
        },
        hover: {
            backgroundColor: "rgba(156, 163, 175, 0.82)",
            transform: "scale(1)",
            transition: "background-color 0.15s ease",
        },
        active: {
            backgroundColor: "rgba(229, 231, 235, 0.98)",
            transform: "scale(1.06)",
            transition: "background-color 0.1s ease, transform 0.1s ease",
        },
    },
};

export const terminal: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(0, 20, 5, 0.72)",
            borderRadius: "0px",
            transition: "background-color 0.15s linear",
        },
        hover: {
            backgroundColor: "rgba(0, 40, 10, 0.82)",
        },
        active: {
            backgroundColor: "rgba(0, 65, 18, 0.92)",
            transition: "background-color 0.08s linear",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(34, 197, 94, 0.62)",
            borderRadius: "0px",
        },
        hover: {
            backgroundColor: "rgba(74, 222, 128, 0.85)",
            transform: "scale(1)",
            transition: "background-color 0.1s linear",
        },
        active: {
            backgroundColor: "rgba(187, 247, 208, 1)",
            transform: "scale(1.06)",
            transition: "background-color 0.08s linear, transform 0.08s linear",
        },
    },
};

export const toxic: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(54, 83, 20, 0.48)",
            borderRadius: "2px",
            transition: "background-color 0.2s ease",
        },
        hover: {
            backgroundColor: "rgba(77, 124, 15, 0.65)",
        },
        active: {
            backgroundColor: "rgba(101, 163, 13, 0.82)",
            transition: "background-color 0.1s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(163, 230, 53, 0.68)",
            borderRadius: "1px",
        },
        hover: {
            backgroundColor: "rgba(190, 242, 100, 0.9)",
            transform: "scale(1.04)",
            transition: "background-color 0.14s ease, transform 0.14s ease",
        },
        active: {
            backgroundColor: "rgba(236, 252, 203, 1)",
            transform: "scale(1.15)",
            transition: "background-color 0.08s ease, transform 0.08s ease",
        },
    },
};

export const candy: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(244, 114, 182, 0.18)",
            borderRadius: "999px",
            transition: "background-color 0.3s ease",
        },
        hover: {
            backgroundColor: "rgba(192, 132, 252, 0.28)",
        },
        active: {
            backgroundColor: "rgba(129, 140, 248, 0.42)",
            transition: "background-color 0.15s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(251, 113, 133, 0.62)",
            borderRadius: "999px",
        },
        hover: {
            backgroundColor: "rgba(244, 114, 182, 0.84)",
            transform: "scale(1.03)",
            transition: "background-color 0.18s ease, transform 0.18s ease",
        },
        active: {
            backgroundColor: "rgba(224, 231, 255, 1)",
            transform: "scale(1.12)",
            transition: "background-color 0.12s ease, transform 0.12s ease",
        },
    },
};

export const sand: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(120, 53, 15, 0.16)",
            borderRadius: "999px",
            transition: "background-color 0.32s ease",
        },
        hover: {
            backgroundColor: "rgba(180, 83, 9, 0.25)",
        },
        active: {
            backgroundColor: "rgba(217, 119, 6, 0.38)",
            transition: "background-color 0.16s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(217, 119, 6, 0.52)",
            borderRadius: "999px",
        },
        hover: {
            backgroundColor: "rgba(245, 158, 11, 0.75)",
            transform: "scale(1)",
            transition: "background-color 0.2s ease",
        },
        active: {
            backgroundColor: "rgba(253, 230, 138, 0.98)",
            transform: "scale(1.08)",
            transition: "background-color 0.15s ease, transform 0.15s ease",
        },
    },
};

export const monoLight: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(0, 0, 0, 0.08)",
            borderRadius: "6px",
            transition: "background-color 0.3s ease",
        },
        hover: {
            backgroundColor: "rgba(0, 0, 0, 0.14)",
        },
        active: {
            backgroundColor: "rgba(0, 0, 0, 0.22)",
            transition: "background-color 0.15s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(0, 0, 0, 0.32)",
            borderRadius: "6px",
        },
        hover: {
            backgroundColor: "rgba(0, 0, 0, 0.52)",
            transform: "scale(1)",
            transition: "background-color 0.18s ease",
        },
        active: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            transform: "scale(1.08)",
            transition: "background-color 0.12s ease, transform 0.12s ease",
        },
    },
};

export const monoDark: ScrollToFutureThemeProps = {
    scrollBar: {
        inactive: {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            borderRadius: "6px",
            transition: "background-color 0.3s ease",
        },
        hover: {
            backgroundColor: "rgba(255, 255, 255, 0.14)",
        },
        active: {
            backgroundColor: "rgba(255, 255, 255, 0.22)",
            transition: "background-color 0.15s ease",
        },
    },

    thumb: {
        inactive: {
            backgroundColor: "rgba(255, 255, 255, 0.32)",
            borderRadius: "6px",
        },
        hover: {
            backgroundColor: "rgba(255, 255, 255, 0.55)",
            transform: "scale(1)",
            transition: "background-color 0.18s ease",
        },
        active: {
            backgroundColor: "rgba(255, 255, 255, 0.82)",
            transform: "scale(1.08)",
            transition: "background-color 0.12s ease, transform 0.12s ease",
        },
    },
};
