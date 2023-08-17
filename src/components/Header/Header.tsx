import { useState } from 'react';
import { Link } from 'react-router-dom';
import cart from '../../assets/images/cart.png';
import style from './header.module.css';

function Header() {
  const [searchItem, setSearchItem] = useState<string>('');
  const [isCheckedInput, setIsCheckedInput] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
    setIsCheckedInput(checkedInput(event.target.value));
  };

  const checkedInput = (value: string) => !value.length;

  return (
    <header className={ style.header }>
      <section className={ style.sectionInput }>
        <input
          type="text"
          placeholder="Digite o nome do produto"
          value={ searchItem }
          onChange={ (event) => handleChange(event) }
        />

        <Link to="/cart" data-testid="shopping-cart-button">
          <img src={ cart } alt="link do carrinho de compras" width="35px" />
        </Link>
      </section>

      { isCheckedInput && (
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>)}
    </header>
  );
}

export default Header;
