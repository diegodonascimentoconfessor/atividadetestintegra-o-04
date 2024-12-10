// A classe 'DefectReportService' gerencia as operações relacionadas aos relatórios de defeitos.
class DefectReportService {
  // O construtor da classe recebe duas dependências: 'database' (banco de dados) e 'clientService' (serviço de clientes).
  constructor(database, clientService) {
    this.database = database; // Armazena a instância do banco de dados (onde estão os clientes e relatórios).
    this.clientService = clientService; // Armazena a instância do serviço de clientes (não está sendo usada diretamente aqui, mas pode ser útil em outros métodos).
  }

  // O método 'createDefectReport' cria um novo relatório de defeito para um cliente.
  createDefectReport(clientId, description) {
    // Procura o cliente pelo ID na lista de clientes do banco de dados.
    const client = this.database.getClients().find(c => c.id === clientId);

    // Se o cliente não for encontrado, lança um erro informando que o cliente não existe.
    if (!client) {
      throw new Error(`Cliente com ID ${clientId} não encontrado. Relatório não criado.`);
    }

    // Cria um novo relatório de defeito com um ID único (baseado no tamanho atual da lista de relatórios), a descrição fornecida e detalhes adicionais.
    const report = {
      id: this.database.getDefectReports().length + 1, // Gera um ID único para o relatório, baseado no número de relatórios existentes.
      clientId, // Relaciona o relatório ao cliente usando o ID do cliente.
      description, // A descrição fornecida para o defeito.
      details: `Relatório para o dispositivo ${client.brand} ${client.model}.` // Detalhes adicionais sobre o dispositivo do cliente.
    };

    // Adiciona o novo relatório de defeito à lista de relatórios no banco de dados.
    this.database.addDefectReport(report);
    // Retorna o relatório criado para que possa ser usado ou exibido em outro lugar.
    return report;
  }

  // O método 'deleteDefectReport' exclui um relatório de defeito com base no ID fornecido.
  deleteDefectReport(reportId) {
    // Verifica se o relatório com o ID fornecido existe na lista de relatórios.
    const reportExists = this.database.getDefectReports().some(report => report.id === reportId);

    // Se o relatório não existir, lança um erro informando que o relatório não foi encontrado.
    if (!reportExists) {
      throw new Error(`Relatório com ID ${reportId} não encontrado.`);
    }

    // Chama o método do banco de dados para excluir o relatório com o ID fornecido.
    this.database.deleteDefectReport(reportId);
    // Exibe uma mensagem no console indicando que o relatório foi excluído com sucesso.
    console.log(`Relatório com ID ${reportId} excluído.`);
  }

  // O método 'listDefectReports' retorna todos os relatórios de defeitos existentes.
  listDefectReports() {
    // Retorna todos os relatórios de defeitos do banco de dados.
    return this.database.getDefectReports();
  }
}

// A classe 'DefectReportService' é exportada para ser utilizada em outros arquivos ou módulos.
export default DefectReportService;
