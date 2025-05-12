import React from "react";
import Header from "components/Layout/Header"
import Footer from "components/Layout/Footer"
import styles from "./BlogCategory.module.scss"
import blog_cate1 from 'images/blog_cate1.png'
import blog_cate2 from 'images/blog_cate2.png'
import blog_cate3 from 'images/blog_cate3.png'
import blog_cate4 from 'images/blog_cate4.png'
import view from 'images/view.png'

const BlogCategory = () => {
  return (
    <>
    <Header />
    <div className={styles.container}>
      <div className={styles.blog_category}>
        <h1>Chăm sóc da</h1>
        <p>Blog về chăm sóc da/ 165 kết quả tìm kiếm</p>
      </div>

      <div className={styles.card_carousel}>
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

      <div className={styles.blog_list}>
        {/* blog 1 */}
        <div className={styles.card_blog}>
          <div className={styles.card_image}>
            <img src={blog_cate2} alt="Blog" />
          </div>
          <div className={styles.card_content}>
            <p className={styles.date}>20 tháng 6, 2024</p>
            <h3 className={styles.title}>Kem chống nắng Nhật Bản tốt không?</h3>
            <p className={styles.subtitle}>Top 5 kem chống nắng Nhật Bản được yêu thích</p>
            <p className={styles.description}>
              Kem chống nắng Nhật Bản luôn được đánh giá cao bởi chất lượng. Vậy đâu là top 5 kem chống nắng Nhật Bản được yêu thích nhất hiện nay? Hãy cùng Beauty Love tìm hiểu trong bài viết dưới đây…
            </p>
            <div className={styles.tags}>
              <span># mẹo</span>
              <span># bảo vệ da</span>
              <span># thành phần</span>
              <span># làn da</span>
              <span># thân thiện môi trường</span>
            </div>
            <button className={styles.button}>Xem thêm</button>
            <div className={styles.footer}>
              <span>by Beauty Love</span>
              <span className={styles.view}><img src={view} /> 220 Lượt xem</span>
            </div>
          </div>
        </div>
        {/* blog 2 */}
        <div className={styles.card_blog}>
          <div className={styles.card_image}>
            <img src={blog_cate3} alt="Blog" />
          </div>
          <div className={styles.card_content}>
            <p className={styles.date}>20 tháng 6, 2024</p>
            <h3 className={styles.title}>Chống nắng Sunplay Skin Aqua</h3>
            <p className={styles.subtitle}>Top 5 kem chống nắng Sunplay Skin Aqua đáng mua</p>
            <p className={styles.description}>
            Sunplay Skin Aqua là dòng kem chống nắng được ưa chuộng tại Nhật Bản và nhiều quốc gia châu Á, trong đó có Việt Nam.Các nàng thường hay phân vân không biết bản thân mình phù hợp với loại kem chống nắng nào của nhà Sunplay.
            </p>
            <div className={styles.tags}>
              <span># mẹo</span>
              <span># bảo vệ da</span>
              <span># thành phần</span>
              <span># làn da</span>
              <span># thân thiện môi trường</span>
            </div>
            <button className={styles.button}>Xem thêm</button>
            <div className={styles.footer}>
              <span>by Beauty Love</span>
              <span className={styles.view}><img src={view} /> 220 Lượt xem</span>
            </div>
          </div>
        </div>
        {/* blog 3 */}
        <div className={styles.card_blog}>
          <div className={styles.card_image}>
            <img src={blog_cate4} alt="Blog" />
          </div>
          <div className={styles.card_content}>
            <p className={styles.date}>20 tháng 6, 2024</p>
            <h3 className={styles.title}>Muối tắm sữa bò A Bonne của nước nào</h3>
            <p className={styles.subtitle}>Sử dụng có tốt không? Top 5 sản phẩm tốt của hãng</p>
            <p className={styles.description}>
            Việc sử dụng các loại muối tắm đang dần trở nên phổ biến hiện nay bởi nhiều lợi ích mà các sản phẩm này mang lại cho làn da. Trong đó, muối tắm sữa bò A Bonne là một sản phẩm chăm sóc cơ thể đang được nhiều khách hàng ưa chuộng...
            </p>
            <div className={styles.tags}>
              <span># mẹo</span>
              <span># bảo vệ da</span>
              <span># thành phần</span>
              <span># làn da</span>
              <span># thân thiện môi trường</span>
            </div>
            <button className={styles.button}>Xem thêm</button>
            <div className={styles.footer}>
              <span>by Beauty Love</span>
              <span className={styles.view}><img src={view} /> 220 Lượt xem</span>
            </div>
          </div>
        </div>
      </div>

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

    <Footer />
    </>
  )
}

export default BlogCategory;