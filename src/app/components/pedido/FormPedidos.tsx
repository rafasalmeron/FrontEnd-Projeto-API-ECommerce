import React from 'react';
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

const FormPedido: React.FC<FormPedidoProps> = ({ novoPedido, setNovoPedido, clientes = [], produtos = [], handleCriarPedido }) => {
    const handleClienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const clienteId = Number(e.target.value);
        setNovoPedido(prev => ({
            ...prev,
            clienteId,
            produtosPedidos: prev.produtosPedidos || []
        }));
    };

    const handleProdutoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const produtoId = Number(e.target.value);

        if (produtoId && !novoPedido.produtosPedidos.some(prod => prod.produtoId === produtoId)) {
            setNovoPedido(prev => ({
                ...prev,
                produtosPedidos: [...prev.produtosPedidos, { produtoId, quantidade: 1 }] // Adiciona produto com quantidade 1
            }));
        }
    };

    const handleQuantidadeChange = (produtoId: number, quantidade: number) => {
        setNovoPedido(prev => ({
            ...prev,
            produtosPedidos: prev.produtosPedidos.map(prod =>
                prod.produtoId === produtoId ? { ...prod, quantidade } : prod
            )
        }));
    };

    const handleRemoverProduto = (produtoId: number) => {
        setNovoPedido(prev => ({
            ...prev,
            produtosPedidos: prev.produtosPedidos.filter(prod => prod.produtoId !== produtoId)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCriarPedido();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Criar Pedido</h2>

            {/* Seleção de Cliente */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Cliente</label>
                <select
                    name="clienteId"
                    value={novoPedido.clienteId || 0}
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

            {/* Seleção de Produto */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Produtos</label>
                <select
                    name="produto"
                    onChange={handleProdutoChange}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="0">Selecione um Produto</option>
                    {produtos.map(produto => (
                        <option key={produto.id} value={produto.id}>
                            {produto.nome}
                        </option>
                    ))}
                </select>
            </div>

            {/* Lista de Produtos Selecionados */}
            {novoPedido.produtosPedidos.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-sm font-medium mb-1">Produtos Selecionados</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        {novoPedido.produtosPedidos.map((prod) => {
                            const produtoDetalhes = produtos.find(p => p.id === prod.produtoId);
                            return (
                                <li key={prod.produtoId} className="flex justify-between items-center">
                                    <span>{produtoDetalhes?.nome}</span>
                                    <input
                                        type="number"
                                        min="1"
                                        value={prod.quantidade}
                                        onChange={(e) => handleQuantidadeChange(prod.produtoId, Number(e.target.value))}
                                        className="w-16 p-1 border border-gray-300 rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoverProduto(prod.produtoId)}
                                        className="text-red-500 hover:text-red-700 ml-4"
                                    >
                                        Remover
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Criar Pedido
            </button>
        </form>
    );
};

export default FormPedido;
