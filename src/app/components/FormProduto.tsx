import React from 'react';
import {FormProdutoProps} from "@/app/interfaces/FormProdutosProps";

const FormProduto: React.FC<FormProdutoProps> = ({ novoProduto, setNovoProduto, categorias, handleAdicionarProduto }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Adicionar Produto</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nome do Produto</label>
                <input
                    type="text"
                    value={novoProduto.nome}
                    onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Categoria</label>
                <select
                    value={novoProduto.categoria.id}
                    onChange={(e) =>
                        setNovoProduto({
                            ...novoProduto,
                            categoria: categorias.find((cat) => cat.id === parseInt(e.target.value)) || { id: 0, nome: '' },
                        })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="0">Selecione uma Categoria</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nome}
                        </option>
                    ))}
                </select>
            </div>
            <button
                onClick={handleAdicionarProduto}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Adicionar Produto
            </button>
        </div>
    );
};

export default FormProduto;
