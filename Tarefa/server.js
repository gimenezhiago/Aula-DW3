const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

fastify.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
});

const tarefas = [
  { id: 1, descricao: 'Fazer a tarefa de dw', concluido: false },
  { id: 2, descricao: 'Estudar Fastify', concluido: true },
  { id: 3, descricao: 'Tarefa de português', concluido: false },
];

fastify.get('/tarefas', async (request, reply) => {
  const { busca, concluido } = request.query;

  let resultado = tarefas;

  if (busca?.trim()) {
    const termo = busca.toLowerCase();
    resultado = resultado.filter(t =>t.descricao.toLowerCase().includes(termo));
  }

  if (concluido !== undefined) {
    const filtroConcluido = String(concluido).toLowerCase() === 'true';
    resultado = resultado.filter(t =>
      t.concluido === filtroConcluido
    );
  }

  return resultado;
});




fastify.get('/tarefas/resumo', async (request, reply) => {
  const total = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluido).length;
  const pendentes = total - concluidas;

  return reply.send({ total, concluidas, pendentes });
});

fastify.post('/tarefas', async (request, reply) => {
  const { descricao } = request.body || {};

  if (!descricao || !descricao.trim()) {
    return reply
      .status(400)
      .send({ error: 'Descrição é obrigatória' });
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    descricao: descricao.trim(),
    concluido: false,
  };

  tarefas.push(novaTarefa);

  return reply.status(201).send(novaTarefa);
});





fastify.patch('/tarefas/:id/concluir', async (request, reply) => {
  const id = Number(request.params.id);

  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) {
    return reply.status(404).send({ error: 'Tarefa não encontrada' });
  }

  tarefas[index].concluido = !tarefas[index].concluido;
  return reply.send(tarefas[index]);
});




fastify.delete('/tarefas/:id', async (request, reply) => {
  const id = Number(request.params.id);
  const index = tarefas.findIndex(t => t.id === id);

  if (index === -1) {
    return reply.status(404).send({ error: 'Tarefa não encontrada' });
  }

  tarefas.splice(index, 1);
  return reply.status(204).send();
});




const start = async () => {
  try {
    await fastify.listen({ port: 3000});
    console.log('Servidor rodando em http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();