-- Cria a tabela de tarefas usada no roteiro de PostgreSQL
CREATE TABLE IF NOT EXISTS tarefas (
  id serial PRIMARY KEY,
  descricao text NOT NULL,
  concluido boolean NOT NULL DEFAULT false,
  criada_em timestamptz NOT NULL DEFAULT now()
);
