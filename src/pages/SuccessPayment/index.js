import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./SuccessPayment.module.scss";
import success_icon from 'images/success_icon.png';

const SuccessPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');
  const status = queryParams.get('status');
  const amount = queryParams.get('amount');

  return (
    <>
      <div className={styles.container}>
        <img src={success_icon} alt="Success" className={styles.success_icon} />
        <h2>Cảm ơn bạn!</h2>
        <p className={styles.order_id}>
          Mã đặt hàng: <span>{orderId}</span>
        </p>
        <p className={styles.description}>
          Trạng thái đơn hàng: <strong>{status}</strong><br />
          Số tiền thanh toán: <strong>{amount || "0"} VNĐ</strong><br />
          Cảm ơn bạn đã sử dụng dịch vụ của Puré.
        </p>

        <div className={styles.btn_group}>
          <button className={`${styles.btn} ${styles.primary}`} onClick={() => navigate("/")}>
            Tiếp tục mua sắm
          </button>
          <button className={`${styles.btn} ${styles.primary}`} onClick={() => navigate("/my-order")}>
            Chi tiết đơn hàng
          </button>
        </div>
      </div>
    </>
  );
};

export default SuccessPayment;
