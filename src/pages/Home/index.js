import React from "react";
//import className và scss
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

const Home = () => {
  return (
    <>
    <div className={cx("wrapper-home")}>
      <h2>My Home</h2>
    </div>
    </>
  );
};

export default Home;
