class Livro {
    constructor(titulo, autor) {
        this.titulo = titulo;
        this.autor = autor;
        this.disponivel = true;
    }

    emprestar() {
        if (this.disponivel) {
            this.disponivel = false;
        } else {
            console.log("Livro indisponível");
        }
    }

    devolver() {
        this.disponivel = true;
    }

    exibir() {
        console.log(`${this.titulo} - ${this.autor} - ${this.disponivel ? "Disponível" : "Indisponível"}`);
    }
}

class Biblioteca {
    constructor(nome) {
        this.nome = nome;
        this.acervo = [];
    }

    adicionar(livro) {
        this.acervo.push(livro);
    }

    buscar(titulo) {
        return this.acervo.find(livro => livro.titulo === titulo) ?? null;
    }

    emprestar(titulo) {
        const livro = this.buscar(titulo);
        if (livro) {
            livro.emprestar();
        } else {
            console.log("Livro não encontrado");
        }
    }

    devolver(titulo) {
        const livro = this.buscar(titulo);
        if (livro) {
            livro.devolver();
        } else {
            console.log("Livro não encontrado");
        }
    }

    exibirAcervo() {
        for (const livro of this.acervo) {
            livro.exibir();
        }
    }
}

const biblioteca = new Biblioteca("Biblioteca Central");
const livro1 = new Livro("O Alquimista", "Paulo Coelho");
const livro2 = new Livro("Dom Casmurro", "Machado de Assis");
const livro3 = new Livro("1984", "George Orwell");

livro1.emprestar();
livro2.emprestar();

livro1.devolver();

biblioteca.adicionar(livro1);
biblioteca.adicionar(livro2);
biblioteca.adicionar(livro3);

biblioteca.exibirAcervo();