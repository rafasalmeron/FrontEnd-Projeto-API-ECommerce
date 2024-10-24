'use client'

import React, { useState } from 'react';
import { Produto } from "@/app/interfaces/Produto";
import Image from "next/image";
import {Categoria} from "@/app/interfaces/Categoria";

interface ProdutoCardProps {
    produto: Produto;
    categoria: Categoria;
    handleDeletarProduto: (id: number) => void;
    handleEditarProduto: (produto: Produto) => void;
}


const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto, handleDeletarProduto, handleEditarProduto }) => {
    const [menuAberto, setMenuAberto] = useState(false);
    const imageUrl = produto.imagem || 'https://dummyimage.com/150x150/cccccc/ffffff&text=Produto';

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md relative">
            <Image
                src={imageUrl}
                alt={produto.nome}
                width={150}
                height={150}
                className="w-full h-32 object-cover mb-4 rounded"
                placeholder="blur"
                blurDataURL={imageUrl}
            />
            <h3 className="text-lg font-bold mb-2">{produto.nome}</h3>


            {/* Botão de opções */}
            <div className="absolute top-2 right-2">
                <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
                    &#x2026;
                </button>

                {/* Dropdown de opções */}
                {menuAberto && (
                    <div className="absolute right-0 bg-white border rounded shadow-md mt-2 z-10">
                        <button
                            onClick={() => {
                                handleEditarProduto(produto);
                                toggleMenu();
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => {
                                handleDeletarProduto(produto.id);
                                toggleMenu();
                            }}
                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                        >
                            Excluir
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProdutoCard;
