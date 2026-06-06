// @file: src/features/tarefas/tarefa.controller.js

export class TarefaController {
  constructor(service) {
    this.service = service
  }

  normalizeTarefa(tarefa) {
    if (!tarefa) return tarefa
    return {
      ...tarefa,
      descricao: tarefa.descricao ?? tarefa.titulo,
      titulo: tarefa.titulo ?? tarefa.descricao,
      concluido: tarefa.concluido ?? (tarefa.status === 'concluida'),
      status: tarefa.status ?? (tarefa.concluido ? 'concluida' : 'pendente')
    }
  }

  async listar(request, reply) {
    const { busca, status, concluido } = request.query
    const filtros = { busca, status }
    if (concluido !== undefined) {
      filtros.status = concluido === 'true' ? 'concluida' : 'pendente'
    }
    const tarefas = await this.service.listarTarefas(filtros)
    return reply.send(tarefas.map(tarefa => this.normalizeTarefa(tarefa)))
  }

  async buscar(request, reply) {
    const { id } = request.params
    const tarefa = this.normalizeTarefa(await this.service.buscarPorId(id))
    return reply.send(tarefa)
  }

  async criar(request, reply) {
    const payload = {
      titulo: request.body.titulo ?? request.body.descricao,
      status: request.body.status ?? (request.body.concluido ? 'concluida' : 'pendente')
    }
    const tarefa = this.normalizeTarefa(await this.service.criarTarefa(payload))
    return reply.status(201).send(tarefa)
  }

  async atualizar(request, reply) {
    const { id } = request.params
    const body = request.body || {}
    let status = body.status
    if (status === undefined) {
      if (body.concluido === true || body.concluido === 'true') status = 'concluida'
      if (body.concluido === false || body.concluido === 'false') status = 'pendente'
    }
    const payload = {
      titulo: body.titulo ?? body.descricao,
      status
    }
    const tarefa = this.normalizeTarefa(await this.service.atualizarTarefa(id, payload))
    return reply.send(tarefa)
  }

  async concluir(request, reply) {
    const { id } = request.params
    const tarefa = this.normalizeTarefa(await this.service.concluirTarefa(id))
    return reply.send(tarefa)
  }

  async remover(request, reply) {
    const { id } = request.params
    await this.service.removerTarefa(id)
    return reply.status(204).send()
  }

  async resumo(request, reply) {
    const resumo = await this.service.resumo()
    return reply.send(resumo)
  }
}
