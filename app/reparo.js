class DefectReportService {

  constructor(database, clientService) {
    this.database = database; // Armazena a referência ao banco de dados.
    this.clientService = clientService; // Armazena o serviço de clientes.
  }


  createDefectReport(clientId, description) {
    // Busca o cliente pelo ID no banco de dados.
    const client = this.database.getClients().find(c => c.id === clientId);

    // Verifica se o cliente existe.
    if (!client) {
      // Lança um erro se o cliente não for encontrado.
      throw new Error(`Cliente com ID ${clientId} não encontrado. Relatório não criado.`);
    }

    // Cria o objeto do relatório de defeito.
    const report = {
      id: this.database.getDefectReports().length + 1, // Gera um ID único baseado no número de relatórios existentes.
      clientId, // Associa o ID do cliente ao relatório.
      description, // Adiciona a descrição do defeito.
      details: `Relatório para o dispositivo ${client.brand} ${client.model}.` // Detalhes sobre o dispositivo do cliente.
    };

    // Adiciona o relatório ao banco de dados.
    this.database.addDefectReport(report);

    // Retorna o relatório criado.
    return report;
  }

  /**
   o relatório a ser excluído.
   */
  deleteDefectReport(reportId) {
    // Verifica se o relatório existe no banco de dados.
    const reportExists = this.database.getDefectReports().some(report => report.id === reportId);

    // Se o relatório não existir, lança um erro.
    if (!reportExists) {
      throw new Error(`Relatório com ID ${reportId} não encontrado.`);
    }

    // Remove o relatório do banco de dados.
    this.database.deleteDefectReport(reportId);

    // Exibe uma mensagem no console confirmando a exclusão.
    console.log(`Relatório com ID ${reportId} excluído.`);
  }


  listDefectReports() {
    // Retorna todos os relatórios armazenados no banco de dados.
    return this.database.getDefectReports();
  }
}

// Exporta a classe para que possa ser usada em outros arquivos.
export default DefectReportService;
