import Lenis from 'lenis';
import { Component, ComponentClasses, ComponentSelectors } from './Component';
export interface PageParameters {
    classes?: ComponentClasses;
    datasets: Array<{
        component: typeof Component;
        selector: string;
    }>;
    element: HTMLElement;
    elements: ComponentSelectors;
}
export declare class Page extends Component {
    element: HTMLElement;
    constructor({ classes, datasets, element, elements }: PageParameters);
    create(): void;
    datasets: Array<{
        component: typeof Component;
        selector: string;
    }>;
    datasetsComponents: Array<{
        components: Component[];
        selector: string;
    }>;
    createDatasets(): void;
    destroyDatasets(): void;
    scroll: Lenis;
    createScroll(): void;
    destroyScroll(): void;
    show(): Promise<void>;
    hide(): Promise<void>;
    onRAF(time: number): void;
    destroy(): void;
}
