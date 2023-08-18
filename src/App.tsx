import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home/Home';
import Layout from './components/Layout';
import ShoppingCart from './pages/ShoppingCart';
import { ProductType } from './type';

export default function App() {
  const [products, setProducts] = useState<ProductType[] | null>(null);

  const handleSubmit = (listProducts: ProductType[]): void => {
    setProducts(listProducts);
  };

  return (
    <Routes>
      <Route path="/" element={ <Layout handleSubmit={ handleSubmit } /> }>
        <Route
          index
          element={
            <Home
              products={ products }
              handleSubmit={ handleSubmit }
            />
          }
        />
        <Route path="/cart" element={ <ShoppingCart /> } />
      </Route>
    </Routes>
  );
}
