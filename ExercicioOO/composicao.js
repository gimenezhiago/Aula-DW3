class Cliente {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }

  exibir() {
    console.log(`${this.nome} <${this.email}>`);
  }
}

class Pedido {
  constructor(id) {
    this.id = id;
    this.clientes = [];
    this.itens = [];
    this.status = "Aberto";
  }

  adicionarCliente(cliente) {
    this.clientes.push(cliente);
  }

  adicionarItem(descricao, valor) {
    const item = {
      descricao: descricao,
      valor: valor,
    };
    this.itens.push(item);
  }

  total() {
    return this.itens.reduce((soma, item) => soma + item.valor, 0);
  }

  fechar() {
    this.status = "Fechado";
  }

  exibir() {
    console.log(`Pedido #${this.id} | Status: ${this.status}`);
    this.clientes.forEach((cliente) => {
      cliente.exibir();
    });
    console.log(`Itens:`);
    this.itens.forEach((item) => {
      console.log(`  - ${item.descricao}: R$ ${item.valor.toFixed(2)}`);
    });
    console.log(`Total: R$ ${this.total().toFixed(2)}`);
  }
}

const cliente1 = new Cliente("Ana", "ana@email.com");
const pedido1 = new Pedido(1);
pedido1.adicionarCliente(cliente1);
pedido1.adicionarItem("Teclado", 200.00);
pedido1.adicionarItem("Mouse", 80.00);
pedido1.fechar();
pedido1.exibir();
