class Estoque {
  constructor() {
    this.produtos = [];
  }

  cadastrar(nome, quantidade) {
    if (nome === produto.nome) {
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
}
