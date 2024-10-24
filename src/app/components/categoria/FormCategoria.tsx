import React from 'react';
import {FormCategoriaProps} from "@/app/interfaces/categoria/FormCategoriaProps";

const FormCategoria: React.FC<FormCategoriaProps> = ({ novaCategoria, setNovaCategoria, handleAdicionarCategoria }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Adicionar Categoria</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nome da Categoria</label>
                <input
                    type="text"
                    value={novaCategoria}
                    onChange={(e) => setNovaCategoria(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <button
                onClick={handleAdicionarCategoria}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Adicionar Categoria
            </button>
        </div>
    );
};

export default FormCategoria;
