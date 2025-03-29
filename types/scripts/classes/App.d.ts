import { AppLinks } from './AppLinks';
import { Component } from './Component';
import { Page } from './Page';
export interface AppComponentData {
    component: new (params?: any) => Component;
}
export interface AppComponentDatasetData extends AppComponentData {
    selector: string;
}
export interface AppRoute {
    component: new (params?: any) => Page;
    template: string;
}
export declare class Application extends Component {
    element: HTMLElement;
    template: string;
    id: string;
    constructor();
    components: Set<Component>;
    canvas?: Component;
    transition?: Component & {
        onTransition?: (args: any) => Promise<void>;
    };
    initComponents(components: Array<AppComponentData>): void;
    datasets: Array<AppComponentDatasetData>;
    initDatasets(datasets: Array<AppComponentDatasetData>): void;
    pages: Map<string, Page>;
    initRoutes(routes: Array<AppRoute>): void;
    initSprites(url?: string): Promise<void>;
    init(): void;
    links: AppLinks;
    createLinks(): void;
    page: Component;
    createPage(template?: string): void;
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
    onPopState(): void;
    addEventListeners(): void;
}
export declare const App: Application;
