/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import styles from "./MyProfile.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { getUserById, putUserProfile } from '../../services/userService';
import { Link, useLocation } from 'react-router-dom';
import { maskEmail } from '../../utils/maskEmail';
import { maskPhoneNumber } from '../../utils/maskPhoneNumber';
import { useSelector } from "react-redux";

const MyProfile = () => {
    const userFromLocal = useSelector((state) => state.user.user);
    const [user, setUser] = useState({});
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isEditingPhone, setIsEditingPhone] = useState(false);


    //HANDLE BIRTHDAY
    const renderDayOptions = () => {
      const days = Array.from({ length: 31 }, (_, i) => i + 1);
      return days.map((d) => (
        <option key={d} value={d < 10 ? `0${d}` : d}>
          {d}
        </option>
      ));
    };


    const renderMonthOptions = () => {
      const months = Array.from({ length: 12 }, (_, i) => i + 1);
      return months.map((m) => (
        <option key={m} value={m < 10 ? `0${m}` : m}>
          Tháng {m}
        </option>
      ));
    };


    const renderYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
        return years.map((y) => (
            <option key={y} value={y}>
            {y}
            </option>
        ));
    };


    //Get User Detail
    useEffect(() => {
        if (userFromLocal != null) {
            const fetchUserDetail = async () => {
                try {
                    const response = await getUserById(userFromLocal.id);   
                    setUser(response.data);
                    setFullName(response.data.fullName);
                    setPhoneNumber(response.data.phoneNumber);

                    // Xử lý birthday
                    if (response.data.yob) {
                        const [d, m, y] = response.data.yob.split("/");
                        setDay(d);
                        setMonth(m);
                        setYear(y);
                    }
                } catch (error) {
                    toast.error(error);
                    toast.error("Lấy thông tin người dùng thất bại!");
                }
            }
            fetchUserDetail();
        }        
    }, [userFromLocal])

    // Update User
    const handleUpdate = async (e) => {
    e.preventDefault();

    let yob = "";
    if (day || month || year) {
        yob = `${day}/${month}/${year}`;

        // Nếu muốn check định dạng khi có nhập
        const yobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
        if (!yobRegex.test(yob)) {
        toast.error("Ngày sinh phải đúng định dạng dd/mm/yyyy.");
        return;
        }
    }

    try {
        const dataToUpdate = {
        fullName,
        gender: parseInt(user.gender),
        phoneNumber,
        yob, 
        };

        const result = await putUserProfile(dataToUpdate);
        toast.success(result.message);
    } catch (error) {
        toast.error(error.message);
    }
    };


  return (
    <>
      <div className={styles.profileInfo}>
        <h2>Hồ sơ của tôi</h2>
        <p>Quản lý thông tin hồ sơ bảo mật tài khoản</p>
        <hr />

        <form className={styles.form}>
        <div className={styles.fieldGroup}>
            <label>Tên đăng nhập</label>
            <span>{user.userName || "Unknown"}</span>
        </div>

        <div className={styles.fieldGroup}>
            <label>Tên người dùng</label>
            <input
            type="text"
            value={fullName}
            placeholder="Chưa cập nhật"
            onChange={(e) => setFullName(e.target.value)}
            />
        </div>

        <div className={styles.fieldGroup}>
            <label>Email</label>
            <span>{maskEmail(user.email) || "Chưa cập nhập"} <Link to="#">Thay đổi</Link></span>
        </div>

        {/* <div className={styles.fieldGroup}>
            <label>Số điện thoại</label>
            <span>{maskPhoneNumber(phoneNumber) || "Chưa cập nhập"} <Link to="#">Thay đổi</Link></span>
        </div> */}

        <div className={styles.fieldGroup}>
        <label>Số điện thoại</label>
        {isEditingPhone ? (
            <div className={styles.inputEdit}>
            <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={styles.inputField}
                placeholder="Nhập số điện thoại mới"
            />
            <button
                type="button"
                onClick={() => setIsEditingPhone(false)}
                className={styles.cancelButton}
            >
                Hủy
            </button>
            </div>
        ) : (
            <span>
            {maskPhoneNumber(phoneNumber) || "Chưa cập nhật"}{" "}
            <button
                type="button"
                className={styles.changeButton}
                onClick={() => setIsEditingPhone(true)}
            >
                Thay đổi
            </button>
            </span>
        )}
        </div>


        <div className={styles.fieldGroup}>
            <label>Giới tính</label>
            <div className={styles.radioGroup}>
                <label>
                <input
                    type="radio"
                    name="gender"
                    value="0"
                    checked={user.gender == 0}
                    onChange={(e) => setUser({ ...user, gender: e.target.value })}
                />{" "}
                Nam
                </label>
                <label>
                <input
                    type="radio"
                    name="gender"
                    value="1"
                    checked={user.gender == 1}
                    onChange={(e) => setUser({ ...user, gender: e.target.value })}
                />{" "}
                Nữ
                </label>
                <label>
                <input
                    type="radio"
                    name="gender"
                    value="2"
                    checked={user.gender == 2}
                    onChange={(e) => setUser({ ...user, gender: e.target.value })}
                />{" "}
                Khác
                </label>
            </div>
            </div>

        <div className={styles.birthdayGroup}>
        <label>Ngày sinh</label>

        <div className={styles.selectWrapper}>
            <select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="" disabled>
                Ngày
            </option>
            {renderDayOptions()}
            </select>
            <FontAwesomeIcon icon={faChevronDown} className={styles.dropdownIcon} />
        </div>

        <div className={styles.selectWrapper}>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="" disabled>
                Tháng
            </option>
            {renderMonthOptions()}
            </select>
            <FontAwesomeIcon icon={faChevronDown} className={styles.dropdownIcon} />
        </div>

        <div className={styles.selectWrapper}>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="" disabled>
                Năm
            </option>
            {renderYearOptions()}
            </select>
            <FontAwesomeIcon icon={faChevronDown} className={styles.dropdownIcon} />
        </div>
        </div>

        <button className={styles.saveButton} onClick={handleUpdate}>Lưu</button>
        </form>
    </div>
    </>
  );
}

export default MyProfile;