import { EventEmitter } from '../classes/EventEmitter';
export declare class RAFManager extends EventEmitter {
    constructor();
    frame: number;
    onRequestAnimationFrame(time: number): void;
    destroy(): void;
}
export declare const RAF: RAFManager;
