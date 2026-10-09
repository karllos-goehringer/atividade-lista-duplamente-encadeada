import { Contato } from "./Contato";

export class LstContatos {
    private _elemento: Contato | null;
    private _sucessor: LstContatos | null;
    private _length: number;

    constructor(objContato?: Contato) {
        if (objContato == undefined) {
            this._length = 0;
            this._elemento = null;
            this._sucessor = null;
        } else {
            this._length = 1;
            this._elemento = objContato;
            this._sucessor = null;
        }
    }

    public get length(): number {
        return this._length;
    }
    public set length(value: number) {
        this._length = value;
    }

    public push(objContato: Contato): void {
        if (this._length == 0) {
            this._elemento = objContato;
        } else {
            let lstAux: LstContatos = this;
            while (lstAux._sucessor != null) {
                lstAux.length++;
                lstAux = lstAux._sucessor;
            }
            lstAux.length++;
            lstAux._sucessor = new LstContatos(objContato);
        }
    }

    public unshift(objContato: Contato): void {
        if (this._length == 0) {
            this._elemento = objContato;
        } else {
            const lstAux: LstContatos = new LstContatos(this._elemento as Contato);
            lstAux._sucessor = this._sucessor;
            this._elemento = objContato;
            this._sucessor = lstAux;
        }
        this._length++;
    }
    public insert(objContato: Contato, index: number): boolean {
        if (index >= 0 && index <= this._length) {
            if (index == 0) {
                this.unshift(objContato);
            } else if (index == this._length) {
                this.push(objContato);
            } else {
                let lstAux: LstContatos = this;
                for (let i = 0; i < index - 1; i++) {
                    lstAux = lstAux._sucessor as LstContatos;
                }
                const lstAux2: LstContatos = new LstContatos(objContato);
                lstAux2._sucessor = lstAux._sucessor;
                lstAux._sucessor = lstAux2;
                this._length++;
            }
            return true;
        }
        return false;
    }
    public remove(objContato: Contato): boolean {
        if (this._length > 0) {
            if ((this._elemento as Contato).equals(objContato)) {
                if (this._sucessor == null) {
                    this._elemento = null;
                } else {
                    this._elemento = this._sucessor._elemento;
                    this._sucessor = this._sucessor._sucessor;
                }
                this._length--;
                return true;
            } else {
                let lstAux: LstContatos = this;
                while (lstAux._sucessor != null) {
                    if ((lstAux._sucessor._elemento as Contato).equals(objContato)) {
                        lstAux._sucessor = lstAux._sucessor._sucessor;
                        this._length--;
                        return true;
                    }
                    lstAux = lstAux._sucessor;
                }
            }
        }
        return false;
    }
    public search(nome: string): Contato | null {
        let lstAux: LstContatos = this;
        while (lstAux._elemento != null) {
            if (lstAux._elemento.nome === nome) {
                return lstAux._elemento;
            }
            lstAux = lstAux._sucessor as LstContatos;
        }
        return null;
    }
    
    public findIndex(objContato: Contato): number;
    public findIndex(nome: string): number;
    public findIndex(param: Contato | string): number {
        let lstAux: LstContatos = this;
        let index: number = 0;
        if (this._length != 0) {
            do {
                if ((param instanceof Contato && (lstAux._elemento as Contato).equals(param)) ||
                    (typeof param === "string" && (lstAux._elemento as Contato).nome === param) ) {
                    return index;
                }
                lstAux = lstAux._sucessor as LstContatos;
                index++;
            } while (lstAux != null)
        }
        return -1;
    }

    public pop(){
        if(this._sucessor === null){
            return null;
        }
        let atual = this._sucessor;
        while (atual._sucessor !== null) {
            atual = atual._sucessor;
        }
        this.remove(atual._elemento as Contato);
        return atual;
    }
    public shift(){
       if(this._sucessor === null){ 
            return null;
       }
        let atual = this._elemento;
        this.remove(atual as Contato);
        return atual;
    }
    public reverse(): LstContatos {
        let anterior: LstContatos | null = null;
        let atual: LstContatos | null = this;
        let proximo: LstContatos | null = null; 

        while (atual !== null) {
            proximo = atual._sucessor; 
            atual._sucessor = anterior; 
            anterior = atual; 
            atual = proximo;
        }
        return anterior as LstContatos;
    }
    public sort(): LstContatos {
        if (this._sucessor === null) {
            return this;
        }
        let proximo: LstContatos = this._sucessor;
        this._sucessor = null;
        let restoOrdenado: LstContatos = proximo.sort();
        return this.inserirOrdenado(restoOrdenado, this);
    }

    private inserirOrdenado(lista: LstContatos | null, novoNo: LstContatos): LstContatos {
        if (lista === null || lista._elemento!.compareTo(novoNo._elemento as Contato) > 0) {
            novoNo._sucessor = lista;
            return novoNo;
        }
        lista._sucessor = this.inserirOrdenado(lista._sucessor, novoNo);
        return lista;
    }
    public toString(): string {
        let lstAux: LstContatos = this;
        let lstString: string = "";
        while (lstAux != null && lstAux._elemento != null) {
            lstString += `${lstAux._elemento.toString()}\n`;
            lstAux = lstAux._sucessor as LstContatos;
        }
        return lstString;
    }
    
}
