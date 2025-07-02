import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./NavLeft.module.scss";
import male_user from "images/user/male_user.png";
import photograph_icon from "images/photograph_icon.png";
import shopping_bag_icon from "images/shopping_bag_icon.png";
import bell_icon from "images/bell_icon.png";
import ticket_icon from "images/ticket_icon.png";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { getUserById, uploadAvatar } from "../../services/userService";

const NavLeft = () => {
  const navigate = useNavigate();
  const userFromLocal = useSelector((state) => state.user.user);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (userFromLocal != null) {
      const fetchUserDetail = async () => {
        try {
          const response = await getUserById(userFromLocal.id);
          setUser(response.data);
        } catch (error) {
          toast.error(error);
          toast.error("Lấy thông tin người dùng thất bại!");
        }
      };
      fetchUserDetail();
    }
  }, [userFromLocal]);

  //handle upload avatar
  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await uploadAvatar(file);
      toast.success(res.message);

      setUser((prev) => ({
        ...prev,
        avatar: res.data.avatar,
      }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Đăng xuất thành công!");
    navigate("/");
  };

  return (
    <>
      <div className={styles.nav_left}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <img src={user.avatar || male_user} alt="avatar" />
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadAvatar}
              className={styles.uploadInput}
            />
          </div>
          <div className={styles.info}>
            <h3>{userFromLocal.username}</h3>
            <div className={styles.status}>Online</div>
          </div>
        </div>

        <div className={styles.nav_section}>
          <h4>Tài khoản của tôi</h4>
          <div className={styles.account_menu}>
            <NavLink
              state={{ user }}
              to="/my-profile"
              className={({ isActive }) =>
                isActive ? styles.active : styles.checkbox_empty
              }
            >
              Hồ sơ
            </NavLink>
            <NavLink
              state={{ user }}
              to="/paymentcard"
              className={({ isActive }) =>
                isActive ? styles.active : styles.checkbox_empty
              }
            >
              Thanh toán
            </NavLink>
            <NavLink
              state={{ user }}
              to="/address"
              className={({ isActive }) =>
                isActive ? styles.active : styles.checkbox_empty
              }
            >
              Địa chỉ
            </NavLink>
            <NavLink
              state={{ user }}
              to="/change-password"
              className={({ isActive }) =>
                isActive ? styles.active : styles.checkbox_empty
              }
            >
              Đổi mật khẩu
            </NavLink>
          </div>
        </div>

        <div className={styles.button_group}>
          <NavLink
            state={{ user }}
            to="/wishlist"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <img src={photograph_icon} alt="Wishlist icon" />
            Wishlist
          </NavLink>
          <NavLink
            state={{ user }}
            to="/my-order"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <img src={shopping_bag_icon} alt="Đơn hàng icon" />
            Đơn hàng
          </NavLink>
          <NavLink
            state={{ user }}
            to="/notifications"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <img src={bell_icon} alt="Thông báo icon" />
            Thông báo
          </NavLink>
          <NavLink
            state={{ user }}
            to="/my-voucher"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <img src={ticket_icon} alt="Voucher icon" />
            Voucher
          </NavLink>
          <NavLink to="/" onClick={handleLogout}>
            <FiLogOut size={20} />
            Logout
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NavLeft;
