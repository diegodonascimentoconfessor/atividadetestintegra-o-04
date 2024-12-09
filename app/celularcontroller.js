import Celular from './celular';

class Cliente {
    constructor(database) {
        this.database = database; // Referência ao banco de dados
    }

    // Criar um novo cliente
    createCliente(nome) {
        const cliente = {
            id: this.database.getClientes().length + 1, // Gera ID único
            nome,
        };

        this.database.addCliente(cliente); // Adiciona cliente ao banco
        return cliente; // Retorna o cliente criado
    }

    // Listar todos os clientes
    listClientes() {
        return this.database.getClientes(); // Retorna todos os clientes
    }

    // Criar celular e associar a um cliente
    createCelular(clienteId, modelo, marca, preco) {
        // Verifica se o cliente existe
        const cliente = this.database.getClientes().find(c => c.id === clienteId);
        if (!cliente) {
            throw new Error(`Cliente com ID ${clienteId} não encontrado.`);
        }

        // Cria um novo celular associado ao cliente
        const celular = new Celular(
            this.database.getCelulares().length + 1, // Gera ID único
            modelo,
            marca,
            preco,
            clienteId
        );

        this.database.addCelular(celular); // Adiciona celular ao banco
        return celular; // Retorna o celular criado
    }

    // Listar todos os celulares de um cliente específico
    listCelularesByCliente(clienteId) {
        // Verifica se o cliente existe
        const cliente = this.database.getClientes().find(c => c.id === clienteId);
        if (!cliente) {
            throw new Error(`Cliente com ID ${clienteId} não encontrado.`);
        }

        // Retorna os celulares associados ao cliente
        return this.database.getCelulares().filter(celular => celular.clienteId === clienteId);
    }
}

export default Cliente;
