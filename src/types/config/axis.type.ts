export type Axis = "x" | "y";

export interface ParsedOffset {
    start: number;
    end: number;
}

export interface AxisInsets {
    cross: number;
    main: number;
}

export interface AxisMetrics {
    scrollSize: number;
    clientSize: number;
    scrollPos: number;
    canScroll: boolean;
}

export interface TargetMetrics {
    x: AxisMetrics;
    y: AxisMetrics;
}
