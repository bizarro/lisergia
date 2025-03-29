export interface DOMRectBounds {
    bottom: number;
    height: number;
    left: number;
    top: number;
    width: number;
}
export declare const getBounds: (element: HTMLElement, top?: number) => DOMRectBounds;
