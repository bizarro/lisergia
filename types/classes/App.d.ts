import { IArraySplice } from 'mobx';
import { AppLinks } from './AppLinks';
import { Component } from './Component';
import { Page } from './Page';
import { Pointer } from '../managers/Pointer';
export interface ApplicationComponentData {
    component: new (params?: any) => Component;
}
export interface ApplicationComponentDatasetData extends ApplicationComponentData {
    selector: string;
}
export interface ApplicationRoute {
    component: new (params?: any) => Page;
    template: string;
}
export declare class ApplicationManager extends Component {
    element: HTMLElement;
    id: string;
    template: string;
    constructor();
    components: Array<Component>;
    canvas?: Component;
    transition?: Component & {
        onTransition?: (args: any) => Promise<void>;
    };
    initComponents(components: Array<ApplicationComponentData>): void;
    addComponent(component: Component): void;
    removeComponent(component: Component): void;
    onComponentChange({ added, removed }: IArraySplice<Component>): void;
    datasets: Array<ApplicationComponentDatasetData>;
    initDatasets(datasets: Array<ApplicationComponentDatasetData>): void;
    pages: Map<string, new (...args: any[]) => Page>;
    initRoutes(routes: Array<ApplicationRoute>): void;
    initSprites(url?: string): Promise<void>;
    initPage(): void;
    links: AppLinks;
    createLinks(): void;
    page: Page;
    createPage(template?: string): void;
    destroyPage(): void;
    route: string;
    onNavigate({ href, pushState }: {
        href: string;
        pushState: boolean;
    }): Promise<void>;
    nextPage: {
        element: Element;
        id: string;
        template: string;
        title: string;
    };
    onRequest({ href, response, pushState }: {
        href: string;
        response: string;
        pushState: boolean;
    }): Promise<void>;
    pathname: string;
    onPopState(): void;
    onRAF(time: number): void;
    pointer: Pointer;
    onPointerStart(...args: any[]): void;
    onPointerMove(...args: any[]): void;
    onPointerDrag(...args: any[]): void;
    onPointerEnd(...args: any[]): void;
    get scroll(): number;
    onScroll({ scroll }: {
        scroll: any;
    }): void;
    addEventListeners(): void;
}
export declare const Application: ApplicationManager;
