import { ScrollToFutureThemeProps } from "../types/theme/scroll-to-future.theme.type";

export const variables = (theme: ScrollToFutureThemeProps) => {
    const styles: Record<string, string> = {};

    for (const key in theme) {
        const k = key as keyof ScrollToFutureThemeProps;
        const statusTheme = theme[k];

        if (!statusTheme) continue;

        const type = k === "scrollBar" ? "scrollbar" : "thumb";

        for (const status in statusTheme) {
            const properties = statusTheme[status as keyof typeof statusTheme];

            if (!properties) continue;

            const statusPrefix = status === "inactive" ? "" : `-${status}`;

            for (const prop in properties) {
                const value = properties[prop as keyof typeof properties];

                if (value === undefined) continue;

                styles[`--${type}${statusPrefix}-${prop}`] = value as string;
            }
        }
    }

    return styles;
};
