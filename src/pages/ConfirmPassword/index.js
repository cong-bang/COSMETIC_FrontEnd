import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ConfirmPassword.module.scss";
import login from 'images/login.png'
import logo_fb from 'images/logo_fb_login.png'
import logo_gg from 'images/logo_gg_login.png'
import Header from "components/Layout/Header"
import Footer from "components/Layout/Footer"
import { FaEye, FaEyeSlash} from "react-icons/fa";

const ConfirmPassword = () => {
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <>
    <Header />
    <div className={styles.container_auth}>
        <div className={styles.container_left}>
            <div className={styles.ctn_form_link}>
            {/* Cột form */}
                <div className={styles.div_form}>
                    <div className={styles.card_form}>
                        <h2>XÁC NHẬN MẬT KHẨU</h2>
                        
                        <form className={styles.form}>
                            <div className={styles.div_input}>
                                <div className={styles.passwordWrapper}>
                                    <input
                                        type={newPasswordVisible ? "text" : "password"}
                                        placeholder="Tạo mật khẩu mới"
                                    />
                                    <span
                                        className={styles.eyeIcon}
                                        onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                                    >
                                    {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                <div className={styles.passwordWrapper}>
                                    <input
                                        type={confirmPasswordVisible ? "text" : "password"}
                                        placeholder="Xác nhận lại mật khẩu"
                                    />
                                    <span
                                        className={styles.eyeIcon}
                                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                    >
                                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                <p>Sử dụng ít nhất 8 kí tự</p>
                            </div>        

                            <div className={styles.auth_options}>
                                <label>
                                <input type="checkbox" /> <span>Ghi nhớ mật khẩu</span>
                                </label>
                                <Link to="/forgot-password">Quên mật khẩu?</Link>
                            </div>  

                            <button className={styles.auth_button}>
                                KIỂM TRA
                            </button>                 
                            
                            <p>                              
                                Quay về{" "}
                                <Link to="/register" className={styles.link_login_regis}>Đăng ký</Link>                                  
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
      </div>

        {/* Cột img */}
      <div className={styles.auth_img}>
        <img src={login} alt="Authentication" />
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ConfirmPassword;
