CREATE TABLE IF NOT EXISTS projetos (
  id serial PRIMARY KEY,
  nome text NOT NULL,
  criado_em timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tarefas (
  id serial PRIMARY KEY,
  descricao text NOT NULL,
  concluido boolean NOT NULL DEFAULT false,
  criada_em timestamptz NOT NULL DEFAULT now(),
  projeto_id integer
);

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
