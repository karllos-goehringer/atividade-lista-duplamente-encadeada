import { LinkedList } from './LinkedList';
import { Contato } from "./Contato";

const lst = new LinkedList<Contato>();

lst.push(new Contato("Marcos", "2345-2345"));
lst.unshift(new Contato("Oscar", "9999-1111"));
lst.insert(new Contato("Ana", "1234-5678"), 1);

console.log("Lista após inserções:");
console.log(lst.toString());

console.log("Elemento removido na posição 1:");
console.log(lst.removeAt(1));

console.log("Lista após remoção:");
console.log(lst.toString());

console.log("Índice do contato 'Oscar':");
console.log(lst.findIndex(new Contato("Oscar", "9999-1111")));

console.log("Lista está vazia?");
console.log(lst.isEmpty());
console.log("Elemento removido do final (pop):");
console.log(lst.pop());

console.log("Lista após pop:");
console.log(lst.toString());

console.log("Elemento removido do início (shift):");
console.log(lst.shift());

console.log("Lista após shift:");
console.log(lst.toString());

lst.push(new Contato("Carlos", "5555-5555"));
lst.push(new Contato("Bruno", "4444-4444"));

console.log("Lista antes de reverter (reverse):");
console.log(lst.toString());

lst.reverse();
console.log("Lista após reverter:");
console.log(lst.toString());

lst.sort();
console.log("Lista após ordenar:");
console.log(lst.toString());

lst.clear();
console.log("Lista após limpar:");
console.log(lst.toString());
