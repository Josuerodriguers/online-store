import CartList from '../../components/CartList/CartList';
import { ProductType } from '../../type';
import style from './styles.module.css';

type ShoppingCartProps = {
  cartProducts: ProductType[];
};

export default function ShoppingCart({ cartProducts }: ShoppingCartProps) {
  return (
    <main className={ style.containerMain }>
      {cartProducts.length ? (
        <section className={ style.containerProducts }>
          {cartProducts.map((product) => (
            <CartList key={ product.id } product={ product } />
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
