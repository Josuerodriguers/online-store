import CategoriesList from '../../components/CategoriesList/CategoriesList';
import ProductsList from '../../components/ProductsList/ProductsList';
import { ProductType } from '../../type';
import style from './style.module.css';

type HomeProps = {
  products: ProductType[] | null;
  handleSubmit: (listProducts: ProductType[]) => void;
  isLoading: boolean;
};

export default function Home({ products, handleSubmit, isLoading }: HomeProps) {
  return (
    <main className={ style.mainContainer }>
      <CategoriesList handleSubmit={ handleSubmit } />
      <ProductsList products={ products } isLoading={ isLoading } />
    </main>
  );
}
