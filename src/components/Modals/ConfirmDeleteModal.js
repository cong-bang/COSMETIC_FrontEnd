import React from "react";
import styles from "./ConfirmDeleteModal.module.scss";

const ConfirmDeleteModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onCancel}>
            Huỷ
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
