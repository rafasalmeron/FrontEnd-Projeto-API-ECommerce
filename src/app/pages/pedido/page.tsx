'use client';

import { useState, useEffect } from 'react';
import { makeRequest } from "@/app/services/apiService";
import ListaPedidos, { PedidoResponse } from "@/app/components/pedido/ListaPedidos";
import FiltroCliente from "@/app/components/cliente/FiltroCliente";
import { PedidoCreateDTO } from "@/app/interfaces/pedido/PedidoCreatedDTO";
import { Cliente } from "@/app/interfaces/cliente/Cliente";
import { Produto } from "@/app/interfaces/produto/Produto";
import Header from "@/app/components/Header";
import FormPedido from "@/app/components/pedido/FormPedidos";
import { Categoria } from "@/app/interfaces/categoria/Categoria";

const PedidosPage = () => {
    const [pedidos, setPedidos] = useState<PedidoResponse[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [novoPedido, setNovoPedido] = useState<PedidoCreateDTO>({
        clienteId: 0,
        produtosPedidos: []
    });
    const [filtroCliente, setFiltroCliente] = useState<number | null>(null);

    const fetchData = async () => {
        try {
            const pedidosData = await makeRequest<undefined, PedidoResponse[]>('/pedidos', 'get');
            const clientesData = await makeRequest<undefined, Cliente[]>('/clientes', 'get');
            const categoriasData = await makeRequest<undefined, Categoria[]>('/categorias', 'get');

            setPedidos(pedidosData || []);
            const allProdutos = categoriasData.flatMap(categoria => categoria.produto);
            setProdutos(allProdutos);

            setClientes(clientesData);
            setCategorias(categoriasData);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCriarPedido = async () => {
        try {
            const novoPedidoData = await makeRequest<PedidoCreateDTO, PedidoResponse>('/pedidos/criar', 'post', novoPedido);

            if (novoPedidoData && novoPedidoData.id) {
                setPedidos((prevPedidos) => [...prevPedidos, novoPedidoData]);
            } else {
                console.error("Erro: Dados inválidos retornados após criação do pedido.");
            }
            setNovoPedido({
                clienteId: 0,
                produtosPedidos: []
            });
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
        }
    };


    const pedidosFiltrados = filtroCliente
        ? pedidos.filter(pedido => pedido.nomeCliente === clientes.find(c => c.id === filtroCliente)?.nome)
        : pedidos;

    return (
        <>
            <Header />
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Gestão de Pedidos</h1>

                <FiltroCliente
                    clientes={clientes}
                    filtroCliente={filtroCliente}
                    setFiltroCliente={setFiltroCliente}
                />

                <FormPedido
                    novoPedido={novoPedido}
                    setNovoPedido={setNovoPedido}
                    clientes={clientes}
                    produtos={produtos}
                    handleCriarPedido={handleCriarPedido}
                />

                {pedidosFiltrados.length === 0 ? (
                    <p>Nenhum pedido encontrado.</p>
                ) : (
                    <ListaPedidos pedidos={pedidosFiltrados} />
                )}
            </div>
        </>
    );
};

export default PedidosPage;