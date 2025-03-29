import { Emitter, Unsubscribe } from 'nanoevents';
export declare class EventEmitter {
    emitter: Emitter;
    entries: Map<Function, Unsubscribe>;
    constructor();
    on(event: string, callback: (...args: any) => void): Unsubscribe;
    off(event: string, callback: (...args: any) => void): void;
    fire(event: string, ...args: any[]): void;
    destroy(): void;
}
