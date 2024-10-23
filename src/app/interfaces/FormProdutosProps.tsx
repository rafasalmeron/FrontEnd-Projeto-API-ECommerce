import {Produto} from "@/app/interfaces/Produto";
import {Categoria} from "@/app/interfaces/Categoria";

export interface FormProdutoProps {
    novoProduto: Produto;
    setNovoProduto: React.Dispatch<React.SetStateAction<Produto>>;
    categorias: Categoria[];
    handleAdicionarProduto: () => void;
}
