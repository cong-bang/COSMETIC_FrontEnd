import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./ConfirmPassword.module.scss";
import login from "images/login.png";
import logo_fb from "images/logo_fb_login.png";
import logo_gg from "images/logo_gg_login.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sendResetForgotPassword } from "../../services/authService";
import { toast } from "react-toastify";

const ConfirmPassword = () => {
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Lấy token từ URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleConfirmPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.warn("Vui lòng nhập đầy đủ mật khẩu!");
      return;
    }

    if (newPassword.length < 8) {
      toast.warn("Mật khẩu phải có ít nhất 8 ký tự!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warn("Mật khẩu xác nhận không khớp!");
      return;
    }

    const data = {
      token: token,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    consolo.log(data);

    try {
      const res = await sendResetForgotPassword(data);
      console.log("Reset password thành công:", res);
      toast.success(res.message);
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className={styles.container_auth}>
        <div className={styles.container_left}>
          <div className={styles.ctn_form_link}>
            <div className={styles.div_form}>
              <div className={styles.card_form}>
                <h2>XÁC NHẬN MẬT KHẨU</h2>

                <form className={styles.form}>
                  <div className={styles.div_input}>
                    <div className={styles.passwordWrapper}>
                      <input
                        type={newPasswordVisible ? "text" : "password"}
                        placeholder="Tạo mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <span
                        className={styles.eyeIcon}
                        onClick={() =>
                          setNewPasswordVisible(!newPasswordVisible)
                        }
                      >
                        {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>

                    <div className={styles.passwordWrapper}>
                      <input
                        type={confirmPasswordVisible ? "text" : "password"}
                        placeholder="Xác nhận lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <span
                        className={styles.eyeIcon}
                        onClick={() =>
                          setConfirmPasswordVisible(!confirmPasswordVisible)
                        }
                      >
                        {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>

                    <p>Sử dụng ít nhất 8 kí tự</p>
                  </div>

                  <button
                    type="submit"
                    className={styles.auth_button}
                    onClick={handleConfirmPassword}
                  >
                    KIỂM TRA
                  </button>

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

export default ConfirmPassword;
