import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home/Home';
import Layout from './components/Layout';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import { ProductType, ProductTypeWithQuantity } from './type';
import ProductDetails from './pages/ProductDetails/ProductDetails';

export default function App() {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cartProducts, setCartProducts] = useState<ProductTypeWithQuantity[]>([]);

  const handleSubmit = (listProducts: ProductType[]): void => {
    setProducts(listProducts);
  };

  const handleLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const findProduct = ({ id }: ProductType) => cartProducts
    .find((product) => product.id === id);

  const setLocalStorage = (cartList: ProductTypeWithQuantity[]) => {
    localStorage.setItem('cartList', JSON.stringify(cartList));
  };

  const handleAddCart = (product: ProductType): void => {
    const productFind = findProduct(product);
    if (productFind) {
      console.log('entrei');
      const addQuantity = { ...productFind, quantity: productFind.quantity += 1 };
      const removeItem = cartProducts.filter(({ id }) => id !== product.id);
      setCartProducts([...removeItem, addQuantity]);
    } else {
      setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
    }
    setLocalStorage(cartProducts);
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
              handleAddCart={ handleAddCart }
              isLoading={ isLoading }
              products={ products }
              handleSubmit={ handleSubmit }
              handleLoading={ handleLoading }
            />
          }
        />
        <Route
          path="/cart"
          element={
            <ShoppingCart
              cartProducts={ cartProducts }
            />
          }
        />
      </Route>
      <Route
        path="/product/:id"
        element={
          <ProductDetails
            handleAddCart={ handleAddCart }
          />
        }
      />
    </Routes>
  );
}
