import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.scss";
import login from 'images/login.png'
import logo_fb from 'images/logo_fb_login.png'
import logo_gg from 'images/logo_gg_login.png'

const ForgotPassword = () => {
    const navigate = useNavigate();

    const handleResetPassword = () => {
        navigate("/confirm-password");
    }

  return (
    <>
    <div className={styles.container_auth}>
        <div className={styles.container_left}>
            <div className={styles.ctn_form_link}>
            {/* Cột form */}
                <div className={styles.div_form}>
                    <div className={styles.card_form}>
                        <h2>QUÊN MẬT KHẨU</h2>
                        
                        <form className={styles.form}>
                            <div className={styles.div_input}>
                                <input type="text" placeholder="Email của bạn" />
                                <button className={styles.auth_button} onClick={handleResetPassword}>
                                    ĐẶT LẠI MẬT KHẨU
                                </button>
                            </div>                           
                            
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
    </>
  );
};

export default ForgotPassword;
