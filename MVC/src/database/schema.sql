CREATE TABLE IF NOT EXISTS projetos (
  id serial PRIMARY KEY,
  nome text NOT NULL,
  criado_em timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS detalhes_projeto (
  id serial PRIMARY KEY,
  projeto_id integer NOT NULL UNIQUE,
  descricao_longa text,
  observacoes text,
  prazo_final date,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id)
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

CREATE TABLE IF NOT EXISTS tags (
  id serial PRIMARY KEY,
  nome text NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS tarefas_tags (
  tarefa_id integer NOT NULL,
  tag_id integer NOT NULL,
  PRIMARY KEY (tarefa_id, tag_id),
  FOREIGN KEY (tarefa_id) REFERENCES tarefas(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);
