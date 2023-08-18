import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import style from './style.module.css';
import { getProductsFromCategoryAndQuery } from '../../services/api';

type HeaderProps = {
  handleSubmit: (products: []) => void;
};

function Header({ handleSubmit }: HeaderProps) {
  const [searchItem, setSearchItem] = useState<string>('');
  const [isCheckedInput, setIsCheckedInput] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
    setIsCheckedInput(checkedInput(event.target.value));
  };

  const checkedInput = (value: string) => !value.length;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultData = await getProductsFromCategoryAndQuery('', searchItem);
    handleSubmit(resultData.results);
  };

  return (
    <header className={ style.header }>
      <section className={ style.sectionInput }>
        <form className={ style.containerForm } onSubmit={ submit }>
          <input
            type="text"
            placeholder="Digite o nome do produto"
            value={ searchItem }
            onChange={ (event) => handleChange(event) }
            data-testid="query-input"
          />
          <button data-testid="query-button" type="submit">Buscar</button>
        </form>

        <Link to="/cart" data-testid="shopping-cart-button">
          <BsCart3 size="1.6rem" />
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
