import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.scss";
import login from "images/login.png";
import logo_fb from "images/logo_fb_login.png";
import logo_gg from "images/logo_gg_login.png";
import { sendOtpForgotPassword } from "../../services/authService";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(0);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn("Vui lòng nhập email!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warn("Email không hợp lệ!");
      return;
    }

    try {
      const res = await sendOtpForgotPassword(email);
      toast.success(res.message);
      setCountdown(30);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <>
      <div className={styles.container_auth}>
        <div className={styles.container_left}>
          <div className={styles.ctn_form_link}>
            <div className={styles.div_form}>
              <div className={styles.card_form}>
                <h2>QUÊN MẬT KHẨU</h2>

                <form className={styles.form}>
                  <div className={styles.div_input}>
                    <input
                      type="text"
                      placeholder="Email của bạn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      type="submit"
                      className={styles.auth_button}
                      onClick={handleResetPassword}
                      disabled={countdown > 0}
                    >
                      {countdown > 0
                        ? `Gửi lại sau ${countdown}s`
                        : "ĐẶT LẠI MẬT KHẨU"}
                    </button>
                  </div>

                  <p>
                    Quay về{" "}
                    <Link to="/register" className={styles.link_login_regis}>
                      Đăng ký
                    </Link>
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

        <div className={styles.auth_img}>
          <img src={login} alt="Authentication" />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
