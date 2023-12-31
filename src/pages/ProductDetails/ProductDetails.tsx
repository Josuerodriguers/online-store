import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { TfiBackLeft } from 'react-icons/tfi';
import { getProductById } from '../../services/api';
import style from './style.module.css';
import { ProductType, ProductTypeWithPicture, ReviewType } from '../../type';
import FormEvaluator from '../../components/FormEvaluator/FormEvaluator';
import ListReviews from '../../components/ListReviews/ListReviews';

type ProductDetailsProps = {
  handleAddCart: (product: ProductType) => void;
  numberCartItens: number;
};

export default function ProductDetails({
  handleAddCart,
  numberCartItens,
} : ProductDetailsProps) {
  const [product, setProduct] = useState<ProductTypeWithPicture>();
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const getDataProduct = async () => {
      if (id) {
        const resultProduct = await getProductById(id);
        setProduct(resultProduct);
        const resultReviews = JSON.parse(localStorage.getItem(id) as string);
        if (resultReviews) {
          setReviews(resultReviews);
        }
      }
    };
    getDataProduct();
  }, [id]);

  const updateReviews = (review: ReviewType) => {
    setReviews([...reviews, review]);
  };

  return (
    <>
      <header className={ style.containerHeader }>
        <section>
          <button
            onClick={ () => window.history.back() }
          >
            <TfiBackLeft size="1.6rem" />
          </button>
          <Link to="/cart" data-testid="shopping-cart-button">
            <BsCart3 size="1.6rem" />
            <span data-testid="shopping-cart-size">{numberCartItens}</span>
          </Link>
        </section>
      </header>
      <main className={ style.containerMain }>
        <section className={ style.containerProduct }>
          {product && (
            <>
              <section className={ style.containerTitle }>
                <h3 data-testid="product-detail-name">{ product.title }</h3>
              </section>
              <section className={ style.containerInfo }>
                <section className={ style.containerImg }>
                  <img
                    data-testid="product-detail-image"
                    src={ product.pictures[0].url }
                    alt={ product.title }
                  />
                </section>
                <section className={ style.containerText }>
                  <section>
                    <h3 data-testid="product-detail-price">
                      { `Preço: R$ ${product.price}` }
                    </h3>
                    <button
                      type="button"
                      data-testid="product-detail-add-to-cart"
                      onClick={ () => handleAddCart({
                        id: product.id,
                        title: product.title,
                        thumbnail: product.thumbnail,
                        price: product.price,
                        shipping: product.shipping,
                        available_quantity: product.available_quantity,
                      }) }
                    >
                      Adicionar ao Carrinho
                    </button>
                  </section>
                </section>
              </section>
            </>
          )}
        </section>
        <section className={ style.containerForm }>
          <FormEvaluator id={ id as string } updateReviews={ updateReviews } />
        </section>
        <section>
          <ListReviews reviews={ reviews } />
        </section>
      </main>
    </>
  );
}
