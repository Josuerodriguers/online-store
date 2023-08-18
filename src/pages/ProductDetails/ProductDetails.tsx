import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { TfiBackLeft } from 'react-icons/tfi';
import { getProductById } from '../../services/api';
import style from './style.module.css';
import { ProductTypeWithPicture } from '../../type';

export default function ProductDetails() {
  const [product, setProduct] = useState<ProductTypeWithPicture>();
  const { id } = useParams();

  useEffect(() => {
    const getDataProduct = async () => {
      if (typeof id === 'string') {
        const resultData = await getProductById(id);
        setProduct(resultData);
      }
    };
    getDataProduct();
  }, [id]);

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
          </Link>
        </section>
      </header>
      <main className={ style.containerMain }>
        <section className={ style.containerProduct }>
          {product && (
            <>
              <section className={ style.containerImg }>
                <img
                  data-testid="product-detail-image"
                  src={ product.pictures[0].url }
                  alt={ product.title }
                />
              </section>
              <section className={ style.containerInfo }>
                <h2 data-testid="product-detail-name">{ product.title }</h2>
                <h2 data-testid="product-detail-price">{ `R$ ${product.price}` }</h2>
              </section>
            </>
          )}
        </section>
      </main>
    </>
  );
}
