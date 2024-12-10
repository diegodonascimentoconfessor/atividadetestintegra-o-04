// A classe 'Database' é uma estrutura que irá armazenar clientes e relatórios de defeitos.
class Database {
  // O construtor é um método que é chamado automaticamente quando criamos uma nova instância da classe.
  constructor() {
    // Inicializa a lista de clientes e a lista de relatórios de defeitos como listas vazias.
    this.clients = [];
    this.defectReports = [];
    // Chama o método para criar relatórios iniciais para cada cliente. Esse método é definido mais abaixo.
    this.createInitialReports();
  }

  // O método 'addClient' permite adicionar um novo cliente à lista de clientes.
  addClient(client) {
    // Adiciona o cliente à lista 'clients'.
    this.clients.push(client);
  }

  // O método 'addDefectReport' permite adicionar um novo relatório de defeito à lista de relatórios.
  addDefectReport(report) {
    // Adiciona o relatório à lista 'defectReports'.
    this.defectReports.push(report);
  }

  // O método 'deleteClient' é usado para remover um cliente da lista, usando o ID do cliente.
  deleteClient(clientId) {
    // Filtra a lista de clientes para remover o cliente que tem o ID fornecido (se ele existir).
    this.clients = this.clients.filter(client => client.id !== clientId);
    // Filtra a lista de relatórios de defeito para remover os relatórios associados a esse cliente.
    this.defectReports = this.defectReports.filter(report => report.clientId !== clientId);
  }

  // O método 'deleteDefectReport' remove um relatório de defeito específico, usando o ID do relatório.
  deleteDefectReport(reportId) {
    // Filtra a lista de relatórios de defeito para remover o relatório que tem o ID fornecido (se ele existir).
    this.defectReports = this.defectReports.filter(report => report.id !== reportId);
  }

  // O método 'getClients' retorna a lista de clientes. Se a lista estiver vazia ou não existir, retorna uma lista vazia.
  getClients() {
    return this.clients || [];
  }

  // O método 'getDefectReports' retorna a lista de relatórios de defeitos. Se a lista estiver vazia ou não existir, retorna uma lista vazia.
  getDefectReports() {
    return this.defectReports || [];
  }

  // O método 'createInitialReports' cria relatórios de defeito iniciais para todos os clientes que já estão cadastrados.
  createInitialReports() {
    // Para cada cliente na lista de clientes:
    this.clients.forEach(client => {
      // Cria um novo relatório de defeito com informações sobre o cliente (nome, marca e modelo do dispositivo).
      const report = {
        id: this.defectReports.length + 1, // Gera um ID único para o relatório.
        clientId: client.id, // Relaciona o relatório ao cliente através do ID do cliente.
        description: `Relatório inicial para ${client.name}`, // Descrição do defeito.
        details: `Defeito no dispositivo ${client.brand} ${client.model}.` // Detalhes do defeito.
      };
      // Adiciona o novo relatório de defeito à lista de relatórios.
      this.addDefectReport(report);
    });
  }
}

// A classe 'Database' está sendo exportada para ser usada em outros arquivos ou módulos.
export default Database;
