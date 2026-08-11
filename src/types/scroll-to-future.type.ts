import { ScrollToFutureScrollBar } from "./config/scrollbar.type";
import { ScrollToFutureThumb } from "./config/thumb.type";
import { PresetsThemeType } from "./theme/preset.theme.type";
import { ScrollToFutureThemeProps } from "./theme/scroll-to-future.theme.type";

export interface ScrollToFutureInterface {
    target?: React.RefObject<HTMLElement | null> | null;
    scrollBar?: ScrollToFutureScrollBar;
    thumb?: ScrollToFutureThumb;
    selectTheme?: PresetsThemeType;
    optionsTheme?: ScrollToFutureThemeProps;
    nativeOnMobile?: boolean;
}

export type ScrollToFutureConfig = Omit<ScrollToFutureInterface, "target">;
