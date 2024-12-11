class ClientService { 
  // Define a classe `ClientService`, que será responsável por gerenciar operações relacionadas a clientes.
  constructor(database) { 
    // O construtor é chamado quando uma instância de `ClientService` é criada.
    this.database = database; 
    // A propriedade `database` da instância recebe o valor do banco de dados fornecido.
  }

  createClient(name, phone, brand, model) { 
    // Método para criar um novo cliente. Recebe o nome, telefone, marca e modelo como parâmetros.
    const id = Date.now(); 
    // Cria um ID único para o cliente usando o timestamp atual (número de milissegundos desde 1 de janeiro de 1970).
    const client = { id, name, phone, brand, model }; 
    // Cria um objeto representando o cliente com o ID, nome, telefone, marca e modelo fornecidos.
    this.database.clients.push(client); 
    // Adiciona o objeto do cliente à lista de clientes no banco de dados.
    return client; 
    // Retorna o objeto do cliente criado, para que possa ser usado pelo código que chamou este método.
  }

  deleteClient(clientId) { 
    // Método para excluir um cliente com base no ID fornecido.
    const clientExists = this.database.getClients().some(client => client.id === clientId); 
    // Verifica se existe um cliente com o ID fornecido na lista de clientes do banco de dados.
    if (!clientExists) { 
      // Se nenhum cliente com o ID fornecido for encontrado:
      throw new Error(`Cliente com ID ${clientId} não encontrado.`); 
      // Lança um erro com a mensagem especificando que o cliente não foi encontrado.
    }

    this.database.deleteClient(clientId); 
    // Se o cliente existe, chama o método `deleteClient` do banco de dados para excluí-lo.
    console.log(`Cliente com ID ${clientId} excluído.`); 
    // Exibe uma mensagem no console confirmando que o cliente foi excluído.
  }

  listClients() { 
    // Método para listar todos os clientes.
    return this.database.getClients(); 
    // Retorna a lista de clientes obtida do banco de dados chamando o método `getClients`.
  }
}

export default ClientService; 
// Exporta a classe `ClientService`, permitindo que seja usada em outros arquivos.
