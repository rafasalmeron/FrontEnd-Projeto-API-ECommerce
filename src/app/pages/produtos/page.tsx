'use client';

import { useState, useEffect } from 'react';
import { makeRequest } from "@/app/services/apiService";
import FormProduto from "@/app/components/produto/FormProduto";
import FormCategoria from "@/app/components/categoria/FormCategoria";
import FiltroCategoria from "@/app/components/categoria/FiltroCategoria";
import ListaProdutos from "@/app/components/produto/ListaProdutos";
import { Produto } from "@/app/interfaces/produto/Produto";
import { Categoria } from "@/app/interfaces/categoria/Categoria";
import Header from "@/app/components/Header";

const Produtos = () => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [novoProduto, setNovoProduto] = useState<Produto>({ id: 0, valor: 0, nome: '', categoriaId: 0, imagem: '' });
    const [novaCategoria, setNovaCategoria] = useState<string>('');
    const [filtroCategoria, setFiltroCategoria] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriasData = await makeRequest<undefined, Categoria[]>('/categorias', 'get');
                setCategorias(categoriasData);
                console.log('Dados das categorias com produtos:', categoriasData);
            } catch (error) {
                console.error('Erro ao buscar categorias com produtos:', error);
            }
        };
        fetchData().catch((error) => console.error('Erro ao executar fetchData:', error));
    }, [categorias, novoProduto, novaCategoria, filtroCategoria]);

    const handleDeletarProduto = async (id: number) => {
        try {
            await makeRequest<undefined, void>(`/produtos/${id}`, 'delete');

            const categoriasAtualizadas = categorias.map(categoria => ({
                ...categoria,
                produto: categoria.produto.filter(produto => produto.id !== id)
            }));

            setCategorias(categoriasAtualizadas);
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
        }
    };

    const handleEditarProduto = (produto: Produto) => {
        setNovoProduto(produto);
    };

    const handleAdicionarProduto = async () => {
        try {
            const categoriaSelecionada = categorias.find(categoria => categoria.id === novoProduto.categoriaId);
            if (!categoriaSelecionada) {
                console.error('Categoria não encontrada');
                return;
            }
            if (novoProduto.id !== 0) {
                const produtoEditado = await makeRequest<Produto, Produto>(`/produtos/${novoProduto.id}`, 'put', novoProduto);
                const categoriasAtualizadas = categorias.map(categoria =>
                    categoria.id === novoProduto.categoriaId
                        ? {
                            ...categoria,
                            produto: categoria.produto.map(p =>
                                p.id === novoProduto.id ? produtoEditado : p
                            )
                        }
                        : categoria
                );
                setCategorias(categoriasAtualizadas);
            } else {
                const novoProdutoData = await makeRequest<Produto, Produto>('/produtos/criar', 'post', novoProduto);
                const categoriasAtualizadas = categorias.map(categoria =>
                    categoria.id === novoProduto.categoriaId
                        ? { ...categoria, produto: [...categoria.produto, novoProdutoData] }
                        : categoria
                );
                setCategorias(categoriasAtualizadas);
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

    const categoriasFiltradas = filtroCategoria
        ? categorias.filter(categoria => categoria.id === filtroCategoria)
        : categorias;
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
                    categorias={categoriasFiltradas}
                    handleEditarProduto={handleEditarProduto}
                    handleDeletarProduto={handleDeletarProduto}
                />
            </div>
        </>
    );
};

export default Produtos;