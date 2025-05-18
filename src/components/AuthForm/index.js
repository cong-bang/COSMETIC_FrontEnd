import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./AuthForm.module.scss";
import login from 'images/login.png'
import { FaEye, FaEyeSlash} from "react-icons/fa";
import logo_fb from 'images/logo_fb_login.png'
import logo_gg from 'images/logo_gg_login.png'

const AuthForm = ({ type }) => {
  const isLogin = type === "login";
  const [useEmail, setUseEmail] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const location = useLocation();

  return (
    <div className={styles.container_auth}>
        <div className={styles.container_left}>
            <div className={styles.ctn_form_link}>
            {/* Cột form */}
                <div className={styles.div_form}>
                    <div className={styles.card_form}>
                        <h2>{isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}</h2>
                        <div className={styles.div_toggle_email_sdt}>
                            <span className={styles.active}></span>
                            <span></span>
                        </div>
                        
                        <form className={styles.form}>
                            <div className={styles.div_input}>

                            <input type="email" placeholder="Email của bạn" />

                            {!isLogin && <input type="tel" placeholder="Số điện thoại của bạn" />}

                            {!isLogin && <input type="text" placeholder="User name" />}

                            <div className={styles.passwordWrapper}>
                                <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Mật khẩu"
                                />
                                <span
                                className={styles.eyeIcon}
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                >
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            
                            {!isLogin && (
                                <div className={styles.passwordWrapper}>
                                <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                placeholder="Xác nhận mật khẩu"
                                />
                                <span
                                className={styles.eyeIcon}
                                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                >
                                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            )}
                            </div>
                            <div className={styles.auth_options}>
                                <label>
                                <input type="checkbox" /> <span>Ghi nhớ mật khẩu</span>
                                </label>
                                <Link to="/forgot-password">Quên mật khẩu?</Link>
                            </div>
                            
                            <button className={styles.auth_button}>
                                {isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
                            </button>
                            <p>
                                {!isLogin ? (
                                    <>
                                    Bạn có tài khoản?{" "}
                                    <Link to="/login" className={styles.link_login_regis}>Đăng nhập</Link>
                                    </>
                                ) : (
                                    <>
                                    Bạn chưa có tài khoản?{" "}
                                    <Link to="/register" className={styles.link_login_regis}>Đăng ký</Link>
                                    </>
                                )}
                            </p>
                            
                            <div className={styles.social_login}>
                                <p>Hoặc đăng nhập với</p>
                                <div className={styles.social_icons}>
                                    <img src={logo_fb} alt="FB" />
                                    <img src={logo_gg} alt="GG" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
        </div>

        <div className={styles.div_link}>
            <Link
                to="/login"
                className={`${styles.login} ${location.pathname === "/login" ? styles.active : ""}`}
            >
                ĐĂNG NHẬP
            </Link>
            <Link
                to="/register"
                className={`${styles.register} ${location.pathname === "/register" ? styles.active : ""}`}
            >
                ĐĂNG KÝ
            </Link>
        </div>
      </div>

        {/* Cột img */}
      <div className={styles.auth_img}>
        <img src={login} alt="Authentication" />
      </div>
    </div>
  );
};

export default AuthForm;
