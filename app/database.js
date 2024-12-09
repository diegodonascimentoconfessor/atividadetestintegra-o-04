class Database {
    /**
     * O construtor é chamado quando uma instância da classe `Database` é criada.
     * Ele inicializa os arrays de clientes e relatórios de defeitos.
     */
    constructor() {
      this.clients = []; // Lista de clientes.
      this.defectReports = []; // Lista de relatórios de defeitos.
  
      // Adiciona alguns clientes iniciais para exemplo.
      this.clients = [
        { id: 1, name: 'Pedro', phone: '123456789', brand: 'Samsung', model: 'Galaxy S21' },
        { id: 2, name: 'Daniel', phone: '987654321', brand: 'Apple', model: 'iPhone 13' },
        { id: 3, name: 'Joaquim', phone: '456789123', brand: 'Xiaomi', model: 'Redmi Note 10' }
      ];
  
      // Cria relatórios de defeitos iniciais para os clientes cadastrados.
      this.createInitialReports();
    }
  
    /**
    
     */
    addClient(client) {
      this.clients.push(client); // Adiciona o cliente ao final do array.
    }
  
    /**
   
    
     */
    addDefectReport(report) {
      this.defectReports.push(report); // Adiciona o relatório ao final do array.
    }
  
    /**
     
     */
    deleteClient(clientId) {
      // Filtra os clientes e mantém apenas aqueles com IDs diferentes do informado.
      this.clients = this.clients.filter(client => client.id !== clientId);
  
      // Filtra os relatórios e mantém apenas aqueles não relacionados ao cliente excluído.
      this.defectReports = this.defectReports.filter(report => report.clientId !== clientId);
    }
  
    /**
    
     */
    deleteDefectReport(reportId) {
      // Filtra os relatórios e mantém apenas aqueles com IDs diferentes do informado.
      this.defectReports = this.defectReports.filter(report => report.id !== reportId);
    }
  
    getClients() {
      return this.clients || []; // Retorna a lista de clientes ou um array vazio se não houver nenhum.
    }
  
  
    getDefectReports() {
      return this.defectReports || []; // Retorna a lista de relatórios ou um array vazio se não houver nenhum.
    }
  
    /**
     * Cria relatórios de defeitos iniciais para cada cliente na lista.
     */
    createInitialReports() {
      this.clients.forEach(client => {
        // Cria um relatório para o cliente.
        const report = {
          id: this.defectReports.length + 1, // ID único baseado no tamanho atual do array de relatórios.
          clientId: client.id, // ID do cliente relacionado ao relatório.
          description: `Relatório inicial para ${client.name}`, // Descrição personalizada.
          details: `Defeito no dispositivo ${client.brand} ${client.model}.` // Detalhes sobre o dispositivo.
        };
        this.addDefectReport(report); // Adiciona o relatório à lista.
      });
    }
  }
  
  // Exporta a classe para que possa ser usada em outros arquivos.
  export default Database;
  