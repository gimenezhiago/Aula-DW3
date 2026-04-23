class FilaAtendimento {
    constructor() {
        this._fila = [];
        this.contador = 1;
    }

    entrar(nome) {
        const senha = {
            senha: this.contador, nome: nome
        }
        this._fila.push(senha);
        console.log(`Senha ${this.contador} gerada para ${nome}.`);
        this.contador++;
    }

    chamarProximo() {
        if (this._fila.length > 0) {
            const proximo = this._fila.shift();
            console.log(`Chamando senha ${proximo.senha} - ${proximo.nome}.`);
        }
    }

    tamanho() {
        console.log(`Pessoas na fila: ${this._fila.length}`);
    }
}

const fila = new FilaAtendimento();
fila.entrar("Ana");
fila.entrar("Bruno");
fila.entrar("Carla");
fila.chamarProximo();
fila.chamarProximo();
fila.tamanho();