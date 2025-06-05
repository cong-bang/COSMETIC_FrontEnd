import React from "react";
import styles from "./MyVoucher.module.scss";
import my_voucher_1 from 'images/my_voucher_1.png'
import icon_search from 'images/icon_search.png'

const MyVoucher = () => {

    const myVouchers = [
    {
        image: my_voucher_1,
        title: "Giảm giá 50% VND",
        description: "Tối thiểu 1.000.000đ",
        date: "12/08/2025",
        link: "#"
    },
    {
        image: my_voucher_1,
        title: "Giảm giá 25% VND",
        description: "Tối thiểu 500.000đ. Tối đa 1.000.000đ",
        date: "12/08/2025",
        link: "#"
    },
    {
        image: my_voucher_1,
        title: "Giảm giá 50% VND",
        description: "Tối thiểu 1.000.000đ",
        date: "12/08/2025",
        link: "#"
    },
    {
        image: my_voucher_1,
        title: "Giảm giá 50% VND",
        description: "Tối thiểu 1.000.000đ",
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
    <div className={styles.filters}>
        <button className={styles.active}>Mới nhất</button>
        <button>Phổ biến</button>
        <button>Sắp hết</button>
    </div>
    </div>

    <div className={styles.voucher_wrapper}>
    {myVouchers.map((item, index) => (
        <div key={index} className={styles.voucher_item}>
        <div className={styles.image_box}>
            <img src={item.image} alt="notification" />
        </div>
        <div className={styles.content_box}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span>Ngày hết hạn là {item.date}</span>
        </div>
        <div className={styles.detail_link}>
            <a href={item.link}>Sử dụng ngay</a>
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

export default MyVoucher;
