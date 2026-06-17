import pool from './pool.js'

const projetosParaInserir = [
  { nome: 'Projeto API DW3' },
  { nome: 'Projeto Banco Relacional' },
  { nome: 'Projeto Integração Frontend' }
]

const tarefasParaInserir = [
  { descricao: 'Criar endpoints do projeto', concluido: false, projetoId: 1 },
  { descricao: 'Integrar PostgreSQL', concluido: false, projetoId: 1 },
  { descricao: 'Refatorar Repository', concluido: false, projetoId: 2 },
  { descricao: 'Modelar relacionamentos N:N', concluido: false, projetoId: 2 },
  { descricao: 'Ajustar resposta da API', concluido: true, projetoId: 3 }
]

const detalhesParaInserir = [
  {
    projetoId: 1,
    descricaoLonga: 'Projeto focado na evolução da API de tarefas',
    observacoes: 'Organizar endpoints e persistência',
    prazoFinal: '2026-07-10'
  },
  {
    projetoId: 2,
    descricaoLonga: 'Modelagem relacional para o backend',
    observacoes: 'Explorar 1:N, 1:1 e N:N',
    prazoFinal: '2026-07-20'
  }
]

const tagsParaInserir = [
  { nome: 'backend' },
  { nome: 'postgres' },
  { nome: 'api' },
  { nome: 'arquitetura' },
  { nome: 'urgente' }
]

const tarefasTagsParaInserir = [
  { tarefaId: 1, tagId: 1 },
  { tarefaId: 1, tagId: 2 },
  { tarefaId: 1, tagId: 3 },
  { tarefaId: 2, tagId: 1 },
  { tarefaId: 2, tagId: 4 },
  { tarefaId: 4, tagId: 5 }
]

async function main() {
  try {
    await pool.query('SELECT 1')
    console.log('Conectado ao PostgreSQL (seed)')

    await pool.query('TRUNCATE TABLE tarefas_tags, detalhes_projeto, tags, tarefas, projetos RESTART IDENTITY CASCADE')

    await pool.query(`
      CREATE TABLE IF NOT EXISTS projetos (
        id serial PRIMARY KEY,
        nome text NOT NULL,
        criado_em timestamptz NOT NULL DEFAULT now()
      )
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS detalhes_projeto (
        id serial PRIMARY KEY,
        projeto_id integer NOT NULL UNIQUE,
        descricao_longa text,
        observacoes text,
        prazo_final date,
        FOREIGN KEY (projeto_id) REFERENCES projetos(id)
      )
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tarefas (
        id serial PRIMARY KEY,
        descricao text NOT NULL,
        concluido boolean NOT NULL DEFAULT false,
        criada_em timestamptz NOT NULL DEFAULT now(),
        projeto_id integer
      )
    `)

    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_constraint
          WHERE conname = 'tarefas_projeto_id_fkey'
        ) THEN
          ALTER TABLE tarefas
          ADD CONSTRAINT tarefas_projeto_id_fkey
          FOREIGN KEY (projeto_id)
          REFERENCES projetos(id);
        END IF;
      END $$;
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tags (
        id serial PRIMARY KEY,
        nome text NOT NULL UNIQUE
      )
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tarefas_tags (
        tarefa_id integer NOT NULL,
        tag_id integer NOT NULL,
        PRIMARY KEY (tarefa_id, tag_id),
        FOREIGN KEY (tarefa_id) REFERENCES tarefas(id),
        FOREIGN KEY (tag_id) REFERENCES tags(id)
      )
    `)

    for (const projeto of projetosParaInserir) {
      const result = await pool.query(
        'INSERT INTO projetos (nome) VALUES ($1) RETURNING id, nome',
        [projeto.nome]
      )
      console.log('Projeto inserido:', result.rows[0])
    }

    for (const tarefa of tarefasParaInserir) {
      const result = await pool.query(
        'INSERT INTO tarefas (descricao, concluido, projeto_id) VALUES ($1, $2, $3) RETURNING id, descricao, concluido, projeto_id',
        [tarefa.descricao, tarefa.concluido, tarefa.projetoId]
      )
      console.log('Tarefa inserida:', result.rows[0])
    }

    for (const detalhe of detalhesParaInserir) {
      const result = await pool.query(
        'INSERT INTO detalhes_projeto (projeto_id, descricao_longa, observacoes, prazo_final) VALUES ($1, $2, $3, $4) RETURNING id, projeto_id',
        [detalhe.projetoId, detalhe.descricaoLonga, detalhe.observacoes, detalhe.prazoFinal]
      )
      console.log('Detalhe inserido:', result.rows[0])
    }

    for (const tag of tagsParaInserir) {
      const result = await pool.query(
        'INSERT INTO tags (nome) VALUES ($1) ON CONFLICT (nome) DO NOTHING RETURNING id, nome',
        [tag.nome]
      )
      console.log('Tag inserida:', result.rows[0])
    }

    for (const relacao of tarefasTagsParaInserir) {
      const result = await pool.query(
        'INSERT INTO tarefas_tags (tarefa_id, tag_id) VALUES ($1, $2) ON CONFLICT (tarefa_id, tag_id) DO NOTHING RETURNING tarefa_id, tag_id',
        [relacao.tarefaId, relacao.tagId]
      )
      console.log('Associação inserida:', result.rows[0])
    }

    console.log('Seed finalizado com sucesso')
  } catch (err) {
    console.error('Erro no seed:', err)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

main()
