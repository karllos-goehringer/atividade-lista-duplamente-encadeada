import { IComparable } from "./IComparable";
class No<T extends IComparable> {
    protected _element: T;
    protected _next: No<T> | null;
    protected _previous: No<T> | null;
    constructor(element: T, next: No<T>|null = null, previous: No<T>|null = null) {
        this._element = element;
        this._next = next;
        this._previous = previous;
    }
    
    public get element(): T {
        return this._element;
    }
    public set element(newElement: T) {
        this._element = newElement;
    }

    public get next(): No<T> | null {
        return this._next;
    }
    public set next(no: No<T> | null) {
        this._next = no;
    }
    public set previous(no: No<T> | null) {
        this._previous = no;
    }
    public get previous(): No<T> | null {
        return this._previous;
    }
    
    toString(): string {
        return `Elemento => ${this._element}\nNext => ${this._next}\nPrevious => ${this._previous}`;
    }
}

export class LinkedList<T extends IComparable> {
    private _length: number;
    private _head: No<T> | null;
    private _tail: No<T> | null;

    constructor(element?: T) {
        if (element == undefined) {
            this._length = 0;
            this._head = null;
            this._tail = null;
        } else {
            this._length = 1;
            this._head = new No(element);
            this._tail = this._head;
        }
    }

    public get length(): number {
        return this._length;
    }
    
    public push(element: T) { //testar
        const noAux: No<T> = new No(element);
        if (this._head == null) {
            this._head = noAux;
            this._tail = this._head;
        } else {
            this._tail!.next = noAux;
            noAux.previous = this._tail;
            this._tail = noAux;
        }
        this._length++;
    }

    public unshift(element: T) {
        const noAux: No<T> = new No(element, this._head);
        if (this._head == null) { //indica que a lista está vazia
            this._tail = noAux;
        }
        this._head = noAux;
        this._length++;
    }

    private getNodeAt(index: number): No<T> | null {
        let noAux: No<T>|null = null;
        if (index >= 0 && index < this._length) {
            noAux = this._head;
            for (let i = 0; i < index; i++) {
                noAux = noAux!.next;
            }
        }
        return noAux;
    }

    public getElementAt(index: number): T | undefined {
        let noAux = this.getNodeAt(index);
        if (noAux != null) {
            return noAux.element;
        }
        return undefined;
    }

    public insert(element: T, index: number): boolean {
        if (index >= 0 && index <= this._length) {
            if (index == 0) {
                this.unshift(element);
            } else if (index == this._length) {
                this.push(element);
            } else {
                const previous = this.getNodeAt(index - 1);
                const newNode = new No(element, previous!.next, previous);

                previous!.next = newNode;
                this._length++;
            }
            return true;
        }
        return false;
    }

    public removeAt(index: number): T | undefined { //fica igual
        if (index >= 0 && index < this._length) {
            let current: No<T> | null = this._head;

            if (index === 0) {
                this._head = current!.next;
                if (this._length === 1) {
                    this._tail = null;
                }
            } else {
                const previous: No<T> | null = this.getNodeAt(index - 1);
                current = previous!.next;
                previous!.next = current!.next;
                if (index === this._length - 1) {//(current == tail) ou (current.next == null)
                    this._tail = previous;
                }
            }
            this._length--;
            return current!.element;
        }
        return undefined;
    }

    public remove(element: T): T | undefined {// fica igual
        const index = this.findIndex(element);
        return (index != -1) ? this.removeAt(index) : undefined;
    }

    public findIndex(searchedElement: T): number {//fica igual
        let current: No<T> | null = this._head;
        for (let i = 0; i < this._length; i++){
            if (searchedElement.equals(current!.element)) {//(current as No<T>).element)) {
                return i;
            }
            current = current!.next;//(current as No<T>).next;
        }
        return -1;
    }

    public isEmpty(): boolean { // fica igual
        return this._length === 0;
    }

    public clear() {//fica igual
        this._head = null;
        this._tail = null;
        this._length = 0;
    }

    toString(): string {// depois eu vejo
        if (this._head == null) {
            return "";
        }
        
        let objString = `${this._head.element}`;
        /*let auxNode = this._head.next;
        for (let i = 1; i < this._length; i++) {
            objString += `\n${auxNode.element}`;
            auxNode = auxNode.next;
        }*/
        let auxNode: No<T> | null = this._head.next;
        while(auxNode != null) {
            objString += `\n${auxNode.element}`;
            auxNode = auxNode.next;
        }
        return objString;
    }

    public pop(): T | undefined { //feito
        if (this._length == 0) {
            return undefined;
        } else {
            let elementAux: T = this._tail!.element;

            if (this._length == 1) {
                this._head = null;
                this._tail = null;
            } else {
                let previousNode: No<T> | null = this._head;
                while (previousNode!.next !== this._tail) {
                    previousNode = previousNode!.next;
                }
                previousNode!.next = null;
                this._tail = previousNode;
            }
            this._length--;
            return elementAux;
        }
    }

    public shift(): T | undefined { //fica igual
        if (this._length == 0) {
            return undefined;
        } else {
            let elementAux: T = this._head!.element;
            this._head = this._head!.next;
            if (this._length == 1) {
                this._tail = null;
            }
            this._length--;
            return elementAux;
        }
    }

    public reverse() {//feito
        /*if (this._length > 1) {
            let previousNode: No<T> | null = null;
            let currentNode: No<T> | null = this._head;
            let nextNode: No<T> | null = null;
            this._tail = this._head;
            while (currentNode != null) {
                nextNode = currentNode.next;
                currentNode.next = previousNode;
                previousNode = currentNode;
                currentNode = nextNode;
            }
            this._head = previousNode;
        }
        */
       if(this._length > 1) {
            //inverter cabeça e rabo
            let currentNode: No<T> | null = this._head;
            this._head = this._tail;
            this._tail = currentNode;
            //voltar a lista invertendo, quem era o proximo passa a ser o anterior e quem era o anterior passa a ser o proximo
            for (let i = 0; i < this._length; i++) {
                let nextNode: No<T> | null = currentNode!.next;
                currentNode!.next = currentNode!.previous;
                currentNode!.previous = nextNode;
                currentNode = nextNode;
            }
        }
    }

    public sort() {
        if (this._length > 1) {
            let sorted = false;
            while (!sorted) {
                sorted = true;
                let currentNode = this._head;
                while (currentNode!.next != null) {
                    if (currentNode!.element.compareTo(currentNode!.next.element) > 0) {
                        //[currentNode.element, currentNode.next.element] = [currentNode.next.element, currentNode.element];
                        let elementAux: T = currentNode!.element;
                        currentNode!.element = currentNode!.next.element;
                        currentNode!.next.element = elementAux;
                        sorted = false;
                    }
                    currentNode = currentNode!.next;
                }
            }
        }
    }
}