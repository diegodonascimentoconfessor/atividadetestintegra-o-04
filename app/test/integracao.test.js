import Database from '../database'; // Importa a classe Database do arquivo correspondente.

describe('Database', () => {
  let db; // Variável que armazenará a instância do banco de dados.

  // Antes de cada teste, cria uma nova instância do banco de dados e inicializa com dados de teste.
  beforeEach(() => {
    db = new Database();
    
    // Adiciona um cliente fictício e um relatório de defeito inicial para garantir que a lista não esteja vazia.
    const defaultClient = { id: 1, name: 'Cliente 1', phone: '111111111', brand: 'Marca', model: 'Modelo' };
    db.addClient(defaultClient);
    
    const defaultReport = { id: 1, clientId: 1, description: 'Defeito na tela', details: 'Relatório de defeito na tela do dispositivo.' };
    db.addDefectReport(defaultReport);
  });

  // Testa se o banco de dados inicializa com uma lista de clientes.
  it('deve inicializar com uma lista de clientes', () => {
    expect(db.getClients().length).toBeGreaterThan(0); // Verifica se há pelo menos um cliente.
  });

  // Testa se é possível adicionar um novo cliente.
  it('deve permitir adicionar um novo cliente', () => {
    const newClient = { id: 7, name: 'Novo Cliente', phone: '111111111', brand: 'Marca', model: 'Modelo' }; // Novo cliente.
    db.addClient(newClient); // Adiciona o cliente ao banco de dados.
    expect(db.getClients()).toContainEqual(newClient); // Verifica se o cliente foi adicionado.
  });

  // Testa se os relatórios de defeitos iniciais são criados para cada cliente.
  it('deve criar relatórios de defeitos iniciais para cada cliente', () => {
    const reports = db.getDefectReports(); // Obtém a lista de relatórios.
    expect(reports.length).toBe(db.getClients().length); // Verifica se o número de relatórios é igual ao número de clientes.
  });

  // Testa se é possível adicionar relatórios de defeito manualmente.
  it('deve adicionar relatórios de defeito manualmente', () => {
    const newReport = { id: 2, clientId: 1, description: 'Defeito na tela', details: 'Relatório de defeito adicional.' }; // Novo relatório.
    db.addDefectReport(newReport); // Adiciona o relatório ao banco de dados.
    expect(db.getDefectReports()).toContainEqual(newReport); // Verifica se o relatório foi adicionado.
  });

  // Testa se é possível excluir um cliente e seus relatórios associados.
  it('deve excluir um cliente existente e seus relatórios associados', () => {
    const initialClientsCount = db.getClients().length; // Conta o número inicial de clientes.
    const clientId = db.getClients()[0].id; // Obtém o ID do primeiro cliente.

    db.deleteClient(clientId); // Exclui o cliente.

    // Verifica se o cliente foi removido.
    expect(db.getClients().length).toBe(initialClientsCount - 1); // O número de clientes deve diminuir em 1.
    expect(db.getClients().find(client => client.id === clientId)).toBeUndefined(); // O cliente não deve mais existir.

    // Verifica se os relatórios associados ao cliente foram removidos.
    expect(db.getDefectReports().some(report => report.clientId === clientId)).toBe(false);
  });

  // Testa se é possível excluir um relatório de defeito.
  it('deve excluir um relatório de defeito existente', () => {
    const initialReportsCount = db.getDefectReports().length; // Conta o número inicial de relatórios.
    const reportId = db.getDefectReports()[0].id; // Obtém o ID do primeiro relatório.

    db.deleteDefectReport(reportId); // Exclui o relatório.

    // Verifica se o relatório foi removido.
    expect(db.getDefectReports().length).toBe(initialReportsCount - 1); // O número de relatórios deve diminuir em 1.
    expect(db.getDefectReports().find(report => report.id === reportId)).toBeUndefined(); // O relatório não deve mais existir.
  });

});
