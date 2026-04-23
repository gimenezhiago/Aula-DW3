class Estoque {
  constructor() {
    this.produtos = [];
  }

  cadastrar(nome, quantidade) {
    if (nome === this.produtos.nome) {
      console.log("Produto já cadastrado.");
      return;
    } else {
      const produto = {
        nome: nome,
        quantidade: quantidade,
      };
      this.produtos.push(produto);
    }
  }

  entrada(nome, quantidade) {
    const produto = this.produtos.find((p) => p.nome === nome);
    if (produto) {
      produto.quantidade += quantidade;
    } else {
      console.log("Produto não encontrado.");
    }
  }

  saida(nome, quantidade) {
    const produto = this.produtos.find((p) => p.nome === nome);
    if (produto) {
      if (produto.quantidade >= quantidade) {
        produto.quantidade -= quantidade;
      } else {
        console.log("Quantidade insuficiente.");
      }
    } else {
      console.log("Produto não encontrado.");
    }
  }

  exibir() {
    this.produtos.forEach((produto) => {
      console.log(`${produto.nome}: ${produto.quantidade} unidades`);
    });
  }
}

const estoque = new Estoque();
estoque.cadastrar("Caneta", 40);
estoque.cadastrar("Caderno", 5);
estoque.entrada("Caderno", 3);
estoque.saida("Caneta", 10);
estoque.exibir();
