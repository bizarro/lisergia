import { Unsubscribe } from 'nanoevents';
import { EventEmitter } from '../classes/EventEmitter';
declare class ViewportManager extends EventEmitter {
    height: number;
    width: number;
    entries: Map<Function, Unsubscribe>;
    constructor();
    get aspect(): number;
    get dpr(): number;
    get isPhone(): boolean;
    get isTablet(): boolean;
    get isDesktop(): boolean;
    on(event: any, callback: any): Unsubscribe;
    off(event: any, callback: any): void;
    onResize(): void;
}
export declare const Viewport: ViewportManager;
export {};
