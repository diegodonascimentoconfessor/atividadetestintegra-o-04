class ClientService {
  constructor(database) {
    this.database = database;
  }

  createClient(name, phone, brand, model) {
    const id = Date.now(); // Cria um ID único para o cliente usando o tempo atual em milissegundos
    const client = { id, name, phone, brand, model }; // Cria um objeto representando o cliente com o ID, nome, telefone, marca e modelo.
    this.database.clients.push(client); // Adiciona o novo cliente à lista de clientes no banco de dados.
    return client; // Retorna o objeto do cliente criado.
  }
  

  deleteClient(clientId) {
    const clientExists = this.database.getClients().some(client => client.id === clientId);

    if (!clientExists) {
      throw new Error(`Cliente com ID ${clientId} não encontrado.`);
    }

    this.database.deleteClient(clientId);
    console.log(`Cliente com ID ${clientId} excluído.`);
  }

  listClients() {
    return this.database.getClients();
  }
}

export default ClientService;
