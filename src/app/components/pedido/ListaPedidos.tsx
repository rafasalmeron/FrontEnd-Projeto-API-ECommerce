import React from 'react';

export interface PedidoResponse {
    id: number;
    nomeCliente: string;
    nomesProdutos: string[];  // Supondo que esta seja uma matriz de strings
    valorTotal: number;  // Altere para "valorTotal" em vez de "valor" para corresponder ao DTO no backend
}

const ListaPedidos: React.FC<{ pedidos: PedidoResponse[] }> = ({ pedidos }) => {
    if (!Array.isArray(pedidos)) {
        return <p>Nenhum pedido encontrado.</p>;  // Exibe uma mensagem de erro ou de "Nenhum pedido encontrado"
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pedidos.map(pedido => (
                <div key={pedido.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
                    <h3 className="text-lg font-bold mb-2">{pedido.nomeCliente}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                        Produtos: {Array.isArray(pedido.nomesProdutos) ? pedido.nomesProdutos.join(', ') : 'Sem produtos'}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">Valor Total: R${pedido.valorTotal.toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
};

export default ListaPedidos;
