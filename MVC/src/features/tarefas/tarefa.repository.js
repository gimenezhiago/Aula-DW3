// @file: src/features/tarefas/tarefa.repository.js

import pool from '../../database/pool.js'

function rowToTarefa(row) {
  return {
    id: row.id,
    descricao: row.descricao,
    titulo: row.descricao,
    concluido: row.concluido,
    status: row.concluido ? 'concluida' : 'pendente',
    projetoId: row.projeto_id ?? row.projetoId ?? null,
    projetoNome: row.projeto_nome ?? row.projetoNome ?? null,
    tags: Array.isArray(row.tags) ? row.tags : []
  }
}

export class TarefaRepository {
  constructor() {}

  async listarTodos() {
    console.log('Repository: listarTodos chamado (DB)')
    const res = await pool.query(`
      SELECT
        t.id,
        t.descricao,
        t.concluido,
        t.criada_em,
        t.projeto_id,
        p.nome AS projeto_nome
      FROM tarefas t
      LEFT JOIN projetos p ON p.id = t.projeto_id
      ORDER BY t.id
    `)
    return res.rows.map(rowToTarefa)
  }

  async buscarPorId(id) {
    console.log('Repository: buscarPorId chamado (DB)')
    const res = await pool.query(`
      SELECT
        t.id,
        t.descricao,
        t.concluido,
        t.criada_em,
        t.projeto_id,
        p.nome AS projeto_nome,
        tg.id AS tag_id,
        tg.nome AS tag_nome
      FROM tarefas t
      LEFT JOIN projetos p ON p.id = t.projeto_id
      LEFT JOIN tarefas_tags tt ON tt.tarefa_id = t.id
      LEFT JOIN tags tg ON tg.id = tt.tag_id
      WHERE t.id = $1
    `, [id])
    if (res.rowCount === 0) return null

    const tarefa = rowToTarefa(res.rows[0])
    tarefa.tags = res.rows
      .filter(row => row.tag_id !== null)
      .map(row => ({ id: row.tag_id, nome: row.tag_nome }))

    return tarefa
  }

  async buscarPorProjeto(projetoId) {
    console.log('Repository: buscarPorProjeto chamado (DB)')
    const res = await pool.query(`
      SELECT
        t.id,
        t.descricao,
        t.concluido,
        t.criada_em,
        t.projeto_id,
        p.nome AS projeto_nome
      FROM tarefas t
      INNER JOIN projetos p ON p.id = t.projeto_id
      WHERE p.id = $1
      ORDER BY t.id
    `, [projetoId])
    return res.rows.map(rowToTarefa)
  }

  async salvar(tarefa) {
    console.log('Repository: salvar chamado (DB)')
    const descricao = tarefa.titulo ?? tarefa.descricao
    const concluido = tarefa.concluido ?? (tarefa.status === 'concluida')
    const projetoId = tarefa.projetoId ?? tarefa.projeto_id ?? null
    const res = await pool.query(
      'INSERT INTO tarefas (descricao, concluido, projeto_id) VALUES ($1, $2, $3) RETURNING id',
      [descricao, concluido, projetoId]
    )

    return this.buscarPorId(res.rows[0].id)
  }

  async atualizar(id, dadosAtualizados) {
    console.log('Repository: atualizar chamado (DB)')
    const sets = []
    const values = []

    if (dadosAtualizados.titulo !== undefined) {
      values.push(dadosAtualizados.titulo)
      sets.push(`descricao = $${values.length}`)
    }

    if (dadosAtualizados.descricao !== undefined) {
      values.push(dadosAtualizados.descricao)
      sets.push(`descricao = $${values.length}`)
    }

    if (dadosAtualizados.status !== undefined) {
      values.push(dadosAtualizados.status === 'concluida')
      sets.push(`concluido = $${values.length}`)
    }

    if (dadosAtualizados.concluido !== undefined) {
      values.push(dadosAtualizados.concluido === true || dadosAtualizados.concluido === 'true')
      sets.push(`concluido = $${values.length}`)
    }

    if (sets.length === 0) {
      return this.buscarPorId(id)
    }

    values.push(id)
    const sql = `UPDATE tarefas SET ${sets.join(', ')} WHERE id = $${values.length} RETURNING id, descricao, concluido`
    const res = await pool.query(sql, values)
    if (res.rowCount === 0) return null
    return rowToTarefa(res.rows[0])
  }

  async remover(id) {
    console.log('Repository: remover chamado (DB)')
    const res = await pool.query('DELETE FROM tarefas WHERE id = $1', [id])
    return res.rowCount > 0
  }
}
