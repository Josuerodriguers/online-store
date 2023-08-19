import CartList from '../../components/CartList/CartList';
import { ProductTypeWithQuantity } from '../../type';
import style from './styles.module.css';

type ShoppingCartProps = {
  cartProducts: ProductTypeWithQuantity[];
  handleDelete: (id: string) => void;
  addItemCart: (id: string) => void;
  removeItemCart: (id: string) => void;
};

export default function ShoppingCart({
  cartProducts,
  handleDelete,
  addItemCart,
  removeItemCart }: ShoppingCartProps) {
  return (
    <main className={ style.containerMain }>
      {cartProducts.length ? (
        <section className={ style.containerProducts }>
          {cartProducts.map((product) => (
            <CartList
              key={ product.id }
              product={ product }
              handleDelete={ handleDelete }
              addItemCart={ addItemCart }
              removeItemCart={ removeItemCart }
            />
          ))}
        </section>
      ) : (
        <section className={ style.containerProducts }>
          <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
        </section>
      )}
    </main>
  );
}
