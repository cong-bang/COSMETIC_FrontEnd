/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "react-js-loader";
import { sendConfirmEmail } from "../../services/authService";
import styles from "./ConfirmEmail.module.scss";

const ConfirmEmail = () => {
  const { id } = useParams();
  const [mess, setMess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setMess("Xác thực tài khoản thất bại: Token không hợp lệ.");
        setLoading(false);
        return;
      }

      try {
        const response = await sendConfirmEmail(id);

        // Check for success based on statusCode
        if (response && response.statusCode === 200) {
          setMess(response.message || "Xác thực tài khoản thành công!");
          return;
        } else {
          setMess(response?.message || "Xác thực tài khoản thất bại: Phản hồi không hợp lệ.");
          return;
        }
      } catch (error) {
        setMess(error.response?.data?.message || "Xác thực tài khoản thất bại: " + error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.content}>
          {loading ? (
            <div className={styles.loader}>
              <Loader
                type="spinner-default"
                bgColor={"#000"}
                color={{ color: "#000" }}
                title={"Đang xác thực..."}
                size={100}
              />
            </div>
          ) : (
            <div className={styles.messageBox}>
              <div className={styles.messageContent}>
                <span className={styles.message}>{mess}</span>
                <Link to="/login" className={styles.loginLink}>
                  Quay lại trang Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;