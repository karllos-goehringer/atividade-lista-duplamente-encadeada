import { Contato } from "./Contato";
import { IComparable } from "./IComparable";

class NoDuplo<T> {
    public previous: NoDuplo<T> | null = null;
    public next: NoDuplo<T> | null = null;

    constructor(public element: T) {}
}

export class LstContatos<T extends IComparable = Contato> {
    private _head: NoDuplo<T> | null = null;
    private _tail: NoDuplo<T> | null = null;
    private _length = 0;

    constructor(element?: T) {
        if (element !== undefined) {
            const node = new NoDuplo(element);
            this._head = node;
            this._tail = node;
            this._length = 1;
        }else if (element === undefined) {
            this._head = null;
            this._tail = null;
            this._length = 0;
        }
    }

    public get length(): number {
        return this._length;
    }

    public push(objContato: T): void {
        const node = new NoDuplo(objContato);
        if (this._tail === null) {
            this._head = node;
            this._tail = node;
        } else {
            node.previous = this._tail;
            this._tail.next = node;
            this._tail = node;
        }
        this._length++;
    }

    public unshift(objContato: T): void {
        const node = new NoDuplo(objContato);
        if (this._head === null) {
            this._head = node;
            this._tail = node;
        } else {
            node.next = this._head;
            this._head.previous = node;
            this._head = node;
        }
        this._length++;
    }

    public pop(): T {
        if (this._tail === null) {
            throw new RangeError("Não é possível remover o último elemento de uma lista vazia.");
        }
        const element = this._tail.element;
        this._tail = this._tail.previous;
        if (this._tail === null) {
            this._head = null;
        } else {
            this._tail.next = null;
        }
        this._length--;
        return element;
    }

    public shift(): T {
        if (this._head === null) {
            throw new RangeError("Não é possível remover o primeiro elemento de uma lista vazia.");
        }
        const element = this._head.element;
        this._head = this._head.next;
        if (this._head === null) {
            this._tail = null;
        } else {
            this._head.previous = null;
        }
        this._length--;
        return element;
    }

    private getNoAt(index: number): NoDuplo<T> {
        if (!Number.isInteger(index) || index < 0 || index >= this._length) {
            throw new RangeError("Índice fora dos limites da lista.");
        }
        if (index < this._length / 2) {
            let node = this._head!;
            for (let i = 0; i < index; i++) {
                node = node.next!;
            }
            return node;
        }
        let node = this._tail!;
        for (let i = this._length - 1; i > index; i--) {
            node = node.previous!;
        }
        return node;
    }

    public getElementAt(index: number): T {
        return this.getNoAt(index).element;
    }

    public insert(element: T, index: number): boolean {
        if (!Number.isInteger(index) || index < 0 || index > this._length) {
            return false;
        }
        if (index === 0) {
            this.unshift(element);
        } else if (index === this._length) {
            this.push(element);
        } else {
            const next = this.getNoAt(index);
            const previous = next.previous!;
            const node = new NoDuplo(element);
            node.previous = previous;
            node.next = next;
            previous.next = node;
            next.previous = node;
            this._length++;
        }
        return true;
    }

    public removeAt(index: number): T {
        const node = this.getNoAt(index);
        if (node.previous === null) {
            this._head = node.next;
        } else {
            node.previous.next = node.next;
        }
        if (node.next === null) {
            this._tail = node.previous;
        } else {
            node.next.previous = node.previous;
        }
        this._length--;
        return node.element;
    }

    public remove(element: T): T {
        const index = this.findIndex(element);
        if (index === -1) {
            throw new RangeError("O elemento não foi encontrado na lista.");
        }
        return this.removeAt(index);
    }

    public findIndex(element: T): number {
        let node = this._head;
        let index = 0;
        while (node !== null) {
            if (element.equals(node.element)) {
                return index;
            }
            node = node.next;
            index++;
        }
        return -1;
    }

    public isEmpty(): boolean {
        return this._length === 0;
    }

    public toString(): string {
        const elements: string[] = [];
        let node = this._head;
        while (node !== null) {
            elements.push(String(node.element));
            node = node.next;
        }
        return elements.join("\n");
    }

    public reverse(): void {
        let node = this._head;
        while (node !== null) {
            const next = node.next;
            node.next = node.previous;
            node.previous = next;
            node = next;
        }
        const oldHead = this._head;
        this._head = this._tail;
        this._tail = oldHead;
    }

    public sort(): void {
        if (this._length < 2) {
            return;
        }
        let objTrocado: boolean;
        do {
            objTrocado = false;
            let noDuplo = this._head!;
            while (noDuplo.next !== null) {
                if (noDuplo.element.compareTo(noDuplo.next.element) > 0) {
                    const element = noDuplo.element;
                    noDuplo.element = noDuplo.next.element;
                    noDuplo.next.element = element;
                    objTrocado = true;
                }
                noDuplo = noDuplo.next;
            }
        } while (objTrocado);
    }
}
