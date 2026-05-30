class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

try {
    throw new ValidationError("Dados inválidos");
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(`Erro de validação: ${error.message}`);
    } else {
        console.log("Erro inesperado");
    }
    console.log("name:", error.name);
    console.log("instanceof ValidationError:", error instanceof ValidationError);
}
