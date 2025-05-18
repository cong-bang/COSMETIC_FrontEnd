import React from "react";
//import className và scss
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import NavLeft from "../../components/NavLeft";
import MyProfile from "../../components/MyProfile";
import PaymentCard from "../../components/PaymentCard";
import Address from "../../components/Address";
import ChangePassword from "../../components/ChangePassword";
import Wishlist from "../../components/Wishlist";

const cx = classNames.bind(styles);

const Home = () => {
  return (
    <>
    <div className={cx("wrapper-home")}>
      <h2>My Home</h2>
      <div className={cx("container")}>
        <NavLeft />
        <Wishlist />
      </div>
    </div>
    </>
  );
};

export default Home;
