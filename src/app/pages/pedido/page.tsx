'use client';

import React, { useState } from 'react';
import { Produto } from "@/app/interfaces/produto/Produto";
import { Cliente } from "@/app/interfaces/cliente/Cliente";
import { PedidoCreateDTO } from "@/app/interfaces/pedido/PedidoCreatedDTO";

interface FormPedidoProps {
    novoPedido: PedidoCreateDTO;
    setNovoPedido: React.Dispatch<React.SetStateAction<PedidoCreateDTO>>;
    clientes: Cliente[];
    produtos: Produto[];
    handleCriarPedido: () => void;
}

const FormPedido: React.FC<FormPedidoProps> = ({ novoPedido, setNovoPedido, clientes, produtos, handleCriarPedido }) => {
    const [produtosSelecionados, setProdutosSelecionados] = useState<number[]>([]);

    // Inicialize corretamente clienteId e produtosPedidos no estado inicial
    const handleClienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const clienteId = Number(e.target.value);
        setNovoPedido(prev => ({
            ...prev,
            clienteId, // Garantindo que clienteId seja atualizado corretamente
            produtosPedidos: prev.produtosPedidos || [] // Inicializando produtosPedidos, se não estiver
        }));
    };

    const handleProdutoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const produtoId = Number(e.target.value);

        if (produtoId && !produtosSelecionados.includes(produtoId)) {
            setProdutosSelecionados([...produtosSelecionados, produtoId]);
            setNovoPedido(prev => ({
                ...prev,
                produtosPedidos: [...prev.produtosPedidos, { produtoId, quantidade: 1 }] // Adiciona produtosPedidos corretamente
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCriarPedido();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Criar Pedido</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Cliente</label>
                <select
                    name="clienteId"
                    value={novoPedido?.clienteId || 0} // Aqui garantimos que clienteId está definido
                    onChange={handleClienteChange}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="0">Selecione um Cliente</option>
                    {clientes.map(cliente => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nome}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Produtos</label>
                <select
                    name="produto"
                    onChange={handleProdutoChange}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="0">Selecione um Produto</option>
                    {Array.isArray(produtos) && produtos.map(produto => (
                        <option key={produto.id} value={produto.id}>
                            {produto.nome}
                        </option>
                    ))}
                </select>

                <div className="mt-4">
                    <p>Produtos Selecionados:</p>
                    <ul>
                        {produtosSelecionados.map(produtoId => (
                            <li key={produtoId}>
                                {produtos.find(p => p.id === produtoId)?.nome}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Criar Pedido
            </button>
        </form>
    );
};

export default FormPedido;
