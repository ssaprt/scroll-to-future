import { BoundaryOffset, BoundaryType, PxValue } from "./general.type";

export type HeightTrackType =
    | BoundaryType
    | `${number}%`
    | `${number}dvh`
    | `${number}dsvh`
    | `${number}vh`;

export type ScrollBarMode = "horizontal" | "vertical" | "both";
export type PositionMode = "before" | "after";
export type Superimposition = "over" | "after";

export type HideNativeScrollbarMode = false | "fine-pointer" | "always";

export interface ScrollToFutureScrollBar {
    mode?: ScrollBarMode;
    hideNativeScrollbar?: HideNativeScrollbarMode;
    positionMode?: PositionMode;
    superimposition?: Superimposition;
    boundaryOffset?: BoundaryOffset;
    widthTrack?: PxValue;
    heightTrack?: HeightTrackType;
}
