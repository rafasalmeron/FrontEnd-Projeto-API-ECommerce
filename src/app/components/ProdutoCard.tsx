import React from 'react';
import {Produto} from "@/app/interfaces/Produto";

interface ProdutoCardProps {
    produto: Produto;
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <img
                src={produto.imagem || 'https://via.placeholder.com/150'}
                alt={produto.nome}
                className="w-full h-32 object-cover mb-4 rounded"
            />
            <h3 className="text-lg font-bold mb-2">{produto.nome}</h3>
            <p className="text-sm text-gray-600">Categoria: {produto.categoria.nome}</p>
        </div>
    );
};

export default ProdutoCard;
