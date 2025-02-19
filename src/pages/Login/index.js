import React from "react";
//import className và scss
import classNames from "classnames/bind";
import styles from "./Login.module.scss";

const cx = classNames.bind(styles);

const Login = () => {
  return <div className={cx("wrapper-Login")}>My Login</div>;
};

export default Login;
