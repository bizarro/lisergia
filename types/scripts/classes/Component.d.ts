import { EventEmitter } from './EventEmitter';
export interface ComponentClasses {
    [key: string]: string;
}
export interface ComponentElements {
    [key: string]: Element | Element[] | HTMLElement | HTMLElement[] | NodeList | Window | null;
}
export type ComponentSelector = string | HTMLElement;
export interface ComponentSelectors {
    [key: string]: string | Element | Element[] | HTMLElement | HTMLElement[] | NodeList | Window;
}
export interface ComponentParameters {
    autoListeners?: boolean;
    autoMount?: boolean;
    classes?: ComponentClasses;
    element?: ComponentSelector;
    elements?: ComponentSelectors;
    id?: string;
}
export declare class Component extends EventEmitter {
    autoListeners: boolean;
    autoMount: boolean;
    classes?: ComponentClasses;
    selector?: ComponentSelector;
    selectors?: ComponentSelectors;
    id?: string;
    element?: HTMLElement;
    elements: ComponentElements;
    constructor({ autoListeners, autoMount, classes, element, elements, id }: ComponentParameters);
    create(): void;
    initElement(selector: ComponentSelector): void;
    initElements(selectors?: ComponentSelectors): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    destroy(): void;
}
