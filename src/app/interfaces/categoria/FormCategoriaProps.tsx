export interface FormCategoriaProps {
    novaCategoria: string;
    setNovaCategoria: React.Dispatch<React.SetStateAction<string>>;
    handleAdicionarCategoria: () => void;
}