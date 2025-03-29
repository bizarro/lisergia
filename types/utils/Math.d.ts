declare function lerp(p1: number, p2: number, t: number): number;
declare function clamp(min: number, max: number, number: number): number;
declare function random(min: number, max: number): number;
declare function map(valueToMap: number, inMin: number, inMax: number, outMin: number, outMax: number, isClamped?: boolean): number;
declare function round(value: number, precision?: number): number;
export declare const MathUtils: {
    clamp: typeof clamp;
    lerp: typeof lerp;
    map: typeof map;
    random: typeof random;
    round: typeof round;
};
export {};
