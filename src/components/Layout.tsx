import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import { ProductType } from '../type';

type LayoutProps = {
  handleSubmit: (listProducts: ProductType[]) => void;
  handleLoading: (value: boolean) => void;
  numberCartItens: number;
};

export default function Layout({
  handleSubmit,
  handleLoading,
  numberCartItens,
}: LayoutProps) {
  return (
    <>
      <Header
        numberCartItens={ numberCartItens }
        handleSubmit={ handleSubmit }
        handleLoading={ handleLoading }
      />
      <Outlet />
    </>
  );
}
