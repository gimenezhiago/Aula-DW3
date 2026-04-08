import { listar, criar, buscarPorId, atualizar, alternarConcluido, remover, obterResumoTarefas, listarPendentes } from '../models/tarefa.model.js';

// Processa requisições da rota `GET /tarefas`
export async function listarTarefas(request, reply) {
  // LOG para indicar que a função foi chamada
  console.log("Controller: listarTarefas chamado");
  const { busca, concluido } = request.query;
  const resultado = await listar({ busca, concluido });
  return reply.send(resultado);
}

// Processa requisições da rota `POST /tarefas`
export async function criarTarefa(request, reply) {
    console.log("Controller: criarTarefa chamado");
    const { descricao } = request.body;
    
    if (!descricao || descricao.trim() === "") {
      return reply.status(400).send({
        status: "error",
        message: "A descrição da tarefa é obrigatória",
      });
    }
    
    const novaTarefa = await criar(descricao);
    return reply.status(201).send(novaTarefa);
}

// Processa requisições da rota `GET /tarefas/resumo`
export async function obterResumo(request, reply) {
    console.log("Controller: obterResumo chamado");
    const resumo = await obterResumoTarefas();
    return reply.send({ ...resumo });
}

// Processa requisições da rota `GET /tarefas/:id`
export async function obterTarefa(request, reply) {
    console.log("Controller: obterTarefa chamado");
    const id = Number(request.params.id);
    const tarefa = await buscarPorId(id);
    
    if (!tarefa) {
      return reply.status(404).send({
        status: "error",
        message: "Tarefa não encontrada",
      });
    }
    
    return reply.send(tarefa);
}

// Processa requisições da rota `PATCH /tarefas/:id`
export async function atualizarTarefa(request, reply) {
    console.log("Controller: atualizarTarefa chamado");
    const id = Number(request.params.id);
    const dadosAtualizados = request.body;
    
    const tarefaAtualizada = await atualizar(id, dadosAtualizados);
    
    if (!tarefaAtualizada) {
      return reply.status(404).send({
        status: "error",
        message: "Tarefa não encontrada",
      });
    }
    
    return reply.send(tarefaAtualizada);
}

// Processa requisições da rota `PATCH /tarefas/:id/concluir`
export async function concluirTarefa(request, reply) {
    console.log("Controller: concluirTarefa chamado");
    const id = Number(request.params.id);
    const tarefaAtualizada = await alternarConcluido(id);
    
    if (!tarefaAtualizada) {
      return reply.status(404).send({
        status: "error",
        message: "Tarefa não encontrada",
      });
    }
    
    return reply.send(tarefaAtualizada);
}

// Processa requisições da rota `DELETE /tarefas/:id`
export async function removerTarefa(request, reply) {
    console.log("Controller: removerTarefa chamado");
    const id = Number(request.params.id);
    const resultado = await remover(id);
    
    if (!resultado) {
      return reply.status(404).send({
        status: "error",
        message: "Tarefa não encontrada",
      });
    }
    
    return reply.status(204).send();
}

export async function listarPendentes(request, reply) {
    console.log("Controller: listarPendentes chamado");
    const { busca, concluido } = request.query;
    const resultado = await listarPendentes({ busca, concluido });
    return reply.send(resultado);
}
