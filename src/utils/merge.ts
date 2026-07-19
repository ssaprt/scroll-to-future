import { presets } from "../themes/preset";
import { ScrollToFutureScrollBar } from "../types/config/scrollbar.type";
import { ScrollToFutureThumb } from "../types/config/thumb.type";
import { ScrollToFutureInterface } from "../types/scroll-to-future.type";
import { ScrollToFutureThemeProps } from "../types/theme/scroll-to-future.theme.type";
import { defaultConfig } from "./config";

type Config = Omit<ScrollToFutureInterface, "target">;

export interface MergedConfig {
    scrollBar: ScrollToFutureScrollBar;
    thumb: ScrollToFutureThumb;
    optionsTheme: ScrollToFutureThemeProps;
}

export const merge = (config: Config): MergedConfig => {
    const selectedTheme =
        presets[config.selectTheme ?? defaultConfig.selectTheme];

    return {
        scrollBar: {
            ...defaultConfig.scrollBar,
            ...config.scrollBar,
        },
        thumb: {
            ...defaultConfig.thumb,
            ...config.thumb,
        },
        optionsTheme: themeMerge(selectedTheme, config.optionsTheme),
    };
};

type PlainObject = Record<string, unknown>;

const isPlainObject = (value: unknown): value is PlainObject =>
    typeof value === "object" && value !== null && !Array.isArray(value);

export const themeMerge = <T extends PlainObject>(
    base: T,
    override?: Partial<T>,
): T => {
    if (!override) return base;

    const result: PlainObject = { ...base };

    for (const key of Object.keys(override) as Array<keyof T>) {
        const overrideValue = override[key];
        const baseValue = base[key];

        if (overrideValue === undefined) continue;

        if (isPlainObject(overrideValue) && isPlainObject(baseValue)) {
            result[key as string] = themeMerge(
                baseValue as PlainObject,
                overrideValue as PlainObject,
            );
        } else {
            result[key as string] = overrideValue;
        }
    }

    return result as T;
};
