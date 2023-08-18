import { useState, useEffect } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../../services/api';
import style from './styles.module.css';
import { CategoryType, ProductType } from '../../type';

type CategoriesListProps = {
  handleSubmit: (listProducts: ProductType[]) => void;
};

function CategoriesList({ handleSubmit }: CategoriesListProps) {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const handleClick = async (categoriesId: string) => {
    const resultData = await getProductsFromCategoryAndQuery(categoriesId, '');
    handleSubmit(resultData.results);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  return (
    <section className={ style.sectionContainer }>
      <h3>Categorias</h3>
      {categories.map(({ id, name }) => (
        <section className={ style.categoryCard } key={ id }>
          <label
            data-testid="category"
            htmlFor={ name }
          >
            <input
              type="radio"
              id={ name }
              value={ name }
              name="category"
              onClick={ () => handleClick(id) }
            />
            { name }
          </label>
        </section>
      ))}
    </section>
  );
}

export default CategoriesList;
