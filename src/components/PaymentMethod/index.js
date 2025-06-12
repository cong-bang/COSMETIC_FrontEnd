import React, { useState } from "react";
import styles from "./PaymentMethodModal.module.scss";
import { IoClose } from "react-icons/io5";

const PaymentMethodModal = ({ isOpen, onClose, onConfirm }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  if (!isOpen) return null;

  const paymentMethods = [
    {
      id: "payos",
      title: "Chuyển khoản ngân hàng trực tiếp (PayOS)",
      description: "Thanh toán trực tiếp qua tài khoản ngân hàng",
    },
    {
      id: "momo",
      title: "Chuyển khoản qua ví điện tử",
      description: "Thanh toán trực tiếp qua ví điện tử Momo",
    },
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoClose />
        </button>

        <h3 className={styles.modalTitle}>Phương thức thanh toán</h3>

        <div className={styles.paymentOptions}>
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`${styles.paymentOption} ${
                selectedMethod === method.id ? styles.active : ""
              }`}
            >
            <div className={styles.paymentMethodItem}>
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={() => setSelectedMethod(method.id)}
              />
            </div>
              <div className={styles.optionInfo}>
                <div className={styles.optionHeader}>
                  <span className={styles.optionTitle}>{method.title}</span>
                  <div className={styles.optionIcons}>
                  </div>
                </div>
                <p className={styles.optionDescription}>{method.description}</p>
              </div>
            </label>
          ))}
        </div>

        <button
          onClick={() => onConfirm(selectedMethod)}
          className={styles.confirmButton}
        >
          Chọn
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodModal;
