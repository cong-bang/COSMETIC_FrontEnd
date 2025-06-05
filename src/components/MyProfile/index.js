import React from 'react';
import styles from "./MyProfile.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const MyProfile = () => {
  return (
    <>
      <div className={styles.profileInfo}>
        <h2>Hồ sơ của tôi</h2>
        <p>Quản lý thông tin hồ sơ bảo mật tài khoản</p>
        <hr />

        <form className={styles.form}>
        <div className={styles.fieldGroup}>
            <label>Tên đăng nhập</label>
            <span>banglcse171033</span>
        </div>

        <div className={styles.fieldGroup}>
            <label>Tên người dùng</label>
            <input type="text" />
        </div>

        <div className={styles.fieldGroup}>
            <label>Email</label>
            <span>tun******23@gmail.com <a href="#">Thay đổi</a></span>
        </div>

        <div className={styles.fieldGroup}>
            <label>Số điện thoại</label>
            <span>*******173 <a href="#">Thay đổi</a></span>
        </div>

        <div className={styles.fieldGroup}>
            <label>Giới tính</label>
            <div className={styles.radioGroup}>
            <label><input type="radio" name="gender" /> Nam</label>
            <label><input type="radio" name="gender" checked /> Nữ</label>
            <label><input type="radio" name="gender" /> Khác</label>
            </div>
        </div>

        <div className={styles.birthdayGroup}>
            <label>Ngày sinh</label>
            <div className={styles.selectWrapper}>
            <select >
                <option value="" selected disabled>Ngày</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
            <FontAwesomeIcon icon={faChevronDown} className={styles.dropdownIcon}/>
            </div>
            <div className={styles.selectWrapper}>
            <select>
                <option value="" selected disabled>Tháng</option>
                <option>Tháng 1</option>
                <option>Tháng 2</option>
                <option>Tháng 3</option>
                <option>Tháng 4</option>
                <option>Tháng 5</option>
                <option>Tháng 6</option>
                <option>Tháng 7</option>
                <option>Tháng 8</option>
                <option>Tháng 9</option>
                <option>Tháng 10</option>
                <option>Tháng 11</option>
                <option>Tháng 12</option>
            </select>
            <FontAwesomeIcon icon={faChevronDown} className={styles.dropdownIcon}/>
            </div>
            <div className={styles.selectWrapper}>
            <select>
                <option value="" selected disabled>Năm</option>
                <option>2000</option>
                <option>2001</option>
                <option>2002</option>
            </select>
            <FontAwesomeIcon icon={faChevronDown} className={styles.dropdownIcon}/>
            </div>
        </div>


        <button className={styles.saveButton}>Lưu</button>
        </form>
    </div>
    </>
  );
}

export default MyProfile;
