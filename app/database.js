class Database {
    constructor() {
        this.clientes = []; // Lista de clientes
        this.celulares = []; // Lista de celulares
    }

    // Adicionar cliente ao banco
    addCliente(cliente) {
        this.clientes.push(cliente);
    }

    // Retornar todos os clientes
    getClientes() {
        return this.clientes || [];
    }

    // Adicionar celular ao banco
    addCelular(celular) {
        this.celulares.push(celular);
    }

    // Retornar todos os celulares
    getCelulares() {
        return this.celulares || [];
    }
}

export default Database;
