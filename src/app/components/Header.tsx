'use client';

import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white py-4">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">G7 Sistemas</h1>
                <div className="flex gap-6">
                    <Link href="/" className="hover:text-gray-400">
                        Home
                    </Link>
                    <Link href="/pages/produtos-categorias" className="hover:text-gray-400">
                        Produtos e Categorias
                    </Link>
                    <Link href="/pages/pedido" className="hover:text-gray-400">
                        Pedidos
                    </Link>
                    <Link href="/pages/cliente" className="hover:text-gray-400">
                        Clientes
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
