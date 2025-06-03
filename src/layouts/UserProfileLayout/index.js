import React from 'react';
import NavLeft from '../../components/NavLeft';
import styles from './UserProfileLayout.module.scss';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const UserProfileLayout = () => {
  return (
    <>
    <Header />
    <div className={styles.user_layout}>
      <NavLeft />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
    <Footer />
    </>
  );
};

export default UserProfileLayout;
