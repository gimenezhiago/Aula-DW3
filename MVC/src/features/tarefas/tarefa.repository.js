// @file: src/features/tarefas/tarefa.repository.js

import pool from '../../database/pool.js'

function rowToTarefa(row) {
  return {
    id: row.id,
    descricao: row.descricao,
    titulo: row.descricao,
    concluido: row.concluido,
    status: row.concluido ? 'concluida' : 'pendente'
  }
}

export class TarefaRepository {
  constructor() {}

  async listarTodos() {
    console.log('Repository: listarTodos chamado (DB)')
    const res = await pool.query('SELECT id, descricao, concluido FROM tarefas ORDER BY id')
    return res.rows.map(rowToTarefa)
  }

  async buscarPorId(id) {
    console.log('Repository: buscarPorId chamado (DB)')
    const res = await pool.query('SELECT id, descricao, concluido FROM tarefas WHERE id = $1', [id])
    if (res.rowCount === 0) return null
    return rowToTarefa(res.rows[0])
  }

  async salvar(tarefa) {
    console.log('Repository: salvar chamado (DB)')
    const descricao = tarefa.titulo ?? tarefa.descricao
    const concluido = tarefa.concluido ?? (tarefa.status === 'concluida')
    const res = await pool.query(
      'INSERT INTO tarefas (descricao, concluido) VALUES ($1, $2) RETURNING id, descricao, concluido',
      [descricao, concluido]
    )
    return rowToTarefa(res.rows[0])
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
