import { useState } from 'react';

function HomeInput() {
  const [searchItem, setSearchItem] = useState<string>('');
  const [isCheckedInput, setIsCheckedInput] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
    setIsCheckedInput(checkedInput(event.target.value));
  };

  const checkedInput = (value: string) => !value.length;

  return (
    <>
      <h1>Lista de Produtos</h1>
      <input
        type="text"
        placeholder="Digite o nome do produto"
        value={ searchItem }
        onChange={ (event) => handleChange(event) }
      />
      { isCheckedInput
      && (
        <h2
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>)}

    </>
  );
}

export default HomeInput;
