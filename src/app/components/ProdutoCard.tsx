import React from 'react';
import {Produto} from "@/app/interfaces/Produto";
import Image from "next/image";

interface ProdutoCardProps {
    produto: Produto;
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto }) => {
    const imageUrl = produto.imagem || 'https://dummyimage.com/150x150/cccccc/ffffff&text=Produto';
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
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
            <p className="text-sm text-gray-600">Categoria: {produto.categoria.nome}</p>
        </div>
    );
};

export default ProdutoCard;
