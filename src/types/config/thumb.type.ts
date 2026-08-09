import { BoundaryOffset, PxValue } from "./general.type";

export interface ScrollToFutureThumb {
    className?: string;
    boundaryOffset?: BoundaryOffset;
    heightTrack?: `${number}%` | PxValue | "auto";
}
