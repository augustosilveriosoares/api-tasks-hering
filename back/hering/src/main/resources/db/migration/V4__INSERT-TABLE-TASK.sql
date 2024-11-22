-- Inserindo tarefas fictícias
INSERT INTO task (id, title, date, description, completed)
VALUES
    (UUID(), 'Comprar leite', '2024-11-21', 'Ir ao supermercado para comprar leite.', false),
    (UUID(), 'Reunião de equipe', '2024-11-22', 'Reunião para discutir os projetos do mês.', true),
    (UUID(), 'Enviar relatórios financeiros', '2024-11-23', 'Finalizar e enviar os relatórios financeiros para o diretor.', false),
    (UUID(), 'Revisar código', '2024-11-24', 'Revisar o código do sistema de integração de dados.', true),
    (UUID(), 'Agendar consulta médica', '2024-11-25', 'Ligar para a clínica e agendar uma consulta médica.', false),
    (UUID(), 'Preparar apresentação', '2024-11-26', 'Criar a apresentação para a reunião de amanhã.', true),
    (UUID(), 'Atualizar sistema de segurança', '2024-11-27', 'Atualizar o sistema de segurança da rede corporativa.', false),
    (UUID(), 'Participar de workshop', '2024-11-28', 'Participar de um workshop sobre desenvolvimento ágil.', true),
    (UUID(), 'Revisar contrato', '2024-11-29', 'Revisar o contrato de fornecimento de novos equipamentos.', false),
    (UUID(), 'Fazer backup dos dados', '2024-11-30', 'Realizar backup completo do banco de dados.', true),
    (UUID(), 'Comprar equipamentos', '2024-12-01', 'Comprar novos equipamentos para o escritório.', false),
    (UUID(), 'Escrever artigo', '2024-12-02', 'Escrever um artigo sobre novas tendências tecnológicas.', true),
    (UUID(), 'Organizar evento', '2024-12-03', 'Organizar o evento anual de confraternização.', false),
    (UUID(), 'Revisar orçamento', '2024-12-04', 'Revisar e ajustar o orçamento anual da empresa.', true),
    (UUID(), 'Ligar para cliente', '2024-12-05', 'Ligar para o cliente para verificar o andamento do projeto.', false);
