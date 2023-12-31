import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import Layout from './components/Layout';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import { ProductType, ProductTypeWithQuantity } from './type';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Checkout from './pages/Checkout/Checkout';

export default function App() {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cartProducts, setCartProducts] = useState<ProductTypeWithQuantity[]>([]);
  const [numberCartItens, setNumberCartItens] = useState(0);

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

  const getLocalStorage = (key: string) => {
    const result = JSON.parse(localStorage.getItem(key) as string);
    return result;
  };

  const handleAddCart = (product: ProductType): void => {
    console.log(product);
    const productFind = findProduct(product);
    if (productFind) {
      const addQuantity = { ...productFind, quantity: productFind.quantity += 1 };
      const removeItem = cartProducts.filter(({ id }) => id !== product.id);
      const newCartProducts = [...removeItem, addQuantity];
      setCartProducts(newCartProducts);
      setLocalStorage(newCartProducts);
    } else {
      const newCartProducts = [
        ...cartProducts, { ...product, quantity: 1 },
      ];
      setCartProducts(newCartProducts);
      setLocalStorage(newCartProducts);
    }
  };

  const handleDelete = (id: string) => {
    const cartRemoveItem = cartProducts.filter((product) => product.id !== id);
    setCartProducts(cartRemoveItem);
    setLocalStorage(cartRemoveItem);
  };

  const addItemCart = (id: string) => {
    const indexItem = cartProducts.findIndex((product) => product.id === id);
    if (indexItem !== -1
      && cartProducts[indexItem].quantity < cartProducts[indexItem].available_quantity
    ) {
      const newCartProducts = cartProducts;
      newCartProducts[indexItem].quantity += 1;
      setCartProducts([...newCartProducts]);
      setLocalStorage([...newCartProducts]);
    }
  };

  const removeItemCart = (id: string) => {
    const indexItem = cartProducts.findIndex((product) => product.id === id);
    if (cartProducts[indexItem].quantity > 1) {
      const newCartProducts = cartProducts;
      newCartProducts[indexItem].quantity -= 1;
      setCartProducts([...newCartProducts]);
      setLocalStorage([...newCartProducts]);
    }
  };

  const clearCart = () => {
    setCartProducts([]);
  };

  useEffect(() => {
    const getCartLocalStorage = () => {
      const resultData = getLocalStorage('cartList');
      if (resultData) {
        setCartProducts(resultData);
        setNumberCartItens(resultData.length);
      }
    };
    getCartLocalStorage();
  }, []);

  useEffect(() => {
    const resultData = getLocalStorage('cartList');
    if (resultData) {
      setNumberCartItens(resultData
        .reduce((acc: number, { quantity }: ProductTypeWithQuantity) => {
          return acc + Number(quantity);
        }, 0));
    }
  }, [cartProducts]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            numberCartItens={ numberCartItens }
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
              handleDelete={ handleDelete }
              addItemCart={ addItemCart }
              removeItemCart={ removeItemCart }
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
            numberCartItens={ numberCartItens }
          />
        }
      />
      <Route
        path="/checkout"
        element={
          <Checkout clearCart={ clearCart } />
        }
      />
    </Routes>
  );
}
