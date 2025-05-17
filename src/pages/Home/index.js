import React from "react";
//import className và scss
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import NavLeft from "../../components/NavLeft";
import MyProfile from "../../components/MyProfile";

const cx = classNames.bind(styles);

const Home = () => {
  return (
    <>
    <div className={cx("wrapper-home")}>
      <h2>My Home</h2>
      <div className={cx("container")}>
        <NavLeft />
        <MyProfile />
      </div>
    </div>
    </>
  );
};

export default Home;
