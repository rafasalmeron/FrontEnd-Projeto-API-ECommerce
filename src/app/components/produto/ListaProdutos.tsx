import React from 'react';
import ProdutoCard from './ProdutoCard';
import {Produto} from "@/app/interfaces/produto/Produto";
import {Categoria} from "@/app/interfaces/categoria/Categoria";


const ListaProdutos: React.FC<{
    categorias: Categoria[],
    handleDeletarProduto: (id: number) => void,
    handleEditarProduto: (produto: Produto) => void
}> = ({ categorias, handleDeletarProduto, handleEditarProduto }) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categorias.map(categoria => (
                categoria.produto.map(produto => (
                    <ProdutoCard
                        key={produto.id}
                        produto={produto}
                        categoria={categoria}
                        handleDeletarProduto={() => handleDeletarProduto(produto.id)}
                        handleEditarProduto={handleEditarProduto}
                    />
                ))
            ))}
        </div>
    );
};

export default ListaProdutos;