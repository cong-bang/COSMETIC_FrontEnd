import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import { googleAuth, login, registerUser, handleGoogleLogin} from "../../services/authService";
import styles from "./AuthForm.module.scss";
import loginImage from 'images/login.png';
import logo_fb from 'images/logo_fb_login.png';
import logo_gg from 'images/logo_gg_login.png';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const CLIENT_ID =
  "749101402068-0jv96otqmnla2k4dgbs0pgo8e9hkaq5d.apps.googleusercontent.com";

const AuthForm = ({ type }) => {
  const isLogin = type === "login";
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

  const onSubmit = async (data) => {
    if (isLogin) {
      try {
        const response = await login({ email: data.email, passWord: data.passWord });
        if (response && response.data.accessToken) {
          // Check isActive status
          if (response.data.isActive === 0) {
            toast.error("Vui lòng xác nhận tài khoản của bạn qua email");
            return;
          }

          const token = response.data.accessToken;
          const decodedToken = jwtDecode(token);

          const user = {
            token,
            id: decodedToken.UserId,
            username: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
            email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
            role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
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
        if (response && response.data) {
          toast.success("Đăng ký thành công! Vui lòng xác nhận tài khoản qua email.");
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

  //   const handleGoogleSuccess = async (credentialResponse) => {
  //   try {
  //     const idToken = credentialResponse.credential;
  //     const response = await googleAuth(idToken);

  //     if (response && response.token && response.token.accessToken) {
  //       const token = response.token.accessToken;
  //       const decodedToken = jwtDecode(token);
  //       const user = {
  //           token,
  //           id: decodedToken.UserId,
  //           username: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
  //           email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
  //           role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
  //         };

  //         dispatch(loginUser({ user }));
  //         toast.success("Đăng nhập thành công!");

  //         if (user.role === "ADMIN") {
  //           navigate("/admin");
  //         } else if (user.role === "STAFF") {
  //           navigate("/");
  //         } else {
  //           navigate("/");
  //         }

  //       dispatch(loginUser({ user }));
  //       toast.success("Đăng nhập với Google thành công!");

  //     } else {
  //       toast.error("Đăng nhập với Google thất bại!");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Đăng nhập với Google thất bại!");
  //   }
  // };

   useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        const user = {
          token,
          id: decoded.UserId,
          username: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
          email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
          role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
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
  }, [location.search]);
  
  const handleGoogleError = () => {
    toast.error("Đăng nhập với Google thất bại!");
  };

  //Login với Google:
  // const loginGoogle = useGoogleLogin({
  //   onSuccess: (response) => handleGoogleSuccess(response),
  //   onError: () => handleGoogleError(),
  // });


  return (
    <>
    <GoogleOAuthProvider clientId={CLIENT_ID}>

    <div className={styles.container_auth}>
      <div className={styles.container_left}>
        <div className={styles.ctn_form_link}>
          {/* Cột form */}
          <div className={styles.div_form}>
            <div className={styles.card_form}>
              <h2>{isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}</h2>
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.div_input}>
                  <input
                    type="email"
                    placeholder="Email của bạn"
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
                    <p className={styles.error}>{errors.email.message}</p>
                  )}

                  {!isLogin && (
                    <>
                      <input
                        type="text"
                        placeholder="Tên đăng nhập"
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
                        <p className={styles.error}>{errors.username.message}</p>
                      )}

                      <input
                        type="tel"
                        placeholder="Số điện thoại của bạn"
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
                        <p className={styles.error}>{errors.phone.message}</p>
                      )}
                    </>
                  )}

                  <div className={styles.passwordWrapper}>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Mật khẩu"
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
                      className={styles.eyeIcon}
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.passWord && (
                    <p className={styles.error}>{errors.passWord.message}</p>
                  )}

                  {!isLogin && (
                    <div className={styles.passwordWrapper}>
                      <input
                        type={confirmPasswordVisible ? "text" : "password"}
                        placeholder="Xác nhận mật khẩu"
                        {...register("confirmPassWord", {
                          required: "Vui lòng xác nhận mật khẩu",
                          validate: (value) =>
                            value === getValues("passWord") || "Mật khẩu xác nhận không khớp",
                        })}
                        className={errors.confirmPassWord ? styles.input_error : ""}
                      />
                      <span
                        className={styles.eyeIcon}
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                      >
                        {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  )}
                  {errors.confirmPassWord && (
                    <p className={styles.error}>{errors.confirmPassWord.message}</p>
                  )}
                </div>

                <div className={styles.auth_options}>
                  <label>
                    <input type="checkbox" /> <span>Ghi nhớ mật khẩu</span>
                  </label>
                  {isLogin && (
                    <Link to="/forgot-password">Quên mật khẩu?</Link>
                  )}
                </div>

                <button className={styles.auth_button} type="submit">
                  {isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
                </button>

                {isLogin && (
                  <>
                  <div className={styles.social_login}>
                    <p>Hoặc đăng nhập với</p>
                    <div className={styles.social_icons}>
                      <img src={logo_fb} alt="Facebook Login" />
                      <img src={logo_gg} alt="Google Login" onClick={handleGoogleLogin}/>
                    </div>
                  </div>
                  <div className={styles.login_gg}>
                    {/* <GoogleLogin
                      clientId={CLIENT_ID}
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      theme="outline"
                      size="large"
                    /> */}

                  </div>
                  </>
                )}

                <p>
                  {isLogin ? (
                    <>
                      Bạn chưa có tài khoản?{" "}
                      <Link to="/register" className={styles.link_login_regis}>
                        Đăng ký
                      </Link>
                    </>
                  ) : (
                    <>
                      Bạn có tài khoản?{" "}
                      <Link to="/login" className={styles.link_login_regis}>
                        Đăng nhập
                      </Link>
                    </>
                  )}
                </p>
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
        <img src={loginImage} alt="Authentication" />
      </div>
    </div>
    </GoogleOAuthProvider>
  </>
  );
};

export default AuthForm;