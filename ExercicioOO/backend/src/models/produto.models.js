class ProdutoModel {
    constructor() {
        this.produtos = [
            { id: 1, nome: "Produto 1", preco: 10.0 },
            { id: 2, nome: "Produto 2", preco: 20.0 },
            { id: 3, nome: "Produto 3", preco: 30.0 },
        ];
        this.proximoId = 4;
    }

    findAll() {
        return this.produtos;
    }

    findById(id) {
        return this.produtos.find(produto => produto.id === id) ?? undefined;
    }

    create(dados) {
        const novoProduto = { id: this.proximoId++, ...dados };
        this.produtos.push(novoProduto);
        return novoProduto;
    }

    delete(id) {
        const index = this.produtos.findIndex(produto => produto.id === id);
        if (index !== -1) {
            this.produtos.splice(index, 1);
            return true
        } else {
            return false
        }

    }

    static validar(dados) {
        const erros = [];

        if (!dados.nome || typeof dados.nome !== 'string' || dados.nome.trim() === '') {
            erros.push('Nome é obrigatório e não pode ser vazio');
        }

        if (typeof dados.preco !== 'number' || dados.preco <= 0) {
            erros.push('Preço é obrigatório e deve ser um número maior que 0');
        }

        return {
            valido: erros.length === 0,
            erros: erros
        };
    }
}

export default ProdutoModel