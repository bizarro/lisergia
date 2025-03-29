import { AppLink } from './AppLink';
import { EventEmitter } from './EventEmitter';
export declare class AppLinks extends EventEmitter {
    links: Array<AppLink>;
    addEventListeners(): void;
    onLinkClick(href: string): void;
    refresh(): void;
}
