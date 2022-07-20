export class Mrbr_System_Text_StringBuilder {
    private _stringArray: Array<string> = new Array<string>();
    private _newLine: string = "\r\n";
    constructor() {

    }
    append(text: string): Mrbr_System_Text_StringBuilder {
        this._stringArray.push(text);
        return this;
    }
    appendLine(): Mrbr_System_Text_StringBuilder {
        this._stringArray.push(`${Text}${this._newLine}`)
        return this;
    }
    clear() {
        this._stringArray = [];
    }
    insertAt(index: number, text: string): Mrbr_System_Text_StringBuilder {
        this._stringArray.splice(index, 0, text);
        return this;
    }
    insertAtStart(text: string): Mrbr_System_Text_StringBuilder {
        this._stringArray.unshift(text);
        return this;
    }
    removeAt(index: number, length: number): Mrbr_System_Text_StringBuilder {
        this._stringArray.splice(index, length);
        return this;
    }
    removeLast(): Mrbr_System_Text_StringBuilder {
        this._stringArray.pop()
        return this;
    }
    removeFirst(): Mrbr_System_Text_StringBuilder {
        this._stringArray.shift()
        return this;
    }
    replace(find: RegExp, replaceWith: string): Mrbr_System_Text_StringBuilder {
        this._stringArray = this._stringArray.map((entry: string) => entry.replace(find, replaceWith))
        return this;
    }
    get newLine(): string { return this._newLine; }
    set newLine(value: string) { this._newLine = value; }
    toString(): string {
        return "".concat(...this._stringArray);
    }
}