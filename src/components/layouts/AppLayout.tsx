import type { FC } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const AppLayout: FC = () => {
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
