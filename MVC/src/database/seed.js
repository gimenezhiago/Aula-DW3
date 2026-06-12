import pool from './pool.js'

const tarefasParaInserir = [
  { descricao: 'Comprar leite', concluido: false },
  { descricao: 'Enviar relatórios', concluido: false },
  { descricao: 'Estudar para a prova', concluido: true }
]

async function main() {
  try {
    await pool.query('SELECT 1')
    console.log('Conectado ao PostgreSQL (seed)')

    // Garante que a tabela exista
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tarefas (
        id serial PRIMARY KEY,
        descricao text NOT NULL,
        concluido boolean NOT NULL DEFAULT false,
        criada_em timestamptz NOT NULL DEFAULT now()
      )
    `)

    for (const t of tarefasParaInserir) {
      const result = await pool.query(
        'INSERT INTO tarefas (descricao, concluido) VALUES ($1, $2) RETURNING id, descricao, concluido, criada_em',
        [t.descricao, t.concluido]
      )
      console.log('Inserido:', result.rows[0])
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
