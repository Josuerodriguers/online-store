import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { paymentMethods } from '../../data';

type CheckoutProps = {
  clearCart: () => void;
};

export default function Form({ clearCart }: CheckoutProps) {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    fullName: '',
    cpf: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
  };

  const [userInfo, setUserInfo] = useState(INITIAL_STATE);
  const [isEmptyField, setIsEmptyField] = useState(false);

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    console.log(name, value);
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = () => {
    if (!Object.values(userInfo).includes('')) {
      localStorage.removeItem('cartList');
      clearCart();
      navigate('/');
    } else setIsEmptyField(true);
  };

  return (
    <section className={ style.container }>
      <section className={ style.containerTitleData }>
        <h2>Dados do Cliente</h2>
      </section>
      <section className={ style.containerForm }>
        <form className={ style.form }>
          <section className={ style.infoData }>
            <input
              data-testid="checkout-fullname"
              type="text"
              id="fullName"
              placeholder="Nome Completo"
              name="fullName"
              onChange={ (event) => handleChange(event) }
            />
            <input
              data-testid="checkout-cpf"
              type="text"
              id="cpf"
              placeholder="CPF"
              name="cpf"
              onChange={ (event) => handleChange(event) }
            />
            <input
              data-testid="checkout-email"
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              onChange={ (event) => handleChange(event) }
            />
            <input
              data-testid="checkout-phone"
              type="text"
              id="phone"
              placeholder="Telefone"
              name="phone"
              onChange={ (event) => handleChange(event) }
            />
            <input
              data-testid="checkout-cep"
              type="text"
              id="cep"
              placeholder="CEP"
              name="cep"
              onChange={ (event) => handleChange(event) }
            />
            <input
              data-testid="checkout-address"
              type="text"
              id="address"
              placeholder="Endereço"
              name="address"
              onChange={ (event) => handleChange(event) }
            />
          </section>
          <section className={ style.containerPayment }>
            <label className={ style.PaymentInfo }>
              Método de Pagamento:
              {paymentMethods.map(({ id, dataTest, name }) => (
                <label key={ id } htmlFor={ name.toLowerCase() }>
                  {name}
                  <input
                    data-testid={ dataTest }
                    name="payment"
                    id={ name.toLowerCase() }
                    type="radio"
                    value={ name }
                    onChange={ (event) => handleChange(event) }
                  />
                </label>
              ))}
            </label>
          </section>
        </form>
      </section>
      <section>
        <button
          data-testid="checkout-btn"
          type="submit"
          onClick={ handleSubmit }
        >
          Comprar
        </button>
      </section>
      {isEmptyField && <h3 data-testid="error-msg">Campos inválidos</h3>}
    </section>
  );
}
