export declare function split({ append, element, expression, }: {
    append: boolean;
    element: HTMLElement;
    expression: string;
}): NodeListOf<HTMLSpanElement>;
export declare function calculate(spans: Array<HTMLSpanElement> | NodeListOf<HTMLSpanElement>): HTMLSpanElement[][];
export declare function splitText(text: string, expression: string): string[];
export declare function parseLine(line: string, expression: string): string;
