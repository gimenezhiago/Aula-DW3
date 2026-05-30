class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

function criarProduto(dados) {
    if (!dados || typeof dados.nome !== "string" || dados.nome.trim() === "") {
        throw new ValidationError("Nome é obrigatório");
    }

    if (typeof dados.preco !== "number" || dados.preco <= 0) {
        throw new ValidationError("Preço deve ser um número maior que zero");
    }

    if (typeof dados.estoque !== "number" || !Number.isInteger(dados.estoque) || dados.estoque < 0) {
        throw new ValidationError("Estoque deve ser um número inteiro maior ou igual a zero");
    }

    return {
        nome: dados.nome,
        preco: dados.preco,
        estoque: dados.estoque
    };
}

function testarProduto(dados) {
    try {
        const produto = criarProduto(dados);
        console.log(produto);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log(`Erro de validação: ${error.message}`);
        } else {
            console.log("Erro inesperado");
        }
    }
}

testarProduto({ nome: "Caneta", preco: 2.5, estoque: 10 });
testarProduto({ nome: "", preco: 2.5, estoque: 10 });
testarProduto({ nome: "Caneta", preco: -5, estoque: 10 });
testarProduto({ nome: "Caneta", preco: 2.5, estoque: 1.5 });
