import { FormClienteProps } from "@/app/interfaces/FormClienteProps";
import Image from "next/image";
import React, { useState } from "react";

interface ClienteCardProps {
    cliente: FormClienteProps;
    handleEditarCliente: (cliente: FormClienteProps) => void;
    handleDeletarCliente: (id: number) => void;
}

const ClienteCard: React.FC<ClienteCardProps> = ({ cliente, handleEditarCliente, handleDeletarCliente }) => {
    const imageUrl = cliente.imagem || 'https://dummyimage.com/150x150/cccccc/ffffff&text=FotoCliente';
    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-4 relative">
            <Image
                src={imageUrl}
                alt={cliente.nome}
                className="w-full h-32 object-cover mt-4 rounded"
                width={150}
                height={150}
                placeholder="blur"
                blurDataURL={imageUrl}
            />
            <h3 className="text-lg font-bold mb-2">{cliente.nome}</h3>
            <p className="text-sm text-gray-600"><strong>Email:</strong> {cliente.email}</p>
            <p className="text-sm text-gray-600"><strong>Telefone:</strong> {cliente.telefone}</p>
            <p className="text-sm text-gray-600"><strong>CPF:</strong> {cliente.cpf}</p>

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
                                handleEditarCliente(cliente);
                                toggleMenu();
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => {
                                handleDeletarCliente(cliente.id);
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

export default ClienteCard;
