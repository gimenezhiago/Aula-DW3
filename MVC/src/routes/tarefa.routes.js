import { listarTarefas, criarTarefa, obterResumo, obterTarefa, atualizarTarefa, concluirTarefa, removerTarefa, pendentes } from '../controllers/tarefa.controller.js';

export default async function tarefaRoutes(server, options) {

  // PROCESSAMENTO das requisições relacionadas às tarefas.

  server.get("/tarefas", async (request, reply) => {
    return listarTarefas(request, reply);
  });

  server.post("/tarefas", async (request, reply) => {
    return criarTarefa(request, reply);
  });

  // ATENÇÃO À ORDEM DAS ROTAS: Rotas estáticas (como /resumo) devem
  // vir antes de rotas com parâmetros dinâmicos (como /:id) para evitar
  // que "resumo" seja interpretado como um :id pelo servidor.
  server.get("/tarefas/resumo", async (request, reply) => {
    return obterResumo(request, reply);
  });

  server.get("/tarefas/pendentes", async (request, reply) => {
    return pendentes(request, reply);
  })

  server.get("/tarefas/:id", async (request, reply) => {
    return obterTarefa(request, reply);
  });

  server.patch("/tarefas/:id", async (request, reply) => {
    return atualizarTarefa(request, reply);
  });

  server.patch("/tarefas/:id/concluir", async (request, reply) => {
    return concluirTarefa(request, reply);
  });

  server.delete("/tarefas/:id", async (request, reply) => {
    return removerTarefa(request, reply);
  });
}
