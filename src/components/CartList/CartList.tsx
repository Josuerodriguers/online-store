import { AiOutlineDelete } from 'react-icons/ai';
import { ProductTypeWithQuantity } from '../../type';
import style from './styles.module.css';

type CardListProps = {
  product: ProductTypeWithQuantity;
  handleDelete: (id: string) => void;
  addItemCart: (id: string) => void;
  removeItemCart: (id: string) => void;
};

export default function CartList({
  product,
  handleDelete,
  addItemCart,
  removeItemCart }: CardListProps) {
  return (
    <section className={ style.productCard }>
      <section className={ style.btnDeleteContainer }>
        <button
          data-testid="remove-product"
          type="button"
          onClick={ () => handleDelete(product.id) }
        >
          <AiOutlineDelete size="1.5rem" />
        </button>
      </section>
      <section className={ style.productInfo }>
        <img src={ product.thumbnail } alt={ product.title } />
        <p data-testid="shopping-cart-product-name">{ product.title }</p>
      </section>
      <section className={ style.saleInfo }>
        <section className={ style.containerQuantity }>
          <button
            data-testid="product-increase-quantity"
            type="button"
            onClick={ () => addItemCart(product.id) }
          >
            +
          </button>
          <p data-testid="shopping-cart-product-quantity">
            {`quantidade: ${product.quantity}`}
          </p>
          <button
            data-testid="product-decrease-quantity"
            type="button"
            onClick={ () => removeItemCart(product.id) }
          >
            -
          </button>
        </section>
        <h3>{ `R$ ${product.price}` }</h3>
      </section>
    </section>
  );
}
