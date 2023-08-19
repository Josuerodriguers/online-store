import CategoriesList from '../../components/CategoriesList/CategoriesList';
import ProductsList from '../../components/ProductsList/ProductsList';
import { ProductType } from '../../type';
import style from './style.module.css';

type HomeProps = {
  products: ProductType[] | null;
  isLoading: boolean;
  handleSubmit: (listProducts: ProductType[]) => void;
  handleLoading: (value: boolean) => void;
  handleAddCart: (product: ProductType) => void;
};

export default function Home({
  products,
  handleSubmit,
  isLoading,
  handleLoading,
  handleAddCart }: HomeProps) {
  return (
    <main className={ style.mainContainer }>
      <CategoriesList handleSubmit={ handleSubmit } handleLoading={ handleLoading } />
      <ProductsList
        products={ products }
        isLoading={ isLoading }
        handleAddCart={ handleAddCart }
      />
    </main>
  );
}
