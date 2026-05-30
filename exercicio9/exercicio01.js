function dividir(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new Error("Os valores devem ser números");
    }

    if (b === 0) {
        throw new Error("Não é possível dividir por zero");
    }

    return a / b;
}

function testarDividir(a, b) {
    try {
        const resultado = dividir(a, b);
        console.log(`dividir(${JSON.stringify(a)}, ${JSON.stringify(b)}) =>`, resultado);
    } catch (error) {
        console.log(`dividir(${JSON.stringify(a)}, ${JSON.stringify(b)}) erro:`, error.message);
    }
}

testarDividir(10, 2);
testarDividir(10, 0);
testarDividir("10", 2);
