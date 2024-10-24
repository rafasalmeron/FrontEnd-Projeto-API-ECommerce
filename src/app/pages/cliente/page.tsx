'use client';

import { useState, useEffect } from 'react';
import { makeRequest } from "@/app/services/apiService";
import FormCliente from "@/app/components/FormCliente";
import Header from "@/app/components/Header";
import { FormClienteProps } from "@/app/interfaces/FormClienteProps";
import ClienteCard from "@/app/components/ClienteCard";

const ClientePage = () => {
    const [clientes, setClientes] = useState<FormClienteProps[]>([]);
    const [novoCliente, setNovoCliente] = useState<FormClienteProps>({ id: 0, nome: '', email: '', telefone: '', cpf: '', imagem: '', cep: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const clienteData = await makeRequest<undefined, FormClienteProps[]>('/clientes', 'get');
                setClientes(clienteData);
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            }
        };
        fetchClientes();
    }, []);

    const handleAdicionarCliente = async () => {
        try {
            if (isEditing) {
                await makeRequest<FormClienteProps, FormClienteProps>(`/clientes/${novoCliente.id}`, 'put', novoCliente);
                setClientes((prevClientes) =>
                    prevClientes.map((cliente) => (cliente.id === novoCliente.id ? novoCliente : cliente))
                );
                setIsEditing(false);
            } else {
                const novoClienteData = await makeRequest<FormClienteProps, FormClienteProps>('/clientes/criar', 'post', novoCliente);
                setClientes([...clientes, novoClienteData]);
            }
            setNovoCliente({ id: 0, nome: '', email: '', telefone: '', cpf: '', imagem: '', cep: '' });
        } catch (error) {
            console.error('Erro ao adicionar ou editar cliente:', error);
        }
    };

    const handleEditarCliente = (cliente: FormClienteProps) => {
        setNovoCliente(cliente); // Preenche o formulário com o cliente para edição
        setIsEditing(true); // Marca como edição
    };

    const handleDeletarCliente = async (id: number) => {
        try {
            await makeRequest<undefined, void>(`/clientes/${id}`, 'delete');
            setClientes(clientes.filter((cliente) => cliente.id !== id));
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Gestão de Clientes</h1>

                <div className="flex flex-wrap">
                    <FormCliente
                        cliente={novoCliente}
                        setCliente={setNovoCliente}
                        handleAdicionarCliente={handleAdicionarCliente}
                    />
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Lista de Clientes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {clientes.map((cliente) => (
                            <ClienteCard
                                key={cliente.id}
                                cliente={cliente}
                                handleEditarCliente={handleEditarCliente}
                                handleDeletarCliente={handleDeletarCliente}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientePage;
