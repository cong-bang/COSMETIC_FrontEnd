import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import {
  login,
  registerUser,
  handleGoogleLogin,
} from "../../services/authService";
import styles from "./AuthForm.module.scss";
import loginImage from "images/login.png";
import logo_fb from "images/logo_fb_login.png";
import logo_gg from "images/logo_gg_login.png";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID =
  "749101402068-0jv96otqmnla2k4dgbs0pgo8e9hkaq5d.apps.googleusercontent.com";

const AuthForm = ({ type }) => {
  const [currentTab, setCurrentTab] = useState(type || "login");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    setCurrentTab(type || "login");
  }, [type]);

  const onSubmit = async (data) => {
    if (currentTab === "login") {
      try {
        const response = await login({
          email: data.email,
          passWord: data.passWord,
        });
        if (response && response.data.accessToken) {
          // Check isActive status
          if (response.data.isActive === 0) {
            toast.error("Vui lòng xác nhận tài khoản của bạn qua email");
            return;
          }

          const token = response.data.accessToken;
          const refreshToken = response.data.refreshToken;
          const decodedToken = jwtDecode(token);

          const user = {
            token,
            refreshToken,
            id: decodedToken.UserId,
            username:
              decodedToken[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
              ],
            email:
              decodedToken[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
              ],
            role: decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ],
          };

          dispatch(loginUser({ user }));
          toast.success("Đăng nhập thành công!");

          if (user.role === "ADMIN") {
            navigate("/admin");
          } else if (user.role === "STAFF") {
            navigate("/");
          } else {
            navigate("/");
          }
        } else {
          toast.error("Đăng nhập thất bại! Kiểm tra lại thông tin đăng nhập.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Thông tin đăng nhập không đúng!");
      }
    } else {
      try {
        const registerData = {
          userName: data.username,
          passWord: data.passWord,
          email: data.email,
          confirmPassWord: data.confirmPassWord,
          phoneNumber: data.phone,
        };
        const response = await registerUser(registerData);
        if (response) {
          toast.success(
            "Đăng ký thành công! Vui lòng xác nhận tài khoản qua email."
          );
          navigate("/login");
        } else {
          toast.error("Đăng ký thất bại! Vui lòng thử lại.");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Đăng ký thất bại!");
      }
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        const user = {
          token,
          id: decoded.UserId,
          username:
            decoded[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ],
          email:
            decoded[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ],
          role: decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ],
        };

        dispatch(loginUser({ user }));
        toast.success("Đăng nhập Google thành công!");

        // Xóa token khỏi URL
        navigate(location.pathname, { replace: true });

        if (user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Token không hợp lệ", err);
        toast.error("Token không hợp lệ!");
      }
    }
  }, [location.search, dispatch, navigate, location.pathname]);

  return (
    <>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <div className={styles.container_auth}>
          {/* Beautiful floating elements */}
          <div className={`${styles.floating_element} ${styles.element1}`}>
            🌸
          </div>
          <div className={`${styles.floating_element} ${styles.element2}`}>
            💫
          </div>
          <div className={`${styles.floating_element} ${styles.element3}`}>
            ✨
          </div>
          <div className={`${styles.floating_element} ${styles.element4}`}>
            🦋
          </div>
          <div className={`${styles.floating_element} ${styles.element5}`}>
            🌺
          </div>

          <div className={styles.auth_container}>
            <div className={styles.auth_header}>
              <div className={styles.brand_logo}>
                <div className={styles.logo_text}>PURE</div>
                <div className={styles.logo_subtitle}>COSMETIC</div>
              </div>
              <h2>
                {currentTab === "login" ? "Chào mừng trở lại" : "Tạo tài khoản"}
              </h2>
              <p className={styles.subtitle}>
                {currentTab === "login"
                  ? "Đăng nhập để khám phá bộ sưu tập mỹ phẩm cao cấp của Pure"
                  : "Tham gia Pure để trải nghiệm các sản phẩm làm đẹp tuyệt vời"}
              </p>

              <div className={styles.auth_tabs}>
                <button
                  className={`${styles.tab_button} ${
                    currentTab === "login" ? styles.active : ""
                  }`}
                  onClick={() => {
                    setCurrentTab("login");
                    navigate("/login");
                  }}
                >
                  Đăng nhập
                </button>
                <button
                  className={`${styles.tab_button} ${
                    currentTab === "register" ? styles.active : ""
                  }`}
                  onClick={() => {
                    setCurrentTab("register");
                    navigate("/register");
                  }}
                >
                  Đăng ký
                </button>
              </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.form_group}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  {...register("email", {
                    required: "Email không được để trống",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Email không hợp lệ",
                    },
                  })}
                  className={errors.email ? styles.input_error : ""}
                />
                {errors.email && (
                  <div className={styles.error_message}>
                    ⚠️ {errors.email.message}
                  </div>
                )}
              </div>

              {currentTab === "register" && (
                <>
                  <div className={styles.form_group}>
                    <label>Tên đăng nhập</label>
                    <input
                      type="text"
                      placeholder="Nhập tên đăng nhập"
                      {...register("username", {
                        required: "Tên đăng nhập không được để trống",
                        minLength: {
                          value: 4,
                          message: "Tên đăng nhập phải từ 4 ký tự",
                        },
                      })}
                      className={errors.username ? styles.input_error : ""}
                    />
                    {errors.username && (
                      <div className={styles.error_message}>
                        ⚠️ {errors.username.message}
                      </div>
                    )}
                  </div>

                  <div className={styles.form_group}>
                    <label>Số điện thoại</label>
                    <input
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      {...register("phone", {
                        required: "Số điện thoại không được để trống",
                        pattern: {
                          value: /^[0-9]{10,}$/,
                          message: "Số điện thoại không hợp lệ",
                        },
                      })}
                      className={errors.phone ? styles.input_error : ""}
                    />
                    {errors.phone && (
                      <div className={styles.error_message}>
                        ⚠️ {errors.phone.message}
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className={styles.form_group}>
                <label>Mật khẩu</label>
                <div className={styles.password_wrapper}>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    {...register("passWord", {
                      required: "Mật khẩu không được để trống",
                      minLength: {
                        value: 4,
                        message: "Mật khẩu phải có ít nhất 4 ký tự",
                      },
                    })}
                    className={errors.passWord ? styles.input_error : ""}
                  />
                  <span
                    className={styles.eye_icon}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.passWord && (
                  <div className={styles.error_message}>
                    ⚠️ {errors.passWord.message}
                  </div>
                )}
              </div>

              {currentTab === "register" && (
                <div className={styles.form_group}>
                  <label>Xác nhận mật khẩu</label>
                  <div className={styles.password_wrapper}>
                    <input
                      type={confirmPasswordVisible ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu"
                      {...register("confirmPassWord", {
                        required: "Vui lòng xác nhận mật khẩu",
                        validate: (value) =>
                          value === getValues("passWord") ||
                          "Mật khẩu xác nhận không khớp",
                      })}
                      className={
                        errors.confirmPassWord ? styles.input_error : ""
                      }
                    />
                    <span
                      className={styles.eye_icon}
                      onClick={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                    >
                      {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.confirmPassWord && (
                    <div className={styles.error_message}>
                      ⚠️ {errors.confirmPassWord.message}
                    </div>
                  )}
                </div>
              )}

              <div className={styles.form_options}>
                <label className={styles.remember_me}>
                  <input type="checkbox" />
                  <span>Ghi nhớ mật khẩu</span>
                </label>
                {currentTab === "login" && (
                  <Link to="/reset-password" className={styles.forgot_password}>
                    Quên mật khẩu?
                  </Link>
                )}
              </div>

              <button className={styles.submit_button} type="submit">
                {currentTab === "login" ? "Đăng nhập ngay" : "Tạo tài khoản"}
              </button>

              {currentTab === "login" && (
                <div className={styles.social_login}>
                  <div className={styles.divider}>
                    <span>Hoặc đăng nhập với</span>
                  </div>
                  <div className={styles.social_buttons}>
                    <div
                      className={`${styles.social_button} ${styles.facebook}`}
                    >
                      <img src={logo_fb} alt="Facebook" />
                    </div>
                    <div
                      className={`${styles.social_button} ${styles.google}`}
                      onClick={handleGoogleLogin}
                    >
                      <img src={logo_gg} alt="Google" />
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.auth_switch}>
                {currentTab === "login" ? (
                  <>
                    Bạn chưa có tài khoản?
                    <Link to="/register" className={styles.switch_link}>
                      Đăng ký ngay
                    </Link>
                  </>
                ) : (
                  <>
                    Bạn đã có tài khoản?
                    <Link to="/login" className={styles.switch_link}>
                      Đăng nhập
                    </Link>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
};

export default AuthForm;
