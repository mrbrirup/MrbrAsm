export declare class Mrbr_System_Text_StringBuilder {
    private _stringArray;
    private _newLine;
    constructor();
    append(text: string): Mrbr_System_Text_StringBuilder;
    appendLine(): Mrbr_System_Text_StringBuilder;
    clear(): void;
    insertAt(index: number, text: string): Mrbr_System_Text_StringBuilder;
    insertAtStart(text: string): Mrbr_System_Text_StringBuilder;
    removeAt(index: number, length: number): Mrbr_System_Text_StringBuilder;
    removeLast(): Mrbr_System_Text_StringBuilder;
    removeFirst(): Mrbr_System_Text_StringBuilder;
    replace(find: RegExp, replaceWith: string): Mrbr_System_Text_StringBuilder;
    get newLine(): string;
    set newLine(value: string);
    toString(): string;
}
