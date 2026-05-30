class ValidationError extends Error {
    constructor(message, details = []) {
        super(message);
        this.name = "ValidationError";
        this.details = details;
    }
}

function validarAluno(aluno) {
    const errors = [];

    if (!aluno || typeof aluno.nome !== "string" || aluno.nome.trim() === "") {
        errors.push("Nome é obrigatório");
    }

    if (!aluno || typeof aluno.email !== "string" || !aluno.email.includes("@")) {
        errors.push("Email deve conter @");
    }

    if (!aluno || typeof aluno.idade !== "number" || aluno.idade < 16) {
        errors.push("Idade deve ser número maior ou igual a 16");
    }

    if (errors.length > 0) {
        throw new ValidationError("Aluno inválido", errors);
    }

    return true;
}

function testarAluno(aluno) {
    try {
        console.log(validarAluno(aluno));
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log("ValidationError:", error.message);
            console.log("details:", error.details);
        } else {
            console.log("Erro inesperado:", error.message);
        }
    }
}

testarAluno({ nome: "Ana", email: "ana@exemplo.com", idade: 18 });
testarAluno({ nome: "", email: "anaexemplo.com", idade: 15 });
