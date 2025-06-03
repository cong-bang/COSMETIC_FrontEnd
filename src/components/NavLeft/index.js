import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./NavLeft.module.scss"
import user from 'images/user.png'
import photograph_icon from 'images/photograph_icon.png'
import shopping_bag_icon from 'images/shopping_bag_icon.png'
import bell_icon from 'images/bell_icon.png'
import ticket_icon from 'images/ticket_icon.png'

const NavLeft = () => {
  const navigate = useNavigate();

  return (
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
          <label>
            <input
              type="radio"
              name="menu"
              onClick={() => navigate("/my-profile")}
              defaultChecked
            />
            Hồ sơ
          </label>
          <label>
            <input
              type="radio"
              name="menu"
              onClick={() => navigate("/paymentcard")}
            />
            Thanh toán
          </label>
          <label>
            <input
              type="radio"
              name="menu"
              onClick={() => navigate("/address")}
            />
            Địa chỉ
          </label>
          <label>
            <input
              type="radio"
              name="menu"
              onClick={() => navigate("/change-password")}
            />
            Đổi mật khẩu
          </label>
        </div>
      </div>

      <div className={styles.button_group}>
        <button onClick={() => navigate("/wishlist")}>
          <img src={photograph_icon} alt='' /> Wishlist
        </button>
        <button onClick={() => navigate("/my-order")}>
          <img src={shopping_bag_icon} alt='' /> Đơn hàng
        </button>
        <button onClick={() => navigate("/notifications")}>
          <img src={bell_icon} alt='' /> Thông báo
        </button>
        <button onClick={() => navigate("/my-voucher")}>
          <img src={ticket_icon} alt='' /> Voucher
        </button>
      </div>
    </div>
  );
}

export default NavLeft;
