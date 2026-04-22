class Produto {
    constructor(nome, preco, estoque) {
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

    disponivel() {
        if (this.estoque > 0) {
            return true;
        } else {
            return false;
        }

    }

    exibir() {
        if (this.disponivel()) {
            this.estoque = "Em estoque";
        } else {
            this.estoque = "Fora de estoque";
        }

        console.log(`${this.nome} - R$ ${Number(this.preco).toFixed(2)} - ${this.estoque}`);

    }
}

const produto1 = new Produto("Notebook", 3500.00, 10);
const produto2 = new Produto("Fone de Ouvido", 150.00, 0);

produto1.exibir();
produto2.exibir();