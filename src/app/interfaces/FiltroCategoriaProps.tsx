import {Categoria} from "@/app/interfaces/Categoria";

export interface FiltroCategoriaProps {
    categorias: Categoria[];
    filtroCategoria: number | null;
    setFiltroCategoria: React.Dispatch<React.SetStateAction<number | null>>;
}