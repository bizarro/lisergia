import { EventEmitter } from '../classes';
export type PointerEvent = MouseEvent | TouchEvent;
export interface PointerCustomEvent {
    event: MouseEvent | TouchEvent;
    nativeEvent: MouseEvent | TouchEvent;
    pointer: Pointer;
}
export interface PointerCoordinates {
    event: MouseEvent | TouchEvent;
    x: number;
    y: number;
    isTouch: boolean;
}
declare class Vector {
    x: number;
    y: number;
    set(x?: number, y?: number): void;
}
export declare class Pointer extends EventEmitter {
    interacted: Promise<boolean>;
    x: number;
    y: number;
    isHolding: boolean;
    isTouch: boolean;
    delta: Vector;
    hold: Vector;
    last: Vector;
    move: Vector;
    normalized: Vector;
    temp: Vector;
    constructor();
    getPointer(event: PointerEvent): {
        x: number;
        y: number;
    };
    onMouseDown(event: any): void;
    onMouseMove(event: any): void;
    onMouseUp(event: any): void;
    onTouchStart(event: TouchEvent): void;
    onTouchMove(event: TouchEvent): void;
    onTouchEnd(event: TouchEvent): void;
    onStart({ event, x, y, isTouch }: PointerCoordinates): void;
    onMove({ event, x, y }: PointerCoordinates): void;
    onEnd({ event }: any): void;
    onLeave({ event }: any): void;
    addEventListeners(): void;
    removeEventListeners(): void;
}
export {};
