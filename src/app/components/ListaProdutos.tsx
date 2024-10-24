import React from 'react';
import ProdutoCard from './ProdutoCard';
import {Produto} from "@/app/interfaces/Produto";

interface ListaProdutosProps {
    produtos: Produto[];
    handleDeletarProduto: (id: number) => Promise<void>;
    handleEditarProduto: (produto: Produto) => void;
}

const ListaProdutos: React.FC<ListaProdutosProps> = ({ produtos, handleDeletarProduto, handleEditarProduto }) => {
    console.log('Produtos no ListaProdutos:', produtos);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos.length === 0 ? (
                <p>Nenhum produto encontrado</p>
            ) : (
                produtos.map((produto) => (
                    <ProdutoCard
                        key={produto.id}
                        produto={produto}
                        handleDeletarProduto={handleDeletarProduto}
                        handleEditarProduto={handleEditarProduto}
                    />
                ))
            )}
        </div>
    );
};

export default ListaProdutos;
