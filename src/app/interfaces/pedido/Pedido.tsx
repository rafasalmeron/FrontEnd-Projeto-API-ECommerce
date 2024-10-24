import {Cliente} from "@/app/interfaces/cliente/Cliente";
import {Produto} from "@/app/interfaces/produto/Produto";

export interface Pedido {
    id: number;
    cliente: Cliente | { id: number };
    produto: (Produto | { id: number })[];
    dataPedido: string;
    valorTotal: number;
    valor: number;
}