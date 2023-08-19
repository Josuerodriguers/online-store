import { ProductTypeWithQuantity } from '../../type';
import style from './styles.module.css';

type CardListProps = {
  product: ProductTypeWithQuantity;
};

export default function CartList({ product }: CardListProps) {
  return (
    <section className={ style.productCard }>
      <section className={ style.productInfo }>
        <img src={ product.thumbnail } alt={ product.title } />
        <p data-testid="shopping-cart-product-name">{ product.title }</p>
      </section>
      <section className={ style.saleInfo }>
        <p data-testid="shopping-cart-product-quantity">
          {`quantidade: ${product.quantity}`}
        </p>
        <h3>{ `R$ ${product.price}` }</h3>
      </section>
    </section>
  );
}
