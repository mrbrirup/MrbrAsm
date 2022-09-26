import { Mrbr_Collections_DoubleLinkedListNode } from "./DoubleLinkedListNode";

export class Mrbr_Collections_DoubleLinkedList<TNode> {
    private _head: Mrbr_Collections_DoubleLinkedListNode<TNode>;
    private _tail: Mrbr_Collections_DoubleLinkedListNode<TNode>;
    private _count: number = 0;
    private _uniqueKeys: boolean = false;
    constructor(unqiueKeys: boolean = false) {
        this.uniqueKeys = unqiueKeys;
    }
    public get head(): Mrbr_Collections_DoubleLinkedListNode<TNode> {
        return this._head;
    }
    public get uniqueKeys(): boolean {
        return this._uniqueKeys;
    }
    public set uniqueKeys(value: boolean) {
        this._uniqueKeys = value;
    }
    public set head(value: Mrbr_Collections_DoubleLinkedListNode<TNode>) {
        this._head = value;
    }
    public get tail(): Mrbr_Collections_DoubleLinkedListNode<TNode> {
        return this._tail;
    }
    public set tail(value: Mrbr_Collections_DoubleLinkedListNode<TNode>) {
        this._tail = value;
    }
    public get count(): number {
        return this._count;
    }
    public set count(value: number) {
        this._count = value;
    }
    public add(value: TNode, key?: string): Mrbr_Collections_DoubleLinkedList<TNode> {
        const self = this;
        if (self.uniqueKeys && key !== undefined && self.getNode(key) !== undefined) {
            throw new Error("Key already exists");
        }

        const newNode = new Mrbr_Collections_DoubleLinkedListNode<TNode>(value, key);

        if (self.head === undefined) {
            self.head = newNode;
            self.tail = newNode;
        }
        else {
            self.tail.next = newNode;
            newNode.previous = self.tail;
            self.tail = newNode;
        }
        self.count++;
        return self;
    }
    public remove(value: TNode): Mrbr_Collections_DoubleLinkedList<TNode> {
        const self = this,
            node = self.find(value);
        if (node !== undefined) {
            if (node.previous !== undefined) {
                node.previous.next = node.next;
            }
            if (node.next !== undefined) {
                node.next.previous = node.previous;
            }
            if (node === self.head) {
                self.head = node.next;
            }
            if (node === self.tail) {
                self.tail = node.previous;
            }
            self.count--;
        }
        return self;
    }
    public find(value: TNode): Mrbr_Collections_DoubleLinkedListNode<TNode> {
        const self = this;
        let currentNode = self.head;
        while (currentNode !== undefined) {
            if (currentNode.value === value) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return undefined;
    }
    public getNode(key: any): Mrbr_Collections_DoubleLinkedListNode<TNode> {
        const self = this;
        let currentNode = self.head;
        while (currentNode !== undefined) {
            if (currentNode.key === key) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return undefined;
    }
    public clear(): void {
        const self = this;
        self.head = undefined;
        self.tail = undefined;
        self.count = 0;
    }
    public toArray(): Array<TNode> {
        const self = this,
            result: TNode[] = [];
        let currentNode = self.head;
        while (currentNode !== undefined) {
            result.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return result;
    }
    public prepend(value: TNode, key?: string): Mrbr_Collections_DoubleLinkedList<TNode> {
        const self = this;
        if (self.uniqueKeys && key !== undefined && self.getNode(key) !== undefined) {
            throw new Error("Key already exists");
        }

        const newNode = new Mrbr_Collections_DoubleLinkedListNode<TNode>(value, key);
        if (self.head === undefined) {
            self.head = newNode;
            self.tail = newNode;
        }
        else {
            newNode.next = self.head;
            self.head.previous = newNode;
            self.head = newNode;
        }
        self.count++;
        return self;
    }
    public insertAfter(afterValue: TNode, value: TNode, key?: string): Mrbr_Collections_DoubleLinkedList<TNode> {
        const self = this;
        if (self.uniqueKeys && key !== undefined && self.getNode(key) !== undefined) {
            throw new Error("Key already exists");
        }
        const node = self.find(afterValue);
        if (node !== undefined) {
            const newNode = new Mrbr_Collections_DoubleLinkedListNode<TNode>(value, key);
            newNode.next = node.next;
            newNode.previous = node;
            node.next = newNode;
            if (newNode.next !== undefined) {
                newNode.next.previous = newNode;
            }
            self.count++;
        }
        return self;
    }
    public insertBefore(beforeValue: TNode, value: TNode, key?: string): Mrbr_Collections_DoubleLinkedList<TNode> {
        const self = this;
        if (self.uniqueKeys && key !== undefined && self.getNode(key) !== undefined) {
            throw new Error("Key already exists");
        }
        const node = self.find(beforeValue);
        if (node !== undefined) {
            const newNode = new Mrbr_Collections_DoubleLinkedListNode<TNode>(value);
            newNode.next = node;
            newNode.previous = node.previous;
            node.previous = newNode;
            if (newNode.previous !== undefined) {
                newNode.previous.next = newNode;
            }
            self.count++;
        }
        return self;
    }
    public insertAt(index: number, value: TNode, key?: string): Mrbr_Collections_DoubleLinkedList<TNode> {
        const self = this;
        if (self.uniqueKeys && key !== undefined && self.getNode(key) !== undefined) {
            throw new Error("Key already exists");
        }
        if (index === 0) {
            self.prepend(value, key);
        }
        else if (index === self.count - 1) {
            self.add(value, key);
        }
        else if (index > 0 && index < self.count - 1) {
            let currentNode = self.head;
            for (let nodeCounter = 0; nodeCounter < index; nodeCounter++) {
                currentNode = currentNode.next;
            }
            self.insertAfter(currentNode.value, value, key);
        }
        return self;
    }
    public getAt(index: number): Mrbr_Collections_DoubleLinkedListNode<TNode> {
        const self = this;
        if (index >= 0 && index < self.count) {
            let currentNode = self.head;
            for (let nodeCounter = 0; nodeCounter < index; nodeCounter++) {
                currentNode = currentNode.next;
            }
            return currentNode;
        }
        return undefined;
    }
    public removeAt(index: number): TNode {
        const self = this,
            result = self.getAt(index).value;
        if (index === 0) {
            self.head = self.head.next;
            self.head.previous = undefined;
            self.count--;
        }
        else if (index === self.count - 1) {
            self.tail = self.tail.previous;
            self.tail.next = undefined;
            self.count--;
        }
        else if (index > 0 && index < self.count - 1) {
            let currentNode = self.head;
            for (let nodeCounter = 0; nodeCounter < index; nodeCounter++) {
                currentNode = currentNode.next;
            }
            self.remove(currentNode.value);
        }
        return result;
    }
    public removeFirst(): TNode {
        const self = this;
        if (self.head === undefined) { return undefined; }
        let result = self.head.value;
        self.head = self.head.next;
        self.head.previous = undefined;
        self.count--;
        return result;
    }
    public removeLast(): TNode {
        const self = this;
        if (self.tail === undefined) { return undefined; }
        let result = self.tail.value;
        self.tail = self.tail.previous;
        self.tail.next = undefined;
        self.count--;
        return result;
    }
    removeAfter(value: TNode): Array<TNode> {
        const self = this,
            node = self.find(value),
            removedNodes: Array<TNode> = [];
        if (node !== undefined) {
            while (self.tail && self.tail !== node) {
                removedNodes.unshift(self.tail.value);
                self.removeLast();
            }
        }
        return removedNodes;
    }
    removeFrom(value: TNode): Array<TNode> {
        const self = this,
            node = self.find(value),
            removedNodes: Array<TNode> = [];
        let foundNode: boolean = false;
        if (node !== undefined) {
            while (self.tail && foundNode === false) {
                if (self.tail === node) {
                    foundNode = true;
                }
                removedNodes.unshift(self.tail.value);
                self.removeLast();
            }
        }
        return removedNodes;
    }
}