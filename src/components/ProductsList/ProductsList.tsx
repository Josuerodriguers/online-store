import { Link } from 'react-router-dom';
import Loading from '../../pages/Loading/Loading';
import { ProductType } from '../../type';
import style from './style.module.css';

type ProductsListProps = {
  products: ProductType[] | null;
  isLoading: boolean;
};

export default function ProductsList({ products, isLoading }: ProductsListProps) {
  if (isLoading) return <Loading />;

  return (
    <section className={ style.sectionContainer }>
      {products !== null && (
        products.length ? (
          products.map(({ id, title, thumbnail, price }) => (
            <Link
              to={ `product/${id}` }
              data-testid="product-detail-link"
              className={ style.cardProduct }
              key={ id }
            >
              <section data-testid="product">
                <img src={ thumbnail } alt="" />
                <h4>{price}</h4>
                <p>{title}</p>
              </section>
            </Link>
          ))
        ) : (
          <h3>Nenhum produto foi encontrado</h3>
        )
      )}
    </section>
  );
}
