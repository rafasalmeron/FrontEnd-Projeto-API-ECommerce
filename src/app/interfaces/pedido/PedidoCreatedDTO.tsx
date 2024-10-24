import {ProdutoPedidoDTO} from "@/app/interfaces/pedido/ProdutoPedidoDTO";

export interface PedidoCreateDTO {
    clienteId: number;
    produtosPedidos: ProdutoPedidoDTO[];
}
