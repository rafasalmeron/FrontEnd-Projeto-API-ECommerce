import {Produto} from "@/app/interfaces/produto/Produto";

export interface Categoria {
    id: number;
    nome: string;
    produto: Produto[];
}