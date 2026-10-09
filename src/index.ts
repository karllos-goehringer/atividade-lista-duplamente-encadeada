import { LstContatos } from './LstContatos';
import { Contato } from "./Contato";

let lst = new LstContatos();

//lst.push(new Contato("Marcos", "2345-2345"));
//lst.unshift(new Contato("Oscar", "9999-1111"));
//console.log("Lista após inserções de Marcos e Oscar:");
//console.log(lst.toString());

//lst.insert(new Contato("Ana", "1234-5678"), 1);

//console.log("Lista após inserção da Ana na posição 1:");
//console.log(lst.toString());

//console.log("Índice do contato 'Oscar' passando objeto como parâmetro:");
//console.log(lst.findIndex(new Contato("Oscar", "9999-1111")));

//console.log("Índice do contato 'Ana' passando string como parâmetro:");
//console.log(lst.findIndex("Ana"));

//console.log("Removendo Contato Oscar:");
//const contatoOscar = lst.search("Oscar");
//console.log(lst.remove(contatoOscar as Contato));

//console.log("Lista após remoção:");
//console.log(lst.toString());
lst.push(new Contato("Abaporu", "5555-0099"));
lst.push(new Contato("Ronald", "9999-9999"));
lst.push(new Contato("Maquiavel", "5555-8888"));
lst.push(new Contato("ALberto", "5555-7777"));
lst.push(new Contato("Charles", "5555-6666"));
lst.push(new Contato("Henrique", "5555-4554"));
lst.push(new Contato("Carlos", "5555-5555"));
lst.push(new Contato("Beatriz", "5555-4444"));
//lst.insert(new Contato("Bruno", "4444-4444"), 2);
//console.log("Lista após inserções de Carlos no final e de Bruno na posição 2:");
console.log(lst.toString());
console.log("Iniciando método pop 1");
console.log(lst.pop());
console.log(lst.toString());

console.log("Iniciando método pop 2");
console.log(lst.pop());
console.log(lst.toString());

console.log("Iniciando método shift 1");
console.log(lst.shift());
console.log(lst.toString());

console.log("Iniciando método shift 2");
console.log(lst.shift());
console.log(lst.toString());

console.log("Invertendo a Lista");
lst = lst.reverse();
console.log(lst.toString());

console.log("Ordenando a Lista");
lst = lst.sort();
console.log(lst.toString());
