import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import { ProductType } from '../type';

type LayoutProps = {
  handleSubmit: (listProducts: ProductType[]) => void
};

export default function Layout({ handleSubmit }: LayoutProps) {
  return (
    <>
      <Header handleSubmit={ handleSubmit } />
      <Outlet />
    </>
  );
}
