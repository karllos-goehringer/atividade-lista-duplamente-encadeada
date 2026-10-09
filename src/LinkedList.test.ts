import { describe, expect, it } from "@jest/globals";
import { LinkedList } from "./LinkedList";
import { IComparable } from "./IComparable";

class TestValue implements IComparable {
    constructor(public readonly value: number) {}

    equals(other: IComparable): boolean {
        return other instanceof TestValue && this.value === other.value;
    }

    compareTo(other: IComparable): number {
        if (!(other instanceof TestValue)) {
            throw new TypeError("O valor comparado precisa ser um TestValue.");
        }
        return this.value - other.value;
    }

    toString(): string {
        return String(this.value);
    }
}

type LinkNode = {
    element: TestValue;
    next: LinkNode | null;
    previous: LinkNode | null;
};

type LinkedListInternals = {
    _head: LinkNode | null;
    _tail: LinkNode | null;
};

const value = (number: number): TestValue => new TestValue(number);
const valuesOf = (list: LinkedList<TestValue>): number[] =>
    Array.from({ length: list.length }, (_, index) => list.getElementAt(index)!.value);

function expectLinks(list: LinkedList<TestValue>, expected: number[]): void {
    const { _head, _tail } = list as unknown as LinkedListInternals;
    const nodes: LinkNode[] = [];
    let current = _head;

    while (current !== null) {
        nodes.push(current);
        current = current.next;
    }

    expect(nodes.map((node) => node.element.value)).toEqual(expected);
    expect(nodes.length).toBe(list.length);
    expect(_head?.previous ?? null).toBeNull();
    expect(_tail?.next ?? null).toBeNull();
    expect(nodes[nodes.length - 1] ?? null).toBe(_tail);

    nodes.forEach((node, index) => {
        expect(node.previous).toBe(index === 0 ? null : nodes[index - 1]);
        expect(node.next).toBe(index === nodes.length - 1 ? null : nodes[index + 1]);
    });
}

describe("LinkedList duplamente encadeada", () => {
    describe("construção e consulta", () => {
        it("inicia vazia ou com um elemento", () => {
            const empty = new LinkedList<TestValue>();
            const populated = new LinkedList(value(7));

            expect(empty.length).toBe(0);
            expect(empty.isEmpty()).toBe(true);
            expectLinks(empty, []);
            expect(populated.length).toBe(1);
            expect(populated.getElementAt(0)?.value).toBe(7);
            expectLinks(populated, [7]);
        });

        it("retorna elementos em índices válidos e undefined para índices inválidos", () => {
            const list = new LinkedList(value(1));
            list.push(value(2));

            expect(list.getElementAt(0)?.value).toBe(1);
            expect(list.getElementAt(1)?.value).toBe(2);
            expect(list.getElementAt(-1)).toBeUndefined();
            expect(list.getElementAt(2)).toBeUndefined();
        });

        it("encontra elementos por igualdade e retorna -1 quando não existem", () => {
            const list = new LinkedList(value(4));
            list.push(value(8));
            list.push(value(12));

            expect(list.findIndex(value(8))).toBe(1);
            expect(list.findIndex(value(99))).toBe(-1);
        });
    });

    describe("inserção", () => {
        it("adiciona no final e no início mantendo os dois sentidos", () => {
            const list = new LinkedList<TestValue>();
            list.push(value(2));
            list.push(value(3));
            list.unshift(value(1));

            expect(valuesOf(list)).toEqual([1, 2, 3]);
            expectLinks(list, [1, 2, 3]);
        });

        it("insere no início, no meio e no final", () => {
            const list = new LinkedList(value(2));

            expect(list.insert(value(1), 0)).toBe(true);
            expect(list.insert(value(3), 2)).toBe(true);
            expect(list.insert(value(9), 1)).toBe(true);
            expectLinks(list, [1, 9, 2, 3]);
        });

        it("rejeita índices inválidos sem alterar a lista", () => {
            const list = new LinkedList(value(1));

            expect(list.insert(value(0), -1)).toBe(false);
            expect(list.insert(value(2), 2)).toBe(false);
            expectLinks(list, [1]);
        });
    });

    describe("remoção", () => {
        it("remove elementos do início, meio e fim atualizando os links", () => {
            const list = new LinkedList(value(1));
            list.push(value(2));
            list.push(value(3));
            list.push(value(4));

            expect(list.removeAt(1)?.value).toBe(2);
            expectLinks(list, [1, 3, 4]);
            expect(list.removeAt(0)?.value).toBe(1);
            expectLinks(list, [3, 4]);
            expect(list.removeAt(1)?.value).toBe(4);
            expectLinks(list, [3]);
        });

        it("retorna undefined ao remover de índices inválidos ou de lista vazia", () => {
            const list = new LinkedList(value(1));

            expect(list.removeAt(-1)).toBeUndefined();
            expect(list.removeAt(1)).toBeUndefined();
            expectLinks(list, [1]);
            expect(new LinkedList<TestValue>().removeAt(0)).toBeUndefined();
        });

        it("remove o primeiro elemento igual e deixa a lista intacta se não encontrar", () => {
            const list = new LinkedList(value(5));
            list.push(value(6));
            list.push(value(5));

            expect(list.remove(value(5))?.value).toBe(5);
            expectLinks(list, [6, 5]);
            expect(list.remove(value(99))).toBeUndefined();
            expectLinks(list, [6, 5]);
        });

        it("remove elementos pelas extremidades com pop e shift, inclusive lista unitária", () => {
            const list = new LinkedList(value(2));
            list.unshift(value(1));
            list.push(value(3));

            expect(list.pop()?.value).toBe(3);
            expectLinks(list, [1, 2]);
            expect(list.shift()?.value).toBe(1);
            expectLinks(list, [2]);
            expect(list.pop()?.value).toBe(2);
            expectLinks(list, []);
            expect(list.pop()).toBeUndefined();
            expect(list.shift()).toBeUndefined();
        });
    });

    describe("estado e representação", () => {
        it("identifica lista vazia e limpa todos os elementos", () => {
            const list = new LinkedList(value(1));
            list.push(value(2));

            expect(list.isEmpty()).toBe(false);
            list.clear();
            expect(list.length).toBe(0);
            expect(list.isEmpty()).toBe(true);
            expect(list.getElementAt(0)).toBeUndefined();
            expectLinks(list, []);
        });

        it("converte os elementos em texto separados por quebras de linha", () => {
            const list = new LinkedList(value(1));
            list.push(value(2));

            expect(list.toString()).toBe("1\n2");
            expect(new LinkedList<TestValue>().toString()).toBe("");
        });
    });

    describe("reverse e sort", () => {
        it("inverte a lista preservando os links anteriores e seguintes", () => {
            const list = new LinkedList(value(1));
            list.push(value(2));
            list.push(value(3));

            list.reverse();
            expectLinks(list, [3, 2, 1]);
            list.reverse();
            expectLinks(list, [1, 2, 3]);
            new LinkedList<TestValue>().reverse();
        });

        it("ordena em ordem crescente sem quebrar os links", () => {
            const list = new LinkedList(value(3));
            list.push(value(1));
            list.push(value(2));

            list.sort();
            expectLinks(list, [1, 2, 3]);
            new LinkedList<TestValue>().sort();
        });
    });
});
