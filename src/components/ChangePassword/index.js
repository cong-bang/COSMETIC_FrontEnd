import React from "react";
import styles from "./ChangePassword.module.scss";

const ChangePassword = () => {
  return (
    <div className={styles.change_password}>
      <h2>Đổi mật khẩu</h2>
      <p>
        Bạn nên sử dụng một mật khẩu mạnh mà bạn chưa từng sử dụng ở bất kỳ nơi
        nào khác
      </p>
      <hr />

      <div className={styles.form_group}>
        <label>Tên đăng nhập</label>
        <span className={styles.username}>Banglcse171033</span>
      </div>

      <div className={styles.form_group}>
        <label>Mật khẩu hiện tại</label>
        <input type="password" placeholder="Nhập mật khẩu hiện tại" />
      </div>

      <div className={styles.form_group}>
        <label>Mật khẩu mới</label>
        <input type="password" placeholder="Nhập mật khẩu mới" />
      </div>

      <div className={styles.form_group}>
        <label>Xác nhận mật khẩu mới</label>
        <input type="password" placeholder="Xác nhận mật khẩu mới" />
      </div>

      <div className={styles.actions}>
        <button>Lưu</button>
      </div>
    </div>
  );
};

export default ChangePassword;
