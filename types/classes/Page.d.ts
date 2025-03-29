import Lenis, { LenisOptions } from 'lenis';
import { ApplicationManager } from './App';
import { Component, ComponentClasses, ComponentSelectors } from './Component';
export interface PageParameters {
    application: ApplicationManager;
    classes?: ComponentClasses;
    datasets: Array<{
        component: typeof Component;
        selector: string;
    }>;
    element: HTMLElement;
    elements: ComponentSelectors;
    scrollEnabled: boolean;
    scrollOptions?: LenisOptions;
}
export declare class Page extends Component {
    element: HTMLElement;
    elements: {
        wrapper: HTMLElement;
    };
    application: ApplicationManager;
    datasets: Array<{
        component: typeof Component;
        selector: string;
    }>;
    scroll: number;
    scrollEnabled: boolean;
    scrollOptions: LenisOptions;
    constructor({ application, classes, datasets, element, elements, scrollEnabled, scrollOptions, }: PageParameters);
    create(): void;
    resizeObserver: ResizeObserver;
    createResizeObserver(): void;
    destroyResizeObserver(): void;
    components: Set<Component>;
    createComponents(): void;
    destroyComponents(): void;
    lenis: Lenis;
    createScroll(): void;
    destroyScroll(): void;
    onResize(): void;
    onRAF(time: number): void;
    onScroll(scroll: number): void;
    onScrollFallback(): void;
    destroy(): void;
}
