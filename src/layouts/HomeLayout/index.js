import React from 'react';
import styles from './HomeLayout.module.scss';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const HomeLayout = () => {
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
