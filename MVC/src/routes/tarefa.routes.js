// @file: src/routes/tarefa.routes.js

export default async function tarefaRoutes(server, options) {
  const { controller } = options    // ← recebe o controller de fora

  server.get('/tarefas', async (request, reply) => {
    console.log("Routes: GET /tarefas chamada")
    return await controller.listarTarefas(request, reply)
  })

  server.post('/tarefas', async (request, reply) => {
    console.log("Routes: POST /tarefas chamada")
    return await controller.criarTarefa(request, reply)
  })

  server.get('/tarefas/resumo', async (request, reply) => {
    console.log("Routes: GET /tarefas/resumo chamada")
    return await controller.obterResumo(request, reply)
  })

  server.get('/tarefas/pendentes', async (request, reply) => { 
    console.log("Routes: GET /tarefas/pendentes chamada")
    return await controller.obterTarefasPendentes(request, reply)
  }) 

  server.get('/tarefas/:id', async (request, reply) => {
    console.log("Routes: GET /tarefas/:id chamada")
    return await controller.obterTarefa(request, reply)
  })

  server.patch('/tarefas/:id', async (request, reply) => {
    console.log("Routes: PATCH /tarefas/:id chamada")
    return await controller.atualizarTarefa(request, reply)
  })

  server.patch('/tarefas/:id/concluir', async (request, reply) => {
    console.log("Routes: PATCH /tarefas/:id/concluir chamada")
    return await controller.concluirTarefa(request, reply)
  })

  server.delete('/tarefas/:id', async (request, reply) => {
    console.log("Routes: DELETE /tarefas/:id chamada")
    return await controller.removerTarefa(request, reply)
  })
}