import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Lookup.module.scss";

const Lookup = () => {
  const [searchMethod, setSearchMethod] = useState("email");
  const [orderCode, setOrderCode] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // In a real app, we would validate inputs and fetch order data
    // For this demo, we'll just navigate to the order tracking page
    navigate("/order-tracking");
  };

  return (
    <>
      <div className={styles.lookup_container}>
        <div className={styles.lookup_box}>
          <h2 className={styles.lookup_title}>TRA CỨU ĐƠN HÀNG</h2>
          <p className={styles.lookup_subtitle}>
            Bạn vui lòng cung cấp thông tin để tra cứu đơn hàng.
          </p>

          <div className={styles.lookup_form}>
            <div className={styles.form_group}>
              <label>Mã Đơn</label>
              <input
                type="text"
                placeholder="Tìm mã đơn"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
              />
            </div>

            <div className={styles.search_method}>
              <div className={styles.method_selector}>
                <label
                  className={searchMethod === "email" ? styles.active : ""}
                >
                  <input
                    type="radio"
                    name="searchMethod"
                    checked={searchMethod === "email"}
                    onChange={() => setSearchMethod("email")}
                  />
                  Email
                </label>
                <label
                  className={searchMethod === "phone" ? styles.active : ""}
                >
                  <input
                    type="radio"
                    name="searchMethod"
                    checked={searchMethod === "phone"}
                    onChange={() => setSearchMethod("phone")}
                  />
                  Số điện thoại nhận hàng
                </label>
              </div>
              <input
                type="text"
                placeholder={
                  searchMethod === "email" ? "Email" : "Số điện thoại nhận hàng"
                }
                className={styles.contact_input}
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
              />
            </div>

            <button className={styles.search_button} onClick={handleSearch}>
              TRA CỨU NGAY
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lookup;
