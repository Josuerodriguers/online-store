import { ProductType } from '../../type';
import style from './style.module.css';

type ProductsListProps = {
  products: ProductType[] | null;
};

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <section className={ style.sectionContainer }>
      {products !== null && (
        products.length ? (
          products.map(({ id, title, thumbnail, price }) => (
            <section data-testid="product" className={ style.cardProduct } key={ id }>
              <img src={ thumbnail } alt="" />
              <h4>{price}</h4>
              <p>{title}</p>
            </section>
          ))
        ) : (
          <h3>Nenhum produto foi encontrado</h3>
        )
      )}
    </section>
  );
}
