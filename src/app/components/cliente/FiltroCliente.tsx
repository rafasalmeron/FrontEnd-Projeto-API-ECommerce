import React from 'react';
import { Cliente } from "@/app/interfaces/cliente/Cliente";

interface FiltroClienteProps {
    clientes: Cliente[];
    filtroCliente: number | null;
    setFiltroCliente: React.Dispatch<React.SetStateAction<number | null>>;
}

const FiltroCliente: React.FC<FiltroClienteProps> = ({ clientes, filtroCliente, setFiltroCliente }) => {
    return (
        <div className="mb-8">
            <label className="block text-sm font-medium mb-1">Filtrar por Cliente</label>
            <select
                value={filtroCliente || 0}
                onChange={(e) => setFiltroCliente(Number(e.target.value) || null)}
                className="w-full p-2 border border-gray-300 rounded"
            >
                <option value="0">Todos os Clientes</option>
                {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>
                        {cliente.nome}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FiltroCliente;
