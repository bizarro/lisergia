import { Component } from './Component';
export declare class AppLink extends Component {
    element: HTMLLinkElement & {
        redirect: Function;
    };
    constructor({ element }: {
        element: any;
    });
    onClick(event: any): void;
    addEventListeners(): void;
    removeEventListeners(): void;
}
