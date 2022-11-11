import { Mrbr_Collections_DoubleLinkedListNode } from "./DoubleLinkedListNode";

/**
 * Double Linked List
 * @date 11/11/2022 - 08:24:49
 *
 * @export
 * @class Mrbr_Collections_DoubleLinkedList
 * @typedef {Mrbr_Collections_DoubleLinkedList}
 * @template TNode
 */
export class Mrbr_Collections_DoubleLinkedList<TNode> {
    
    /**
     * Head Node for List
     * @date 11/11/2022 - 08:24:58
     *
     * @private
     * @type {Mrbr_Collections_DoubleLinkedListNode<TNode>}
     */
    private _head: Mrbr_Collections_DoubleLinkedListNode<TNode>;
    
    /**
     * Tailo Node for List
     * @date 11/11/2022 - 08:25:11
     *
     * @private
     * @type {Mrbr_Collections_DoubleLinkedListNode<TNode>}
     */
    private _tail: Mrbr_Collections_DoubleLinkedListNode<TNode>;
    
    /**
     * Node Count
     * @date 11/11/2022 - 08:25:21
     *
     * @private
     * @type {number}
     */
    private _count: number = 0;
    
    /**
     * Only allow nodes with unqiue keys
     * @date 11/11/2022 - 08:25:32
     *
     * @private
     * @type {boolean}
     */
    private _uniqueKeys: boolean = false;
    constructor(unqiueKeys: boolean = false) {
        this.uniqueKeys = unqiueKeys;
    }
    
    /**
     * Head Node
     * @date 11/11/2022 - 08:25:51
     *
     * @public
     * @type {Mrbr_Collections_DoubleLinkedListNode<TNode>}
     */
    public get head(): Mrbr_Collections_DoubleLinkedListNode<TNode> { return this._head; }
    
    /**
     * Head Node
     */
    public set head(value: Mrbr_Collections_DoubleLinkedListNode<TNode>) { this._head = value; }
    
    /**
     * Only allow nodes with unique keys when tru
     * @date 11/11/2022 - 08:26:01
     *
     * @public
     * @type {boolean}
     */
    public get uniqueKeys(): boolean { return this._uniqueKeys; }
    
    /**
     * Only allow nodes with unique keys when tru
     */
    public set uniqueKeys(value: boolean) { this._uniqueKeys = value; }
    
    /**
     * Tail node for list
     * @date 11/11/2022 - 08:26:48
     *
     * @public
     * @type {Mrbr_Collections_DoubleLinkedListNode<TNode>}
     */
    public get tail(): Mrbr_Collections_DoubleLinkedListNode<TNode> { return this._tail; }
    
    /**
     * Tail node for list
     */
    public set tail(value: Mrbr_Collections_DoubleLinkedListNode<TNode>) { this._tail = value; }
    
    
    /**
     * Node Count
     * @date 11/11/2022 - 08:27:44
     *
     * @public
     * @type {number}
     */
    public get count(): number { return this._count; }
    
    /**
     * Node Count
     */
    public set count(value: number) { this._count = value; }
    
    /**
     * Add a node to the list
     * @date 11/11/2022 - 08:27:56
     *
     * @public
     * @param {TNode} value
     * @param {?string} [key]
     * @returns {Mrbr_Collections_DoubleLinkedList<TNode>}
     */
    public add(value: TNode, key?: string): Mrbr_Collections_DoubleLinkedList<TNode> {
        if (this.uniqueKeys && key !== undefined && this.getNode(key) !== undefined) {
            throw new Error("Key already exists");
        }
        const newNode = new Mrbr_Collections_DoubleLinkedListNode<TNode>(value, key);

        if (this.head === undefined) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            newNode.previous = this.tail;
            this.tail = newNode;
        }
        this.count++;
        return this;
    }
    
    /**
     * Remove a node from the list
     * @date 11/11/2022 - 08:28:07
     *
     * @public
     * @param {TNode} value
     * @returns {Mrbr_Collections_DoubleLinkedList<TNode>}
     */
    public remove(value: TNode): Mrbr_Collections_DoubleLinkedList<TNode> {
        const node = this.find(value);
        if (node === undefined) { return this; }
        (node.previous !== undefined) && (node.previous.next = node.next);
        (node.next !== undefined) && (node.next.previous = node.previous);
        (node === this.head) && (this.head = node.next);
        (node === this.tail) && (this.tail = node.previous);
        this.count--;
        return this;
    }
    
    /**
     * Find a node in the list
     * @date 11/11/2022 - 08:28:15
     *
     * @public
     * @param {TNode} value
     * @returns {Mrbr_Collections_DoubleLinkedListNode<TNode>}
     */
    public find(value: TNode): Mrbr_Collections_DoubleLinkedListNode<TNode> {
        let currentNode = this.head;
        while (currentNode !== undefined) {
            if (currentNode.value === value) { return currentNode; }
            currentNode = currentNode.next;
        }
        return undefined;
    }
    
    /**
     * Get a node by key
     * @date 11/11/2022 - 08:28:31
     *
     * @public
     * @param {*} key
     * @returns {Mrbr_Collections_DoubleLinkedListNode<TNode>}
     */
    public getNode(key: any): Mrbr_Collections_DoubleLinkedListNode<TNode> {
        let currentNode = this.head;
        while (currentNode !== undefined) {
            if (currentNode.key === key) { return currentNode; }
            currentNode = currentNode.next;
        }
        return undefined;
    }
    
    /**
     * Clear the list
     * @date 11/11/2022 - 08:28:41
     *
     * @public
     */
    public clear(): void {
        this.head = undefined;
        this.tail = undefined;
        this.count = 0;
    }
    
    /**
     * Get the list as an array
     * @date 11/11/2022 - 08:28:52
     *
     * @public
     * @returns {Array<TNode>}
     */
    public toArray(): Array<TNode> {
        const result: TNode[] = [];
        let currentNode = this.head;
        while (currentNode !== undefined) {
            result.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return result;
    }
    
    /**
     * Prepend a node to the list
     * @date 11/11/2022 - 08:29:00
     *
     * @public
     * @param {TNode} value
     * @param {?string} [key]
     * @returns {Mrbr_Collections_DoubleLinkedList<TNode>}
     */
    public prepend(value: TNode, key?: string): Mrbr_Collections_DoubleLinkedList<TNode> {
        if (this.uniqueKeys && key !== undefined && this.getNode(key) !== undefined) {
            throw new Error("Key already exists");
        }
        const newNode = new Mrbr_Collections_DoubleLinkedListNode<TNode>(value, key);
        if (this.head === undefined) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head.previous = newNode;
            this.head = newNode;
        }
        this.count++;
        return this;
    }
    
    /**
     * Insert a Node after a given node
     * @date 11/11/2022 - 08:29:16
     *
     * @public
     * @param {TNode} afterValue
     * @param {TNode} value
     * @param {?string} [key]
     * @returns {Mrbr_Collections_DoubleLinkedList<TNode>}
     */
    public insertAfter(afterValue: TNode, value: TNode, key?: string): Mrbr_Collections_DoubleLinkedList<TNode> {
        if (this.uniqueKeys && key !== undefined && this.getNode(key) !== undefined) {
            throw new Error("Key already exists");
        }
        const node = this.find(afterValue);
        if (node !== undefined) {
            const newNode = new Mrbr_Collections_DoubleLinkedListNode<TNode>(value, key);
            newNode.next = node.next;
            newNode.previous = node;
            node.next = newNode;
            (newNode.next !== undefined) && (newNode.next.previous = newNode);
            this.count++;
        }
        return this;
    }
    
    /**
     * Insert a Node before a given node
     * @date 11/11/2022 - 08:29:33
     *
     * @public
     * @param {TNode} beforeValue
     * @param {TNode} value
     * @param {?string} [key]
     * @returns {Mrbr_Collections_DoubleLinkedList<TNode>}
     */
    public insertBefore(beforeValue: TNode, value: TNode, key?: string): Mrbr_Collections_DoubleLinkedList<TNode> {
        if (this.uniqueKeys && key !== undefined && this.getNode(key) !== undefined) {
            throw new Error("Key already exists");
        }
        const node = this.find(beforeValue);
        if (node === undefined) { return this; }
        const newNode = new Mrbr_Collections_DoubleLinkedListNode<TNode>(value);
        newNode.next = node;
        newNode.previous = node.previous;
        node.previous = newNode;
        (newNode.previous !== undefined) && (newNode.previous.next = newNode);
        this.count++;
        return this;
    }
    
    /**
     * Insert a node at a given index
     * @date 11/11/2022 - 08:29:42
     *
     * @public
     * @param {number} index
     * @param {TNode} value
     * @param {?string} [key]
     * @returns {Mrbr_Collections_DoubleLinkedList<TNode>}
     */
    public insertAt(index: number, value: TNode, key?: string): Mrbr_Collections_DoubleLinkedList<TNode> {
        if (this.uniqueKeys && key !== undefined && this.getNode(key) !== undefined) { throw new Error("Key already exists"); }
        if (index === 0) {
            this.prepend(value, key);
        }
        else if (index === this.count - 1) {
            this.add(value, key);
        }
        else if (index > 0 && index < this.count - 1) {
            let currentNode = this.head;
            for (let nodeCounter = 0; nodeCounter < index; nodeCounter++) {
                currentNode = currentNode.next;
            }
            this.insertAfter(currentNode.value, value, key);
        }
        return this;
    }
    
    /**
     * Get a node at a given index
     * @date 11/11/2022 - 08:30:01
     *
     * @public
     * @param {number} index
     * @returns {Mrbr_Collections_DoubleLinkedListNode<TNode>}
     */
    public getAt(index: number): Mrbr_Collections_DoubleLinkedListNode<TNode> {
        if (index >= 0 && index < this.count) {
            let currentNode = this.head;
            for (let nodeCounter = 0; nodeCounter < index; nodeCounter++) {
                currentNode = currentNode.next;
            }
            return currentNode;
        }
        return undefined;
    }
    
    /**
     * Remove a node at a given index
     * @date 11/11/2022 - 08:30:13
     *
     * @public
     * @param {number} index
     * @returns {TNode}
     */
    public removeAt(index: number): TNode {
        const result = this.getAt(index).value;
        if (index === 0) {
            this.head = this.head.next;
            this.head.previous = undefined;
            this.count--;
        }
        else if (index === this.count - 1) {
            this.tail = this.tail.previous;
            this.tail.next = undefined;
            this.count--;
        }
        else if (index > 0 && index < this.count - 1) {
            let currentNode = this.head;
            for (let nodeCounter = 0; nodeCounter < index; nodeCounter++) {
                currentNode = currentNode.next;
            }
            this.remove(currentNode.value);
        }
        return result;
    }
    
    /**
     * Remove first, head, node
     * @date 11/11/2022 - 08:30:29
     *
     * @public
     * @returns {TNode}
     */
    public removeFirst(): TNode {
        if (this.head === undefined) { return undefined; }
        let result = this.head.value;
        this.head = this.head.next;
        this.head.previous = undefined;
        this.count--;
        return result;
    }
    
    /**
     * Remove last, tail, node
     * @date 11/11/2022 - 08:30:51
     *
     * @public
     * @returns {TNode}
     */
    public removeLast(): TNode {
        if (this.tail === undefined) { return undefined; }
        let result = this.tail.value;
        this.tail = this.tail.previous;
        this.tail.next = undefined;
        this.count--;
        return result;
    }
    
    /**
     * Remove nodes after a given node, Returns Array of removed nodes
     * @date 11/11/2022 - 08:30:59
     *
     * @param {TNode} value
     * @returns {Array<TNode>}
     */
    removeAfter(value: TNode): Array<TNode> {
        const
            node = this.find(value),
            removedNodes: Array<TNode> = [];
        if (node !== undefined) {
            while (this.tail && this.tail !== node) {
                removedNodes.unshift(this.tail.value);
                this.removeLast();
            }
        }
        return removedNodes;
    }
    
    /**
     * Remove a node and all nodes after it. Returning an array of removed nodes
     * @date 11/11/2022 - 08:31:20
     *
     * @param {TNode} value
     * @returns {Array<TNode>}
     */
    removeFrom(value: TNode): Array<TNode> {
        const
            node = this.find(value),
            removedNodes: Array<TNode> = [];
        let foundNode: boolean = false;
        if (node !== undefined) {
            while (this.tail && foundNode === false) {
                if (this.tail === node) {
                    foundNode = true;
                }
                removedNodes.unshift(this.tail.value);
                this.removeLast();
            }
        }
        return removedNodes;
    }
}