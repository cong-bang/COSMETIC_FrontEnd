import React, { useState } from "react";
import styles from "./ChangePassword.module.scss";
import { useSelector } from "react-redux";
import { changePassword } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const userFromLocal = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  // State quản lý form
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Xử lý khi nhập input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý khi bấm Lưu
  const handleSubmit = async () => {
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận không khớp.");
      return;
    }

    try {
      const data = {
        email: userFromLocal.email,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      };

      const res = await changePassword(data);
      toast.success(res.message);
      localStorage.removeItem("user");
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

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
        <span className={styles.username}>{userFromLocal.username || "Unknown"}</span>
      </div>

      <div className={styles.form_group}>
        <label>Mật khẩu hiện tại</label>
        <input
          type="password"
          name="oldPassword"
          placeholder="Nhập mật khẩu hiện tại"
          value={formData.oldPassword}
          onChange={handleChange}
        />
      </div>

      <div className={styles.form_group}>
        <label>Mật khẩu mới</label>
        <input
          type="password"
          name="newPassword"
          placeholder="Nhập mật khẩu mới"
          value={formData.newPassword}
          onChange={handleChange}
        />
      </div>

      <div className={styles.form_group}>
        <label>Xác nhận mật khẩu mới</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu mới"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div className={styles.actions}>
        <button onClick={handleSubmit}>Lưu</button>
      </div>
    </div>
  );
};

export default ChangePassword;

