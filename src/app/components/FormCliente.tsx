import React from 'react';
import { FormClienteProps } from '@/app/interfaces/FormClienteProps';

interface FormClienteComponentProps {
    cliente: FormClienteProps;
    setCliente: React.Dispatch<React.SetStateAction<FormClienteProps>>;
    handleAdicionarCliente: () => void;
}

const FormCliente: React.FC<FormClienteComponentProps> = ({ cliente, setCliente, handleAdicionarCliente }) => {

    const formatarTelefone = (telefone: string) => {
        return telefone
            .replace(/\D/g, '')
            .replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    };

    const formatarCep = (cep: string) => {
        return cep.replace(/\D/g, '').replace(/^(\d{5})(\d{3}).*/, '$1-$2');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'telefone') {
            setCliente((prevCliente) => ({ ...prevCliente, telefone: formatarTelefone(value) }));
        } else if (name === 'cep') {
            setCliente((prevCliente) => ({ ...prevCliente, cep: formatarCep(value) }));
        } else {
            setCliente((prevCliente) => ({ ...prevCliente, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAdicionarCliente(); // Envia os dados
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Adicionar Cliente</h2>

            <div className="mb-4">
                <label htmlFor="nome" className="block text-sm font-medium mb-1">Nome do Cliente</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={cliente.nome}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email do Cliente</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={cliente.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="telefone" className="block text-sm font-medium mb-1">Telefone do Cliente</label>
                <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={cliente.telefone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="(XX) XXXXX-XXXX"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="cpf" className="block text-sm font-medium mb-1">CPF do Cliente</label>
                <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    value={cliente.cpf}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="cep" className="block text-sm font-medium mb-1">CEP do Cliente</label>
                <input
                    type="text"
                    id="cep"
                    name="cep"
                    value={cliente.cep}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="XXXXX-XXX"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Adicionar Cliente
            </button>
        </form>
    );
};

export default FormCliente;
