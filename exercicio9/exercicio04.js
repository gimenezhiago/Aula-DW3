class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}

const usuarios = [
    { id: 1, nome: 'Ana' },
    { id: 2, nome: 'Bruno' },
    { id: 3, nome: 'Carla' }
];

function buscarUsuarioPorId(id) {
    if (typeof id !== "number") {
        throw new ValidationError("ID deve ser número");
    }

    const usuario = usuarios.find((u) => u.id === id);

    if (!usuario) {
        throw new NotFoundError("Usuário não encontrado");
    }

    return usuario;
}

function testarBusca(id) {
    try {
        console.log(buscarUsuarioPorId(id));
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log(`ValidationError: ${error.message}`);
        } else if (error instanceof NotFoundError) {
            console.log(`NotFoundError: ${error.message}`);
        } else {
            console.log("Erro inesperado");
        }
    }
}

testarBusca(1);
testarBusca("1");
testarBusca(99);
