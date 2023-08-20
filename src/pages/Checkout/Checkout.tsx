import { useEffect, useState } from 'react';
import { TfiBackLeft } from 'react-icons/tfi';
import style from './style.module.css';
import Form from '../../components/Form/Form';

type CheckoutProps = {
  clearCart: () => void;
};

export default function Checkout({ clearCart }: CheckoutProps) {
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    const getDataLocalStorage = () => {
      const resultData = JSON.parse(localStorage.getItem('cartList') as string);
      if (resultData.length) {
        setCartList(resultData);
      }
    };
    getDataLocalStorage();
  }, []);

  return (
    <>
      <header className={ style.containerHeader }>
        <section>
          <button
            onClick={ () => window.history.back() }
          >
            <TfiBackLeft size="1.6rem" />
          </button>
        </section>
      </header>
      <main>
        <section className={ style.containerCartList }>
          {cartList.map(({ id, price, thumbnail, title, quantity }) => (
            <section key={ id } className={ style.productCard }>
              <section className={ style.containerInfo }>
                <img src={ thumbnail } alt={ title } />
                <p>{title}</p>
              </section>
              <section className={ style.containerSale }>
                <h4>{ price }</h4>
                <p>{ quantity }</p>
              </section>
            </section>
          ))}
        </section>

        <Form clearCart={ clearCart } />
      </main>
    </>
  );
}
