import Database from '../database';
import Cliente from './cliente';

describe('Teste de Cliente', () => {
    let database;
    let clienteService;

    beforeEach(() => {
        database = new Database();
        clienteService = new Cliente(database);
    });

    test('Deve criar um novo cliente', () => {
        const cliente = clienteService.createCliente('João');
        expect(cliente).toEqual({ id: 1, nome: 'João' });
        expect(database.getClientes()).toContainEqual(cliente);
    });

    test('Deve listar todos os clientes', () => {
        clienteService.createCliente('Maria');
        clienteService.createCliente('Carlos');
        const clientes = clienteService.listClientes();
        expect(clientes).toHaveLength(2);
    });

    test('Deve criar um celular associado a um cliente', () => {
        const cliente = clienteService.createCliente('Ana');
        const celular = clienteService.createCelular(cliente.id, 'iPhone 13', 'Apple', 8000);
        expect(celular).toEqual({
            id: 1,
            modelo: 'iPhone 13',
            marca: 'Apple',
            preco: 8000,
            clienteId: cliente.id,
        });
    });

    test('Deve lançar erro ao tentar criar um celular para cliente inexistente', () => {
        expect(() =>
            clienteService.createCelular(999, 'Galaxy S21', 'Samsung', 4000)
        ).toThrow('Cliente com ID 999 não encontrado.');
    });

    test('Deve listar celulares associados a um cliente', () => {
        const cliente = clienteService.createCliente('Lucas');
        clienteService.createCelular(cliente.id, 'Galaxy S21', 'Samsung', 3500);
        clienteService.createCelular(cliente.id, 'Pixel 6', 'Google', 5000);

        const celulares = clienteService.listCelularesByCliente(cliente.id);
        expect(celulares).toHaveLength(2);
    });
});
