import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavLeft.module.scss';
import user from 'images/user.png';
import photograph_icon from 'images/photograph_icon.png';
import shopping_bag_icon from 'images/shopping_bag_icon.png';
import bell_icon from 'images/bell_icon.png';
import ticket_icon from 'images/ticket_icon.png';

const NavLeft = () => {
  return (
    <>
    <div className={styles.nav_left}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <img src={user} alt="avatar" />
        </div>
        <div className={styles.info}>
          <h3>Mya Tran</h3>
          <div className={styles.status}>Online</div>
        </div>
      </div>

      <div className={styles.nav_section}>
        <h4>Tài khoản của tôi</h4>
        <div className={styles.account_menu}>
          <NavLink
            to="/my-profile"
            className={({ isActive }) =>
              isActive ? styles.active : styles.checkbox_empty
            }
          >
            Hồ sơ
          </NavLink>
          <NavLink
            to="/paymentcard"
            className={({ isActive }) =>
              isActive ? styles.active : styles.checkbox_empty
            }
          >
            Thanh toán
          </NavLink>
          <NavLink
            to="/address"
            className={({ isActive }) =>
              isActive ? styles.active : styles.checkbox_empty
            }
          >
            Địa chỉ
          </NavLink>
          <NavLink
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
          to="/wishlist"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <img src={photograph_icon} alt="Wishlist icon" />
          Wishlist
        </NavLink>
        <NavLink
          to="/my-order"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <img src={shopping_bag_icon} alt="Đơn hàng icon" />
          Đơn hàng
        </NavLink>
        <NavLink
          to="/notifications"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <img src={bell_icon} alt="Thông báo icon" />
          Thông báo
        </NavLink>
        <NavLink
          to="/my-voucher"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <img src={ticket_icon} alt="Voucher icon" />
          Voucher
        </NavLink>
      </div>
    </div>
    </>
  );
};

export default NavLeft;