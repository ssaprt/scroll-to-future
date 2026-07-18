import { BoundaryOffset, PxValue } from "./general.type";

export interface ScrollToFutureThumb {
    boundaryOffset?: BoundaryOffset;
    heightTrack?: `${number}%` | PxValue | "auto";
}
