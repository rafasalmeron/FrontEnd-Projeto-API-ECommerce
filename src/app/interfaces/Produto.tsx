import {Categoria} from "@/app/interfaces/Categoria";

export interface Produto {
    id?: number;
    nome: string;
    categoria: Categoria;
    imagem?: string;
}