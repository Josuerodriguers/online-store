import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../components/Layout';
import ShoppingCart from '../pages/ShoppingCart';

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Home /> } />
        <Route path="/cart" element={ <ShoppingCart /> } />
      </Route>
    </Routes>
  );
}
