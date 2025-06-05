import React, { useState } from 'react';
import styles from './MyOrder.module.scss';
import calendar_icon from 'images/calendar_icon.png'
import product_ordered from 'images/product_ordered.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faStore  } from '@fortawesome/free-solid-svg-icons';


const MyOrder = () => {
    const tabs = ["Tất cả", "Xác nhận", "Vận chuyển", "Đã hoàn thành", "Đã huỷ"];
    const [activeTab, setActiveTab] = useState("Tất cả");

  return (
    <div className={styles.my_order}>
    <div className={styles.order_tabs}>
        {tabs.map((tab) => (
        <button
            key={tab}
            className={activeTab === tab ? styles.active : ""}
            onClick={() => setActiveTab(tab)}
        >
            {tab}
        </button>
        ))}
    </div>

      <div className={styles.order_item}>
        <div className={styles.order_header}>
          <div className={styles.faStore_icon}>
            <FontAwesomeIcon icon={faStore} className={styles.icon}/>
          </div>
          <div className={styles.order_status}>
            <FontAwesomeIcon icon={faTruck} />
            <span>Đơn hàng đã được giao thành công</span>
          </div>
        </div>

        <div className={styles.order_product}>
          <div className={styles.product_info}>
            <img src={product_ordered} alt="product" />
            <div className={styles.name_and_weight}>
              <p className={styles.name}>Tinh Chất Nghệ Hưng Yên C22 Cocoon 30ml</p>
              <p>30ml</p>
            </div>
            <span>x1</span>
            <span className={styles.price}>200,000 VNĐ</span>
          </div>

          <div className={styles.product_info}>
            <img src={product_ordered} alt="product" />
            <div className={styles.name_and_weight}>
              <p className={styles.name}>Tinh Chất Nghệ Hưng Yên C22 Cocoon 30ml</p>
              <p>30ml</p>
            </div>
            <span>x1</span>
            <span className={styles.price}>180,000 VNĐ</span>
          </div>
        </div>

        <div className={styles.total}>
          <span>Tổng</span>
          <span className={styles.total_price}>405,00 VNĐ</span>
        </div>

        <div className={styles.order_actions}>
          <button className={styles.btn_review}>Đánh giá</button>
          <button className={styles.btn_rebuy}>Mua lại</button>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
