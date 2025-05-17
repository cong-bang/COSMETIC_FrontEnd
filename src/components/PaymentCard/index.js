import React from 'react';
import styles from "./PaymentCard.module.scss"
import visa from 'images/visa.png'

const PaymentCard = () => {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.payment_card}>
        <div className={styles.cardHeader}>
            <h3>Thẻ tín dụng/ghi nợ</h3>
            <button className={styles.addButton}>+ Thêm thẻ mới</button>
        </div>

        <div className={styles.cardContent}>
            <div className={styles.image}>
                <img src={visa} alt="visa" />
                <span className={styles.defaultLabel}>Mặc định</span>
            </div>
            <span className={styles.cardNumber}>**** **** **** 1234</span>
            <button className={styles.deleteButton}>Xóa</button>
        </div>
      </div>

      <div className={styles.payment_card}>
        <div className={styles.cardHeader}>
            <h3>Tài khoản ngân hàng của tôi</h3>
            <button className={styles.addButton}>+ Thêm tài khoản ngân hàng</button>
        </div>

        <div className={styles.cardContent}>
            <div className={styles.image}>
                <img src={visa} alt="visa" />
                <span className={styles.defaultLabel}>Mặc định</span>
            </div>
            <span className={styles.cardNumber}>**** **** **** 1234</span>
            <button className={styles.deleteButton}>Xóa</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default PaymentCard;
