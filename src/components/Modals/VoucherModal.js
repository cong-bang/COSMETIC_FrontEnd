import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./VoucherModal.module.scss";
import { get5Vouchers } from "../../services/voucherService";
import { toast } from "react-toastify";

const VoucherModal = ({ isOpen, onClose }) => {
  const [vouchers, setVouchers] = useState([]);

  const fetchVouchers = async () => {
    try {
      const res = await get5Vouchers();
      console.log(res.data);
      setVouchers(res.data);
    } catch (error) {
      console.error("Lỗi lấy voucher:", error);
    }
  };

  useEffect(() => {
    if (isOpen) fetchVouchers();
  }, [isOpen]);

  const handleClaim = (id) => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        toast.success(`Copy mã giảm giá thành công!`);
      })
      .catch((err) => {
        console.error("Lỗi copy ID: ", err);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Voucher Hot</h2>
      <div className={styles.voucherList}>
        {vouchers.length === 0 && <p>Không có voucher nào khả dụng.</p>}
        {vouchers.map((item) => (
          <div key={item.id} className={styles.voucherItem}>
            <div className={styles.voucherInfo}>
              <h3>Mã: {item.code || "XXX"}</h3>
              <p>Discount: {item.voucherRealValue.toLocaleString() || 0}</p>
              <p>Số lượng: {item.quantity || 0}</p>
              <p>HSD: {new Date(item.endDate).toLocaleDateString()}</p>
            </div>
            <button
              className={styles.claimButton}
              onClick={() => handleClaim(item.id)}
            >
              Nhận ngay
            </button>
          </div>
        ))}
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        Đóng
      </button>
    </Modal>
  );
};

export default VoucherModal;
