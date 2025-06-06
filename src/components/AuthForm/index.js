// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import styles from "./AuthForm.module.scss";
// import loginImage from 'images/login.png'
// import { FaEye, FaEyeSlash} from "react-icons/fa";
// import logo_fb from 'images/logo_fb_login.png'
// import logo_gg from 'images/logo_gg_login.png'
// import { jwtDecode } from "jwt-decode";
// import { toast } from "react-toastify";
// import { login } from "../../services/authService";
// import { useDispatch } from "react-redux";
// import { loginUser } from "../../redux/userSlice";
// import { useForm } from "react-hook-form";


// const AuthForm = ({ type }) => {
//   const isLogin = type === "login";
//   const [useEmail, setUseEmail] = useState(true);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const location = useLocation();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const onSubmit = async (data) => {
//     try {
//       const response = await login(data);
//       if (response && response.token.accessToken) {
//         const token = response.token.accessToken;
//         const decodedToken = jwtDecode(token);

//         const user = {
//           token,
//           id: decodedToken[
//             "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
//           ],
//           username:
//             decodedToken[
//               "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
//             ],
//           email:
//             decodedToken[
//               "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
//             ],
//           role: decodedToken[
//             "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
//           ],
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
//       } else {
//         toast.error("Đăng nhập thất bại! Kiểm tra lại thông tin đăng nhập.");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Thông tin đăng nhập không đúng!");
//     }
//   };



//   return (
//     <div className={styles.container_auth}>
//         <div className={styles.container_left}>
//             <div className={styles.ctn_form_link}>
//             {/* Cột form */}
//                 <div className={styles.div_form}>
//                     <div className={styles.card_form}>
//                         <h2>{isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}</h2>
//                         <div className={styles.div_toggle_email_sdt}>
//                             <span className={styles.active}></span>
//                             <span></span>
//                         </div>
                        
//                         <form className={styles.form}>
//                             <div className={styles.div_input}>

//                             <input type="email" placeholder="Email của bạn" />

//                             {!isLogin && <input type="tel" placeholder="Số điện thoại của bạn" />}

//                             {!isLogin && <input type="text" placeholder="User name" />}

//                             <div className={styles.passwordWrapper}>
//                                 <input
//                                 type={passwordVisible ? "text" : "password"}
//                                 placeholder="Mật khẩu"
//                                 />
//                                 <span
//                                 className={styles.eyeIcon}
//                                 onClick={() => setPasswordVisible(!passwordVisible)}
//                                 >
//                                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//                                 </span>
//                             </div>
                            
//                             {!isLogin && (
//                                 <div className={styles.passwordWrapper}>
//                                 <input
//                                 type={confirmPasswordVisible ? "text" : "password"}
//                                 placeholder="Xác nhận mật khẩu"
//                                 />
//                                 <span
//                                 className={styles.eyeIcon}
//                                 onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
//                                 >
//                                 {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
//                                 </span>
//                             </div>
//                             )}
//                             </div>
//                             <div className={styles.auth_options}>
//                                 <label>
//                                 <input type="checkbox" /> <span>Ghi nhớ mật khẩu</span>
//                                 </label>
//                                 <Link to="/forgot-password">Quên mật khẩu?</Link>
//                             </div>
                            
//                             <button className={styles.auth_button}>
//                                 {isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
//                             </button>
//                             <p>
//                                 {!isLogin ? (
//                                     <>
//                                     Bạn có tài khoản?{" "}
//                                     <Link to="/login" className={styles.link_login_regis}>Đăng nhập</Link>
//                                     </>
//                                 ) : (
//                                     <>
//                                     Bạn chưa có tài khoản?{" "}
//                                     <Link to="/register" className={styles.link_login_regis}>Đăng ký</Link>
//                                     </>
//                                 )}
//                             </p>
                            
//                             <div className={styles.social_login}>
//                                 <p>Hoặc đăng nhập với</p>
//                                 <div className={styles.social_icons}>
//                                     <img src={logo_fb} alt="FB" />
//                                     <img src={logo_gg} alt="GG" />
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//         </div>

//         <div className={styles.div_link}>
//             <Link
//                 to="/login"
//                 className={`${styles.login} ${location.pathname === "/login" ? styles.active : ""}`}
//             >
//                 ĐĂNG NHẬP
//             </Link>
//             <Link
//                 to="/register"
//                 className={`${styles.register} ${location.pathname === "/register" ? styles.active : ""}`}
//             >
//                 ĐĂNG KÝ
//             </Link>
//         </div>
//       </div>

//         {/* Cột img */}
//       <div className={styles.auth_img}>
//         <img src={loginImage} alt="Authentication" />
//       </div>
//     </div>
//   );
// };

// export default AuthForm;



/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import { login } from "../../services/authService";
import styles from "./AuthForm.module.scss";
import loginImage from 'images/login.png';
import logo_fb from 'images/logo_fb_login.png';
import logo_gg from 'images/logo_gg_login.png';

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
  } = useForm();

  const onSubmit = async (data) => {
    if (isLogin) {
      try {
        const response = await login(data);
        if (response && response.token.accessToken) {
          const token = response.token.accessToken;
          const decodedToken = jwtDecode(token);

          const user = {
            token,
            id: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
            username: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
            email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
            role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
          };

          dispatch(loginUser({ user }));
          toast.success("Đăng nhập thành công!");

          if (user.role === "Admin") {
            navigate("/admin/users");
          } else if (user.role === "Staff") {
            navigate("/staff/orders");
          } else if (user.role === "Shipper") {
            navigate("/shipper/orders-assign");
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
      // Handle registration logic here (not implemented in the provided Login component)
      toast.error("Chức năng đăng ký chưa được triển khai!");
    }
  };

  return (
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

                  {!isLogin && (
                    <>
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
                      {...register("password", {
                        required: "Mật khẩu không được để trống",
                        minLength: {
                          value: 4,
                          message: "Mật khẩu phải có ít nhất 4 ký tự",
                        },
                      })}
                      className={errors.password ? styles.input_error : ""}
                    />
                    <span
                      className={styles.eyeIcon}
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.password && (
                    <p className={styles.error}>{errors.password.message}</p>
                  )}

                  {!isLogin && (
                    <div className={styles.passwordWrapper}>
                      <input
                        type={confirmPasswordVisible ? "text" : "password"}
                        placeholder="Xác nhận mật khẩu"
                        {...register("confirmPassword", {
                          required: "Vui lòng xác nhận mật khẩu",
                          validate: (value, { password }) =>
                            value === password || "Mật khẩu xác nhận không khớp",
                        })}
                        className={errors.confirmPassword ? styles.input_error : ""}
                      />
                      <span
                        className={styles.eyeIcon}
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                      >
                        {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  )}
                  {errors.confirmPassword && (
                    <p className={styles.error}>{errors.confirmPassword.message}</p>
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
                  <div className={styles.social_login}>
                    <p>Hoặc đăng nhập với</p>
                    <div className={styles.social_icons}>
                      <img src={logo_fb} alt="Facebook Login" />
                      <img src={logo_gg} alt="Google Login" />
                    </div>
                  </div>
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
  );
};

export default AuthForm;
