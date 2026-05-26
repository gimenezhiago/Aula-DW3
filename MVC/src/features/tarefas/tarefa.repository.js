// @file: src/features/tarefas/tarefa.repository.js

export class TarefaRepository {
  constructor() {
    this.tarefas = [
      { id: 1, titulo: "Fazer compras", status: "pendente" },
      { id: 2, titulo: "Lavar o carro", status: "pendente" },
      { id: 3, titulo: "Estudar Fastify", status: "concluida" }
    ]
  }

  async listarTodos() {
    console.log("Repository: listarTodos chamado")
    return this.tarefas
  }

  async buscarPorId(id) {
    console.log("Repository: buscarPorId chamado")
    return this.tarefas.find(t => t.id === parseInt(id)) ?? null
  }

  async salvar(tarefa) {
    console.log("Repository: salvar chamado")
    const novoId = this.tarefas.length > 0
      ? this.tarefas[this.tarefas.length - 1].id + 1
      : 1
    const novaTarefa = { id: novoId, ...tarefa }
    this.tarefas.push(novaTarefa)
    return novaTarefa
  }

  async atualizar(id, dadosAtualizados) {
    console.log("Repository: atualizar chamado")
    const index = this.tarefas.findIndex(t => t.id === parseInt(id))
    if (index === -1) return null
    this.tarefas[index] = { ...this.tarefas[index], ...dadosAtualizados, id }
    return this.tarefas[index]
  }

  async remover(id) {
    console.log("Repository: remover chamado")
    const index = this.tarefas.findIndex(t => t.id === parseInt(id))
    if (index === -1) return false
    this.tarefas.splice(index, 1)
    return true
  }
}
