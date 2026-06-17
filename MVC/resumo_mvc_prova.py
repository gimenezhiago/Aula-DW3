from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable, ListItem, PageBreak
from reportlab.lib import colors

conteudo = [
    Paragraph('Resumo de estudo para prova — MVC, SQL e relacionamentos', style=getSampleStyleSheet()['Title']),
    Spacer(1, 0.7*cm),
    Paragraph('Este material resume os conceitos mais importantes sobre o projeto MVC, banco relacional, JOIN e tipos de relacionamento.', style=getSampleStyleSheet()['Heading2']),
    Spacer(1, 0.5*cm),
    Paragraph('Explicação do fluxo: Cliente → Controller → Service → Repository → Banco → Resposta', style=ParagraphStyle(
        'subtitulo',
        parent=getSampleStyleSheet()['Heading3'],
        textColor=colors.HexColor('#0B5FFF')
    )),
    Spacer(1, 0.3*cm),
]

styles = getSampleStyleSheet()
sty = styles['BodyText']
sty.leading = 16

h2 = ParagraphStyle(
    'h2',
    parent=styles['Heading2'],
    spaceAfter=8,
    textColor=colors.HexColor('#0B5FFF')
)

h3 = ParagraphStyle(
    'h3',
    parent=styles['Heading3'],
    spaceAfter=6,
    textColor=colors.HexColor('#1F2D3D')
)

# Secções
sections = [
    ('1. O que é MVC', 'MVC é uma forma de organizar o código em camadas para deixar a aplicação mais clara e fácil de manter. A ideia é separar responsabilidades: dados, regra, controle da requisição e resposta.'),
    ('2. Cliente', 'O cliente é quem faz a requisição. Pode ser um navegador, um frontend, um app ou o Postman. Ele envia uma chamada para a API.'),
    ('3. Controller', 'O Controller recebe a requisição, pega os dados da URL, do body e dos parâmetros, e decide qual parte da aplicação deve ser chamada.'),
    ('4. Service', 'O Service aplica as regras de negócio. Ele valida dados, impede erros de regra e decide se a operação pode continuar.'),
    ('5. Repository', 'O Repository é o responsável por acessar o banco. Ele executa SQL para buscar, salvar, atualizar ou deletar dados.'),
    ('6. Banco', 'O banco guarda os dados de forma organizada em tabelas. No projeto, usamos PostgreSQL.'),
    ('7. Resposta', 'Depois do banco retornar o resultado, a aplicação monta a resposta e envia de volta ao cliente em JSON.'),
    ('8. Fluxo completo', 'Cliente → Controller → Service → Repository → Banco → Resposta. Esse é o caminho principal da aplicação.'),
    ('9. Tecnologias do projeto', 'Node.js, Fastify, PostgreSQL, pg, SQL e JSON.'),
    ('10. Banco relacional', 'Os dados ficam em tabelas com colunas e linhas.'),
    ('11. Chave primária', 'Identifica cada linha da tabela e evita duplicação.'),
    ('12. Chave estrangeira', 'Liga uma tabela à outra e garante integridade.'),
    ('13. Relacionamento 1:1', 'Um para um, com FK + UNIQUE.'),
    ('14. Relacionamento 1:N', 'Um lado pode ter vários do outro; a FK fica no lado muitos.'),
    ('15. Relacionamento N:N', 'Vários de um lado e vários do outro; precisa de tabela associativa.'),
    ('16. Tabela associativa', 'Exemplo: tarefas_tags.'),
    ('17. JOIN', 'Serve para combinar dados de várias tabelas.'),
    ('18. INNER JOIN', 'Mostra apenas registros com correspondência nos dois lados.'),
    ('19. LEFT JOIN', 'Mantém tudo da esquerda, mesmo sem correspondência.'),
    ('20. WHERE', 'Filtra linhas.'),
    ('21. ORDER BY', 'Ordena os resultados.'),
    ('22. GROUP BY e HAVING', 'Agrupam e filtram agregações.'),
    ('23. NULL', 'Representa ausência de valor, não é zero nem string vazia.'),
    ('24. O que estudar para prova', 'Conceitos de banco, relacionamentos, JOIN, MVC, fluxo da API e papel de cada camada.'),
]

for title, text in sections:
    conteudo.append(Paragraph(title, h2))
    conteudo.append(Paragraph(text, sty))
    conteudo.append(Spacer(1, 0.3*cm))

conteudo.append(Paragraph('Exemplos importantes', h2))

exemplos = [
    '1. Cliente envia uma requisição para a API.',
    '2. Controller recebe a requisição e chama o Service.',
    '3. Service valida regras e chama o Repository.',
    '4. Repository executa SQL no banco de dados.',
    '5. Banco retorna os dados e a API responde ao cliente.',
    '6. Projeto → Tarefas (1:N).',
    '7. Projeto ↔ Detalhes do projeto (1:1).',
    '8. Tarefa ↔ Tags (N:N), usando tarefas_tags.',
    '9. SELECT com JOIN para trazer nome do projeto junto da tarefa.',
    '10. LEFT JOIN para manter projetos mesmo sem detalhe cadastrado.'
]

conteudo.append(ListFlowable([
    ListItem(Paragraph(item, sty), bulletColor=colors.HexColor('#0B5FFF'))
    for item in exemplos
]))

conteudo.append(PageBreak())
conteudo.append(Paragraph('Resumo rápido para decorar', h2))
conteudo.append(Paragraph('• PK identifica cada linha.', sty))
conteudo.append(Paragraph('• FK liga tabelas.', sty))
conteudo.append(Paragraph('• 1:1 = um para um com UNIQUE.', sty))
conteudo.append(Paragraph('• 1:N = um para vários.', sty))
conteudo.append(Paragraph('• N:N = precisa de tabela associativa.', sty))
conteudo.append(Paragraph('• INNER JOIN = apenas correspondências.', sty))
conteudo.append(Paragraph('• LEFT JOIN = mantém tudo da esquerda.', sty))
conteudo.append(Paragraph('• Controller recebe, Service valida, Repository consulta.', sty))

# Gera o PDF
caminho = 'E:/Área de Trabalho/Repositórios/Aula-DW3/MVC/resumo_mvc_prova.pdf'
doc = SimpleDocTemplate(caminho, pagesize=A4)
doc.build(conteudo)

print('PDF gerado com sucesso em:', caminho)
