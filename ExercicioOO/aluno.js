class Aluno {
    constructor(nome) {
        this.nome = nome;
        this.notas = [];
    }

    adicionarNota(nota) {
        this.notas.push(nota);
    }

    calcularMedia() {
        if (this.notas.length === 0) {
            return 0;
        }

        const soma = this.notas.reduce((a, n) => a + n, 0);
        return soma / this.notas.length;
    }

    situacao() {
        const media = this.calcularMedia();
        if (media >= 6) {
            return "Aprovado";
        } else {
            return "Reprovado";
        }
    }

    exibir() {
        console.log(`${this.nome} | Média: ${this.calcularMedia().toFixed(2)} | ${this.situacao()}`);
    }
}

const aluno1 = new Aluno("Ana", []);
aluno1.adicionarNota(7.0);
aluno1.adicionarNota(8.5);
aluno1.adicionarNota(6.0);

aluno1.exibir();