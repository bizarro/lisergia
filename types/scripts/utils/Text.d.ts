export declare function split({ append, element, expression, }: {
    append: boolean;
    element: HTMLElement;
    expression: string;
}): NodeListOf<HTMLSpanElement>;
export declare function calculate(spans: Array<HTMLElement>): HTMLElement[][];
export declare function splitText(text: string, expression: string): string[];
export declare function parseLine(line: string): string;
