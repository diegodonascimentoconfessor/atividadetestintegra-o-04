class ClientService {
    // O construtor é usado para criar uma instância da classe. Aqui, ele recebe o banco de dados como argumento.
    constructor(database) {
      this.database = database; // Armazena a referência do banco de dados para que possa ser usada nos métodos.
    }
  
    /**
     * Método para criar um novo cliente.
     * Ele recebe as informações do cliente como argumentos: nome, telefone, marca e modelo.
     */
    createClient(name, phone, brand, model) {
      // Cria um objeto de cliente com um ID único, baseado no número atual de clientes no banco.
      const client = { 
        id: this.database.getClients().length + 1, // O ID é definido como o número total de clientes + 1.
        name, // Nome do cliente.
        phone, // Telefone do cliente.
        brand, // Marca do dispositivo do cliente.
        model  // Modelo do dispositivo do cliente.
      };
      
      // Adiciona o novo cliente ao banco de dados usando o método `addClient`.
      this.database.addClient(client);
  
      // Retorna o cliente recém-criado para quem chamou o método.
      return client;
    }
  
    /**
     * Método para excluir um cliente.
     * Ele verifica se o cliente existe antes de removê-lo do banco de dados.
     */
    deleteClient(clientId) {
      // Verifica se há um cliente com o ID fornecido no banco de dados.
      const clientExists = this.database.getClients().some(client => client.id === clientId);
  
      // Se o cliente não existir, lança um erro para informar que a exclusão não foi possível.
      if (!clientExists) {
        throw new Error(`Cliente com ID ${clientId} não encontrado.`); // Mensagem de erro.
      }
  
      // Remove o cliente do banco de dados usando o método `deleteClient`.
      this.database.deleteClient(clientId);
  
      // Mostra uma mensagem no console para confirmar que o cliente foi excluído.
      console.log(`Cliente com ID ${clientId} excluído.`);
    }
  
    /**
     * Método para listar todos os clientes.
     * Ele retorna uma lista de todos os clientes registrados no banco de dados.
     */
    listClients() {
      return this.database.getClients(); // Obtém e retorna todos os clientes armazenados no banco de dados.
    }
  }
  
  // Exporta a classe `ClientService` para que possa ser usada em outros arquivos.
  export default ClientService;
  