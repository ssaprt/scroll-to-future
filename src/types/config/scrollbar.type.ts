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

export interface ScrollToFutureScrollBar {
    mode?: ScrollBarMode;
    positionMode?: PositionMode;
    superimposition?: Superimposition;
    boundaryOffset?: BoundaryOffset;
    widthTrack?: PxValue;
    heightTrack?: HeightTrackType;
}
