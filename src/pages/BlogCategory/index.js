import React from "react";
import Header from "components/Layout/Header"
import Footer from "components/Layout/Footer"
import styles from "./BlogCategory.module.scss";
import blog_cate1 from 'images/blog_cate1.png'

const BlogCategory = () => {
  return (
    <>
    <Header />
    <div className={styles.container}>
      <div className={styles.blog_category}>
        <h1>Chăm sóc da</h1>
        <p>Blog về chăm sóc da/ 165 kết quả tìm kiếm</p>
      </div>
      <div className={styles.card}>
        <div className={styles.card_image}>
          <img src={blog_cate1} alt="Blog" />
        </div>
        <div className={styles.card_content}>
          <p className={styles.card_date}>20 tháng 6, 2024</p>
          <h3 className={styles.card_title}>Mỹ phẩm hữu cơ là gì?</h3>
          <p className={styles.card_subtitle}>
            Top 5 mỹ phẩm hữu cơ được yêu thích nhất
          </p>
          <p className={styles.card_description}>
            Sử dụng các loại mỹ phẩm hữu cơ đã trở thành một trào lưu được nhiều người đón nhận bởi các cam kết về sức khỏe và bảo vệ môi trường. Đây cũng là một trong những xu hướng làm đẹp mới được nhiều tín đồ mê skincare..
          </p>
          <button className={styles.card_button}>Xem thêm</button>
        </div>
      </div>
    </div>

    <Footer />
    </>
  )
}

export default BlogCategory;