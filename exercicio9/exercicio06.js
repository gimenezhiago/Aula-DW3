function processarPagamento(valor) {
    if (typeof valor !== "number" || valor <= 0) {
        throw new Error("Valor inválido");
    }

    return "Pagamento aprovado";
}

try {
    console.log(processarPagamento(100));
} catch (error) {
    console.log("Erro:", error.message);
}

try {
    console.log(processarPagamento(0));
} catch (error) {
    console.log("Erro:", error.message);
}
