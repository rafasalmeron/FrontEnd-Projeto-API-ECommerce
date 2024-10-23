import React from 'react';
import ProdutoCard from './ProdutoCard';
import {Produto} from "@/app/interfaces/Produto";

interface ListaProdutosProps {
    produtos: Produto[];
}

const ListaProdutos: React.FC<ListaProdutosProps> = ({ produtos }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos.map((produto) => (
                <ProdutoCard key={produto.id} produto={produto} />
            ))}
        </div>
    );
};

export default ListaProdutos;
