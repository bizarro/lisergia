import { SplitText } from 'gsap/SplitText';
import { ApplicationManager } from './App';
import { EventEmitter } from './EventEmitter';
export interface ComponentClasses {
    [key: string]: string;
}
export interface ComponentElements {
    [key: string]: Array<any> | Element | Array<Element> | HTMLElement | Array<HTMLElement> | NodeList | Window | Array<SplitText> | SplitText | null;
}
export type ComponentSelector = string | HTMLElement;
export interface ComponentSelectors {
    [key: string]: string | Element | Array<Element> | HTMLElement | Array<HTMLElement> | NodeList | Window;
}
export interface ComponentParameters {
    application?: ApplicationManager;
    autoListeners?: boolean;
    autoMount?: boolean;
    classes?: ComponentClasses;
    element?: ComponentSelector;
    elements?: ComponentSelectors;
    id?: string;
}
export declare class Component extends EventEmitter {
    application?: ApplicationManager;
    autoListeners: boolean;
    autoMount: boolean;
    classes?: ComponentClasses;
    selector?: ComponentSelector;
    selectors?: ComponentSelectors;
    id?: string;
    element?: HTMLElement;
    elements: ComponentElements;
    constructor({ application, autoListeners, autoMount, classes, element, elements, id, }: ComponentParameters);
    create(): void;
    initElement(selector: ComponentSelector): void;
    initElements(selectors?: ComponentSelectors): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    destroy(): void;
}
