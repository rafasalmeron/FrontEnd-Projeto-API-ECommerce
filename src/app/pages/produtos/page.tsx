'use client';

import { useState, useEffect } from 'react';
import { makeRequest } from "@/app/services/apiService";
import FormProduto from "@/app/components/FormProduto";
import FormCategoria from "@/app/components/FormCategoria";
import FiltroCategoria from "@/app/components/FiltroCategoria";
import ListaProdutos from "@/app/components/ListaProdutos";
import { Produto } from "@/app/interfaces/Produto";
import { Categoria } from "@/app/interfaces/Categoria";
import Header from "@/app/components/Header";

interface PaginatedResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

const Produtos = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [novoProduto, setNovoProduto] = useState<Produto>({ id: 0, valor: 0, nome: '', categoriaId: 0, imagem: '' });
    const [novaCategoria, setNovaCategoria] = useState<string>('');
    const [filtroCategoria, setFiltroCategoria] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const produtosData = await makeRequest<undefined, {content: Produto[]}>('/produtos', 'get');
                const categoriasData = await makeRequest<undefined, Categoria[]>('/categorias', 'get');
                setProdutos(produtosData.content);
                setCategorias(categoriasData);
                console.log('Dados das categorias:', categoriasData);
                console.log('Dados dos produtos:', produtosData.content);
            } catch (error) {
                console.error('Erro ao buscar produtos e categorias:', error);
            }
        };
        fetchData().catch((error) => console.error('Erro ao executar fetchData:', error));
    }, []);

    const handleDeletarProduto = async (id: number) => {
        try {
            await makeRequest<undefined, void>(`/produtos/${id}`, 'delete');
            setProdutos(produtos.filter((produto) => produto.id !== id));
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
        }
    };

    const handleEditarProduto = (produto: Produto) => {
        setNovoProduto(produto);
    };

    const handleAdicionarProduto = async () => {
        try {
            if (novoProduto.id !== 0) {
                await makeRequest<Produto, Produto>(`/produtos/${novoProduto.id}`, 'put', novoProduto);
                setProdutos((prevProdutos) =>
                    prevProdutos.map((produto) =>
                        produto.id === novoProduto.id ? novoProduto : produto
                    )
                );
            } else {
                const novoProdutoData = await makeRequest<Produto, Produto>('/produtos/criar', 'post', novoProduto);
                setProdutos([...produtos, novoProdutoData]);
            }

            setNovoProduto({ id: 0, valor: 0, nome: '', categoriaId: 0, imagem: '' });
        } catch (error) {
            console.error('Erro ao adicionar ou editar produto:', error);
        }
    };

    const handleAdicionarCategoria = async () => {
        if (!novaCategoria.trim()) {
            console.error('Erro: Nome da categoria não pode estar vazio');
            return;
        }
        try {
            const novaCategoriaData = await makeRequest<{ nome: string }, Categoria>('/categorias/criar', 'post', { nome: novaCategoria });
            setCategorias([...categorias, novaCategoriaData]);
            setNovaCategoria('');
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
        }
    };

    const produtosFiltrados = filtroCategoria
        ? produtos.filter((produto) => produto.categoriaId === filtroCategoria)
        : produtos;
    return (
        <>
            <Header />
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Gestão de Produtos</h1>

                <div className="flex flex-wrap">
                    <FormProduto
                        novoProduto={novoProduto}
                        setNovoProduto={setNovoProduto}
                        categorias={categorias}
                        handleAdicionarProduto={handleAdicionarProduto}
                    />
                    <FormCategoria
                        novaCategoria={novaCategoria}
                        setNovaCategoria={setNovaCategoria}
                        handleAdicionarCategoria={handleAdicionarCategoria}
                    />
                </div>

                <FiltroCategoria
                    categorias={categorias}
                    filtroCategoria={filtroCategoria}
                    setFiltroCategoria={setFiltroCategoria}
                />

                <ListaProdutos
                    produtos={produtosFiltrados}
                    handleDeletarProduto={handleDeletarProduto}
                    handleEditarProduto={handleEditarProduto}
                />

            </div>
        </>
    );
};

export default Produtos;
