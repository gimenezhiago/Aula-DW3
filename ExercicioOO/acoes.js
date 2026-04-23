class Acoes {
    constructor(titulo) {
        this.titulo = titulo;
        this.conteudo = "";
        this._historico = [];
    }

    editar(novoConteudo) {
        this._historico.push(this.conteudo);
        this.conteudo = novoConteudo;
    }

    desfazer() {
        if (this._historico.length > 0) {
            this.conteudo = this._historico.pop();
        } else {
            console.log("Nada para desfazer.");
        }
    }

    exibir() {
        console.log(`[${this.titulo}] Conteúdo atual: ${this.conteudo}`);
    }
}

const acoes = new Acoes("Relatório");
acoes.editar("Primeira versão do texto.");
acoes.editar("Segunda versão do relatório.");
acoes.editar("Versão final do relatório.");
acoes.desfazer();
acoes.desfazer();
acoes.exibir();