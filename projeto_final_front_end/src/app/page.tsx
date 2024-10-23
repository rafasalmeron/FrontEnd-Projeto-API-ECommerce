'use client';

import Link from 'next/link';
import Header from "@/app/components/Header";

const Home = () => {
    return (
        <>
            <Header />

            <div className="p-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Gestão do Sistema</h1>
                <div className="flex flex-col items-center gap-4">
                    <Link href="/pages/produtos" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
                        Gerenciar Produtos e Categorias
                    </Link>
                    <Link href="/pages/pedido" className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">
                        Gerenciar Pedidos
                    </Link>
                    <Link href="/pages/cliente" className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600">
                        Gerenciar Clientes
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Home;
