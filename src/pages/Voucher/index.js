import React, { useState } from "react";
import styles from "./Voucher.module.scss";
import vouchermain from "images/vouchermain.png";

const Voucher = () => {
  // State để lưu trạng thái của voucher đã nhận hay chưa
  const [savedVouchers, setSavedVouchers] = useState({});
  // State để hiển thị thông báo
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });

  // Dữ liệu mẫu cho các voucher mỹ phẩm
  const voucherData = [
    {
      id: 1,
      discount: "15%",
      title: "Giảm 15% cho đơn hàng mỹ phẩm từ 300k",
      expiry: "HSD: 30/12/2023",
      color: "linear-gradient(135deg, #ff6b8a, #ff9eb8)",
    },
    {
      id: 2,
      discount: "50K",
      title: "Giảm 50K cho đơn hàng chăm sóc da từ 400k",
      expiry: "HSD: 15/12/2023",
      color: "linear-gradient(135deg, #ff6b8a, #ff9eb8)",
    },
    {
      id: 3,
      discount: "30%",
      title: "Giảm 30% cho son môi và phấn mắt",
      expiry: "HSD: 20/12/2023",
      color: "linear-gradient(135deg, #ff6b8a, #ff9eb8)",
    },
    {
      id: 4,
      discount: "20%",
      title: "Giảm 20% cho mặt nạ dưỡng da",
      expiry: "HSD: 25/12/2023",
      color: "linear-gradient(135deg, #ff6b8a, #ff9eb8)",
    },
    {
      id: 5,
      discount: "100K",
      title: "Giảm 100K cho đơn hàng từ 1 triệu",
      expiry: "HSD: 31/12/2023",
      color: "linear-gradient(135deg, #ff6b8a, #ff9eb8)",
    },
    {
      id: 6,
      discount: "10%",
      title: "Giảm 10% cho tất cả sản phẩm COCOON",
      expiry: "HSD: 05/01/2024",
      color: "linear-gradient(135deg, #ff6b8a, #ff9eb8)",
    },
    {
      id: 7,
      discount: "20%",
      title: "Giảm 20% cho tất cả sản phẩm làm sạch",
      expiry: "HSD: 10/01/2024",
      color: "linear-gradient(135deg, #ff6b8a, #ff9eb8)",
    },
    {
      id: 8,
      discount: "FREESHIP",
      title: "Miễn phí vận chuyển cho đơn từ 200k",
      expiry: "HSD: 15/01/2024",
      color: "linear-gradient(135deg, #8a66ff, #a995ff)",
    },
    {
      id: 9,
      discount: "BUY 1 GET 1",
      title: "Mua 1 tặng 1 cho mặt nạ giấy",
      expiry: "HSD: 20/01/2024",
      color: "linear-gradient(135deg, #ff8c4c, #ffb28c)",
    },
  ];

  // Hàm xử lý khi bấm lưu voucher
  const handleSaveVoucher = (id, discount) => {
    // Cập nhật trạng thái đã lưu
    setSavedVouchers((prev) => ({
      ...prev,
      [id]: true,
    }));

    // Hiển thị thông báo
    setNotification({
      show: true,
      message: `Đã nhận voucher giảm ${discount} thành công!`,
    });

    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
      setNotification({
        show: false,
        message: "",
      });
    }, 3000);
  };

  return (
    <>
      <div className={styles.voucher_page}>
        {/* Thông báo khi lưu voucher thành công */}
        {notification.show && (
          <div className={styles.notification}>
            <div className={styles.notification_content}>
              <div className={styles.notification_icon}>✓</div>
              <div className={styles.notification_message}>
                {notification.message}
              </div>
            </div>
          </div>
        )}

        <div className={styles.voucher_container}>
          {/* Main voucher banner */}
          <div className={styles.voucher_main_banner}>
            <img
              src={vouchermain}
              alt="SĂN DEAL LUYỆN GIỰT VOUCHER SIÊU XỊN 40%"
              className={styles.voucher_main_image}
            />
          </div>

          {/* Voucher content section */}
          <div className={styles.voucher_content}>
            <h1 className={styles.voucher_title}>
              KHUYẾN MÃI HOT - ƯU ĐÃI CHO BẠN
            </h1>

            <div className={styles.voucher_grid}>
              {/* Voucher cards will be here */}
              {voucherData.map((voucher) => (
                <div key={voucher.id} className={styles.voucher_card}>
                  <div className={styles.voucher_card_inner}>
                    <div
                      className={styles.voucher_discount}
                      style={{ background: voucher.color }}
                    >
                      <span className={styles.discount_amount}>
                        {voucher.discount}
                      </span>
                      <span className={styles.discount_label}>Giảm</span>
                    </div>
                    <div className={styles.voucher_details}>
                      <h3>{voucher.title}</h3>
                      <p>{voucher.expiry}</p>
                      <button
                        className={`${styles.voucher_button} ${
                          savedVouchers[voucher.id] ? styles.saved : ""
                        }`}
                        onClick={() =>
                          handleSaveVoucher(voucher.id, voucher.discount)
                        }
                        disabled={savedVouchers[voucher.id]}
                      >
                        {savedVouchers[voucher.id] ? "Đã Nhận" : "Lưu Voucher"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Voucher;
