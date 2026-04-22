class Carinho {
    constructor() {
        this.itens = [];
    }

    adicionar(nome, preco, quantidade) {
        const item = {
            nome: nome,
            preco: preco,
            quantidade: quantidade
        };
        this.itens.push(item);
    }

    remover(nome) {
        if (!this.itens.some(item => item.nome === nome)) {
            console.log("Item não encontrado");
            return;
        } else {
            //remove apenas um item
            const index = this.itens.findIndex(item => item.nome === nome);
            if (index !== -1) {
                this.itens.splice(index, 1);
            }
        }

    }

    total() {
        const total = this.itens.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
        return total;
    }

    exibir() {
        for (const item of this.itens) {
            console.log(`${item.quantidade}x ${item.nome} - R$ ${Number(item.preco).toFixed(2)}`);
        }
        console.log(`Total: R$ ${this.total().toFixed(2)}`);
    }
}

const carrinho1 = new Carinho();
carrinho1.adicionar("Feijão", 10.00, 1);
carrinho1.adicionar("Arroz", 10.00, 2);
carrinho1.remover("Feijão");
carrinho1.adicionar("Sabão", 5.50, 1);
carrinho1.exibir();