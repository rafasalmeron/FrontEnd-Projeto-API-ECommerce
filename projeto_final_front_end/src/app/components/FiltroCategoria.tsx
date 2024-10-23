import React from 'react';
import {FiltroCategoriaProps} from "@/app/interfaces/FiltroCategoriaProps";

const FiltroCategoria: React.FC<FiltroCategoriaProps> = ({ categorias, filtroCategoria, setFiltroCategoria }) => {
    return (
        <div className="mb-8 max-w-md mx-auto">
            <label className="block text-sm font-medium mb-2">Filtrar por Categoria</label>
            <select
                value={filtroCategoria ?? ''}
                onChange={(e) => setFiltroCategoria(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full p-2 border border-gray-300 rounded"
            >
                <option value="">Todas as Categorias</option>
                {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                        {categoria.nome}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FiltroCategoria;
