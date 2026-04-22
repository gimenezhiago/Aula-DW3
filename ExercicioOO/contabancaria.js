class ContaBancaria {
    constructor(titular, saldo) {
        this.titular = titular;
        this.saldo = saldo;
    }

    depositar(valor) {
        this.saldo += valor;
        console.log(`Depósito de R$${valor} realizado com sucesso.`);

    }

    sacar(valor) {
        if (valor <= this.saldo) {
            this.saldo -= valor;
        } else {
            console.log("Saldo insuficiente.");
        }
    }


    exibirSaldo() {
        console.log(`Titular: ${this.titular} | Saldo: R$ ${Number(this.saldo).toFixed(2)}`);
    }
}

const conta1 = new ContaBancaria("Ana", 100.00);
const conta2 = new ContaBancaria("Carlos", 110.00);

conta1.depositar(50.00);
conta2.sacar(30.00);

conta1.exibirSaldo();
conta2.exibirSaldo();