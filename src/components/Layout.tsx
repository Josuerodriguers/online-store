import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import { ProductType } from '../type';

type LayoutProps = {
  handleSubmit: (listProducts: ProductType[]) => void;
  handleLoading: (value: boolean) => void;
};

export default function Layout({ handleSubmit, handleLoading }: LayoutProps) {
  return (
    <>
      <Header handleSubmit={ handleSubmit } handleLoading={ handleLoading } />
      <Outlet />
    </>
  );
}
