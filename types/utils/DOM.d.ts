export interface DOMRectBounds {
    bottom: number;
    height: number;
    left: number;
    top: number;
    width: number;
}
declare function getBounds(element: HTMLElement, top?: number): DOMRectBounds;
export declare const DOMUtils: {
    getBounds: typeof getBounds;
};
export {};
