import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.scss";
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
    <div className={styles.auth_wrapper}>
      {/* Floating cosmetic elements */}
      <div
        className={styles.floating_element}
        style={{ top: "10%", left: "5%" }}
      >
        💄
      </div>
      <div
        className={styles.floating_element}
        style={{ top: "20%", right: "10%" }}
      >
        💋
      </div>
      <div
        className={styles.floating_element}
        style={{ bottom: "30%", left: "8%" }}
      >
        ✨
      </div>
      <div
        className={styles.floating_element}
        style={{ bottom: "15%", right: "15%" }}
      >
        🌸
      </div>
      <div
        className={styles.floating_element}
        style={{ top: "60%", left: "3%" }}
      >
        💅
      </div>
      <div
        className={styles.floating_element}
        style={{ top: "40%", right: "5%" }}
      >
        🎀
      </div>

      <div className={styles.auth_container}>
        <div className={styles.auth_header}>
          <div className={styles.brand_logo}>PURE COSMETIC</div>
          <h2>Quên mật khẩu?</h2>
          <p>Nhập email để khôi phục mật khẩu của bạn</p>
        </div>

        <form className={styles.auth_form} onSubmit={handleResetPassword}>
          <div className={styles.form_group}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={styles.submit_button}
            disabled={countdown > 0}
          >
            {countdown > 0 ? `Gửi lại sau ${countdown}s` : "Gửi mã khôi phục"}
          </button>

          <div className={styles.auth_switch}>
            <p>
              Nhớ mật khẩu? <Link to="/login">Đăng nhập</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
