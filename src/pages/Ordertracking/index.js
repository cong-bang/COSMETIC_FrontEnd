import React from "react";
import { Link } from "react-router-dom";
import Header from "components/Layout/Header";
import Footer from "components/Layout/Footer";
import styles from "./OrderTracking.module.scss";
import {
  ChevronRight,
  Clock,
  Package,
  Truck,
  Check,
  Edit,
  MessageCircle,
  X,
  Info,
} from "lucide-react";

const OrderTracking = () => {
  return (
    <>
      <Header />
      <div className={styles.tracking_container}>
        <div className={styles.tracking_header}>
          <Link to="/">TRANG CHỦ</Link>
          <ChevronRight size={14} />
          <span>TRA CỨU ĐƠN HÀNG</span>
        </div>

        <div className={styles.content_wrapper}>
          <div className={styles.order_column}>
            <div className={styles.order_info_section}>
              <div className={styles.order_main_info}>
                <div>
                  <div className={styles.order_id}>
                    Đơn hàng: 22010124125521352
                  </div>
                  <div className={styles.order_date}>
                    02/01/2022 - 23:51 | NV tư vấn: Nguyễn Văn A -
                    nguyenvana@gmail.com
                  </div>
                </div>
                <div className={styles.order_status_badge}>ĐÃ XÁC NHẬN</div>
              </div>

              <div className={styles.status_timeline}>
                <div
                  className={`${styles.status_item} ${styles.status_active}`}
                >
                  <div className={`${styles.status_icon} ${styles.active}`}>
                    <Check size={24} color="#EE6983" />
                  </div>
                  <div className={styles.status_label}>Đặt hàng thành công</div>
                  <div className={styles.status_line}></div>
                </div>

                <div
                  className={`${styles.status_item} ${styles.status_active}`}
                >
                  <div className={`${styles.status_icon} ${styles.active}`}>
                    <Package size={24} color="#EE6983" />
                  </div>
                  <div className={styles.status_label}>
                    Đã tiếp nhận đơn hàng
                  </div>
                  <div className={styles.status_line}></div>
                </div>

                <div className={styles.status_item}>
                  <div className={styles.status_icon}>
                    <Truck size={24} color="#999" />
                  </div>
                  <div className={styles.status_label}>Giao cho vận chuyển</div>
                  <div className={styles.status_line}></div>
                </div>

                <div className={styles.status_item}>
                  <div className={styles.status_icon}>
                    <Check size={24} color="#999" />
                  </div>
                  <div className={styles.status_label}>Đã nhận được hàng</div>
                </div>
              </div>

              <div className={styles.status_history}>
                <div className={styles.history_item}>
                  <div className={styles.history_icon}>
                    <Check size={14} color="#EE6983" />
                  </div>
                  <div className={styles.history_content}>
                    <div className={styles.history_title}>
                      Đặt hàng thành công
                    </div>
                    <div className={styles.history_time}>
                      Thời gian: 15/03/2025 17:08:08
                    </div>
                  </div>
                </div>

                <div className={styles.history_item}>
                  <div className={styles.history_icon}>
                    <Package size={14} color="#EE6983" />
                  </div>
                  <div className={styles.history_content}>
                    <div className={styles.history_title}>
                      Đơn hàng đã được tiếp nhận
                    </div>
                    <div className={styles.history_time}>
                      Thời gian: 16/03/2025 20:35:08
                    </div>
                  </div>
                </div>

                <div className={styles.history_item}>
                  <div className={styles.history_icon}>
                    <Clock size={14} color="#EE6983" />
                  </div>
                  <div className={styles.history_content}>
                    <div className={styles.history_title}>
                      Đặt hàng thành công
                    </div>
                    <div className={styles.history_time}>Thời gian: --</div>
                  </div>
                </div>

                <div className={styles.history_item}>
                  <div className={styles.history_icon}>
                    <Clock size={14} color="#EE6983" />
                  </div>
                  <div className={styles.history_content}>
                    <div className={styles.history_title}>
                      Đơn hàng đã được tiếp nhận
                    </div>
                    <div className={styles.history_time}>Thời gian: --</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.payment_column}>
            <div className={styles.payment_info_section}>
              {/* Nhóm tiêu đề và 2 dòng phương thức thanh toán */}
              <div className={styles.payment_methods_group}>
                <div className={styles.payment_header}>
                  PHƯƠNG THỨC THANH TOÁN
                </div>

                <div className={styles.payment_row}>
                  <div className={styles.payment_label}>Tiền mặt</div>
                  <div className={styles.payment_value}>10.000.000 đ</div>
                </div>
                <div className={styles.payment_row}>
                  <div className={styles.payment_label}>VnpayQR</div>
                  <div className={styles.payment_value}>6.000.000 đ</div>
                </div>
              </div>

              {/* Phần còn lại tách biệt bên ngoài nhóm trên */}
              <div className={styles.payment_content}>
                <div className={styles.payment_row}>
                  <div className={styles.payment_label}>Tạm tính</div>
                  <div className={styles.payment_value}>16.000.000 đ</div>
                </div>
                <div className={styles.payment_row}>
                  <div className={styles.payment_label}>Khuyến mãi</div>
                  <div
                    className={`${styles.payment_value} ${styles.discount_value}`}
                  >
                    -30.000 đ
                  </div>
                </div>
                <div className={styles.payment_row}>
                  <div className={styles.payment_label}>Phí vận chuyển</div>
                  <div
                    className={`${styles.payment_value} ${styles.free_shipping}`}
                  >
                    Miễn phí
                  </div>
                </div>
                <div className={styles.payment_row}>
                  <div className={styles.payment_label}>
                    Mã giảm giá{" "}
                    <span className={styles.voucher_badge}>VNSHOP123</span>
                  </div>
                  <div
                    className={`${styles.payment_value} ${styles.discount_value}`}
                  >
                    -10.000 đ
                  </div>
                </div>
                <div className={styles.payment_row}>
                  <div className={styles.payment_label}>Thành tiền</div>
                  <div className={styles.payment_value}>15.600.000 đ</div>
                </div>
                <div className={styles.payment_row}>
                  <div className={styles.payment_label}></div>
                  <div
                    className={`${styles.payment_value} ${styles.bonus_points}`}
                  >
                    +1.500 điểm
                  </div>
                </div>
                <div className={styles.payment_row}>
                  <div className={styles.payment_label}>
                    Dùng điểm{" "}
                    <span className={styles.points_badge}>20.000 VNPoint</span>
                  </div>
                  <div
                    className={`${styles.payment_value} ${styles.discount_value}`}
                  >
                    -20.000 đ
                  </div>
                </div>
              </div>

              <div className={styles.divider}></div>

              <div className={styles.total_section}>
                <div className={styles.total_row}>
                  <div className={styles.payment_label}>Cần thanh toán</div>
                  <div className={styles.total_value}>1.540.000 đ</div>
                </div>
                <div className={styles.subtext_row}>
                  <div>(6 sản phẩm)</div>
                  <div>(Đã bao gồm VAT)</div>
                </div>
              </div>

              <div className={styles.action_buttons}>
                <button
                  className={`${styles.action_button} ${styles.note_button}`}
                >
                  <Info size={16} className={styles.icon} />
                  Ghi chú
                </button>
                <button
                  className={`${styles.action_button} ${styles.edit_button}`}
                >
                  <Edit size={16} />
                  Sửa đơn
                </button>
                <button
                  className={`${styles.action_button} ${styles.cancel_button}`}
                >
                  <X size={16} />
                  Hủy đơn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderTracking;
