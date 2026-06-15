import pool from './pool.js'

const projetosParaInserir = [
  { nome: 'Projeto API DW3' },
  { nome: 'Projeto Banco Relacional' },
  { nome: 'Projeto Integração Frontend' }
]

const tarefasParaInserir = [
  { descricao: 'Comprar leite', concluido: false, projetoId: 1 },
  { descricao: 'Enviar relatórios', concluido: false, projetoId: 2 },
  { descricao: 'Estudar para a prova', concluido: true, projetoId: 3 }
]

async function main() {
  try {
    await pool.query('SELECT 1')
    console.log('Conectado ao PostgreSQL (seed)')

    await pool.query(`
      CREATE TABLE IF NOT EXISTS projetos (
        id serial PRIMARY KEY,
        nome text NOT NULL,
        criado_em timestamptz NOT NULL DEFAULT now()
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

    for (const projeto of projetosParaInserir) {
      await pool.query('INSERT INTO projetos (nome) VALUES ($1)', [projeto.nome])
    }

    for (const t of tarefasParaInserir) {
      const result = await pool.query(
        'INSERT INTO tarefas (descricao, concluido, projeto_id) VALUES ($1, $2, $3) RETURNING id, descricao, concluido, criada_em, projeto_id',
        [t.descricao, t.concluido, t.projetoId]
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
