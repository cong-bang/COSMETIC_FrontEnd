import React from "react";
import styles from "./Notification.module.scss";
import nofitication_1 from 'images/nofitication_1.png'
import icon_search from 'images/icon_search.png'

const Notification = () => {

    const notifications = [
    {
        image: nofitication_1,
        title: "PURE GIẢM ĐẾN 40% CỰC ĐÃ",
        description: "Giảm sốc đến 40% trên hàng loạt sản phẩm HOT",
        date: "12/08/2025",
        link: "#"
    },
    {
        image: nofitication_1,
        title: "TOP DEAL BÁN CHẠY CỰC HỜI",
        description: "Hàng loạt sản phẩm bán chạy nhất với giá siêu ưu đãi!",
        date: "12/08/2025",
        link: "#"
    },
    {
        image: nofitication_1,
        title: "5 MÃ GIẢM GIÁ CỰC SỐC MỞ NGÀY 15.4",
        description: "Săn ngay loạt mã giảm giá HOT mùa sắm tiết kiệm hơn!",
        date: "12/08/2025",
        link: "#"
    },
    {
        image: nofitication_1,
        title: "SIÊU SALE GIỮA THÁNG DEAL 0Đ",
        description: "Mua sắm thả ga - Nhận ngay deal 0Đ!",
        date: "12/08/2025",
        link: "#"
    }
    ];

  return (

    <>
    <div className={styles.container}>

    <div className={styles.search_bar}>
    <div className={styles.input_wrapper}>
        <input type="text" placeholder="Tìm kiếm" />
        <div className={styles.icon_search}>
        <img src={icon_search} alt="icon_search" />
        </div>
    </div>
    </div>

    <div className={styles.notification_wrapper}>
    {notifications.map((item, index) => (
        <div key={index} className={styles.notification_item}>
        <div className={styles.image_box}>
            <img src={item.image} alt="notification" />
        </div>
        <div className={styles.content_box}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span>Ngày hết hạn là {item.date}</span>
        </div>
        <div className={styles.detail_link}>
            <a href={item.link}>Xem chi tiết</a>
        </div>
        </div>
    ))}

      {/* pagination */}
      <div className={styles.pagination}>
        <button>{'«'}</button>
        <button>{'<'}</button>
        <button className={styles.active}>1</button>
        <button>2</button>
        <button>3</button>
        <span className={styles.ellipsis}>...</span>
        <button>40</button>
        <button>{'>'}</button>
        <button>{'»'}</button>
      </div>

      </div>

    </div>
    </>
  );
};

export default Notification;
