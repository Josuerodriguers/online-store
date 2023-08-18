import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home/Home';
import Layout from './components/Layout';
import ShoppingCart from './pages/ShoppingCart';
import { ProductType } from './type';
import ProductDetails from './pages/ProductDetails/ProductDetails';

export default function App() {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (listProducts: ProductType[]): void => {
    setProducts(listProducts);
  };

  const handleLoading = (value: boolean) => {
    setIsLoading(value);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            handleSubmit={ handleSubmit }
            handleLoading={ handleLoading }
          />
          }
      >
        <Route
          index
          element={
            <Home
              isLoading={ isLoading }
              products={ products }
              handleSubmit={ handleSubmit }
            />
          }
        />
        <Route path="/cart" element={ <ShoppingCart /> } />
      </Route>
      <Route path="/product/:id" element={ <ProductDetails /> } />
    </Routes>
  );
}
