function buscarPedido(id) {
    return new Promise((resolve, reject) => {
        if (typeof id === "undefined") {
            return reject(new Error("ID do pedido é obrigatório"));
        }

        setTimeout(() => {
            if (id !== 1) {
                reject(new Error("Pedido não encontrado"));
            } else {
                resolve({ id: 1, total: 150 });
            }
        }, 1000);
    });
}

async function executar() {
    try {
        const pedido = await buscarPedido(1);
        console.log("Pedido encontrado:", pedido);
    } catch (error) {
        console.log("Erro:", error.message);
    }

    try {
        await buscarPedido(99);
    } catch (error) {
        console.log("Erro:", error.message);
    }
}

executar();
