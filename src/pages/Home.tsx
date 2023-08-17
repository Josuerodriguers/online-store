import { useState, useEffect } from 'react';
import { getCategories } from '../services/api';

type Category = {
  id: number;
  name: string;
};

function Home() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const userData = await getCategories();
      setCategories(userData);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      {categories.map((category) => (
        <label
          data-testid="category"
          key={ category.id }
        >
          <input
            type="radio"
            id={ category.name }
            value={ category.name }
            name="category"
          />
          {category.name}
        </label>
      ))}

    </div>
  );
}

export default Home;
