import { EventEmitter } from '../classes/EventEmitter';
import { Unsubscribe } from 'nanoevents';
declare class ViewportManager extends EventEmitter {
    height: number;
    width: number;
    entries: Map<Function, Unsubscribe>;
    constructor();
    get dpr(): number;
    on(event: any, callback: any): Unsubscribe;
    off(event: any, callback: any): void;
    onResize(): void;
}
export declare const Viewport: ViewportManager;
export {};
