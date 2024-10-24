import {Produto} from "@/app/interfaces/produto/Produto";
import {Categoria} from "@/app/interfaces/categoria/Categoria";

export interface FormProdutoProps {
    novoProduto: Produto;
    setNovoProduto: React.Dispatch<React.SetStateAction<Produto>>;
    categorias: Categoria[];
    handleAdicionarProduto: () => void;
}
