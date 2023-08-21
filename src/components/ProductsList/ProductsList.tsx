import { Link } from 'react-router-dom';
import Loading from '../../pages/Loading/Loading';
import { ProductType } from '../../type';
import style from './style.module.css';

type ProductsListProps = {
  products: ProductType[] | null;
  isLoading: boolean;
  handleAddCart: (product: ProductType) => void;
};

export default function ProductsList({
  products,
  isLoading,
  handleAddCart }: ProductsListProps) {
  if (isLoading) return <Loading />;

  return (
    <section className={ style.sectionContainer }>
      {products !== null && (
        products.length ? (
          products.map(({
            id,
            title,
            thumbnail,
            price,
            shipping,
            available_quantity,
          }) => (
            <section className={ style.cardProduct } key={ id }>
              <Link
                to={ `product/${id}` }
                data-testid="product-detail-link"
                key={ id }
              >
                <section data-testid="product">
                  <img src={ thumbnail } alt="" />
                  <h4>{`R$ ${price}`}</h4>
                  {shipping.free_shipping
                  && (
                    <p data-testid="free-shipping">frete grátis</p>
                  )}
                  <p>{title}</p>
                </section>
              </Link>
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ () => handleAddCart({
                  id,
                  title,
                  thumbnail,
                  price,
                  shipping,
                  available_quantity,
                }) }
              >
                Adicionar ao Carrinho
              </button>
            </section>
          ))
        ) : (
          <h3>Nenhum produto foi encontrado</h3>
        )
      )}
    </section>
  );
}
