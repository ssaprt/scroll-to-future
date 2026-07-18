import { ScrollToFutureThemeProps } from "../scroll-to-future.theme.type";
import { PresetsThemeType } from "./preset.theme.type";
import { primary } from "./primary.theme";

export const presets: Record<PresetsThemeType, ScrollToFutureThemeProps> = {
    primary,
    dark: primary,
    light: primary,
};
