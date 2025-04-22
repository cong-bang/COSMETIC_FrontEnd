import React from "react";
import Header from "components/Layout/Header"
import Footer from "components/Layout/Footer"
import styles from "./Blog.module.scss";
import blog_intro from 'images/blog_intro.png'
import chamsocda from 'images/chamsocda.png'
import chamsocsuckhoe from 'images/chamsocsuckhoe.png'
import xuhuonglamdep from 'images/xuhuonglamdep.png'
import reviewsanpham from 'images/reviewsanpham.png'
import newblog1 from 'images/newblog1.png'
import newblog2 from 'images/newblog2.png'
import newblog3 from 'images/newblog3.png'
import calendar_icon from 'images/calendar_icon.png'

const Blog = () => {
  return(
    <>
    <Header />
    {/* Blog Page*/}
    <div className={styles.blogpage_container}>
        <div className={styles.section_intro}>
            <div className={styles.intro_image}>
                <img src={blog_intro} alt="Blog Intro" />
            </div>
            <div className={styles.intro_content}>
                <h2 className={styles.intro_title}>Nature's Bounty – Kho Báu Thiên Nhiên: Nâng 
                Tầm Sức Khỏe Và Vẻ Đẹp Tự Nhiên</h2>
                <p className={styles.intro_description}>“Nature's Bounty – Kho Báu Thiên Nhiên: Nâng Tầm Sức Khỏe Và Vẻ Đẹp Tự Nhiên” mở ra cánh cửa khám phá hành trình và triết lý đằng sau thương hiệu nổi tiếng này. Trong bối cảnh cuộc sống hiện đại đầy áp lực và ô nhiễm, nhu cầu tìm về thiên nhiên để cân bằng sức khỏe và duy trì vẻ đẹp trở nên cấp thiết. </p>
                <button className={styles.btn_seemore}>XEM THÊM</button>
            </div>
        </div>

        <div className={styles.section_categories}>
          <div className={styles.category_card} style={{backgroundImage: `url(${chamsocda})`}}>
            <div className={styles.category_label}>CHĂM SÓC DA</div>
            <div className={styles.category_bottom_line_1}></div>
          </div>
          <div className={styles.category_card} style={{backgroundImage: `url(${chamsocsuckhoe})`}}>
            <div className={styles.category_label}>CHĂM SÓC SỨC KHỎE</div>
            <div className={styles.category_bottom_line_2}></div>
          </div>
          <div className={styles.category_card} style={{backgroundImage: `url(${xuhuonglamdep})`}}>
            <div className={styles.category_label}>XU HƯỚNG LÀM ĐẸP</div>
            <div className={styles.category_bottom_line_3}></div>
          </div>
          <div className={styles.category_card} style={{backgroundImage: `url(${reviewsanpham})`}}>
            <div className={styles.category_label}>REVIEW SẢN PHẨM</div>
            <div className={styles.category_bottom_line_4}></div>
          </div>
        </div>

        <div className={styles.section_lastest_posts}>
          <div className={styles.section_header}>
            <h3>BÀI VIẾT MỚI NHẤT</h3>
            <a href="#" className={styles.btn_seeall}>XEM TẤT CẢ</a>
          </div>
          <div className={styles.post_list}>
            <div className={styles.post_item}>
              <img src={newblog1} alt="Post 1" />
              <div className={styles.post_info}>
                <div className={styles.category}>Skincare</div>
                <div className={styles.title}>CÁCH SỬ DỤNG MỸ PHẨM MURAD...</div>
                <div className={styles.date}>
                  <img src={calendar_icon} alt="calendar" /> 01 Th6 2023
                </div>
              </div>
            </div>
            <div className={styles.post_item}>
              <img src={newblog2} alt="Post 2" />
              <div className={styles.post_info}>
              <div className={styles.category}>Skincare</div>
              <div className={styles.title}>CÁCH SỬ DỤNG MỸ PHẨM MURAD...</div>
              <div className={styles.date}>
                <img src={calendar_icon} alt="calendar" /> 01 Th6 2023
              </div>
              </div>
            </div>
            <div className={styles.post_item}>
              <img src={newblog3} alt="Post 3" />
              <div className={styles.post_info}>
              <div className={styles.category}>Skincare</div>
              <div className={styles.title}>CÁCH SỬ DỤNG MỸ PHẨM MURAD...</div>
              <div className={styles.date}>
                <img src={calendar_icon} alt="calendar" /> 01 Th6 2023
              </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section_blog_foryou}>
          <div className={styles.section_header}>
              <h3>BLOG DÀNH CHO BẠN</h3>
              <a href="#" className={styles.btn_seeall}>XEM TẤT CẢ</a>
          </div>
          <div className={styles.blog_fy_list}>
            <div className={styles.card}>
              <div className={styles.card_image}>
                <div className={styles.card_caption}>Mỹ Phẩm hưu cơ giá top 5 thương hiệu mỹ phẩm hưu cơ</div>
              </div>
              <div className={styles.card_content}>
                <div className={styles.card_tag}>Skincare</div>
                <h2 className={styles.card_title}>CÁCH SỬ DỤNG MỸ PHẨM MURAD...</h2>
                <div className={styles.card_date}>01 TH6 2023</div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.card_image}>
              </div>
              <div className={styles.card_content}>
                <div className={styles.card_tag}>Skincare</div>
                <h2 className={styles.card_title}>CÁCH SỬ DỤNG MỸ PHẨM MURAD...</h2>
                <div className={styles.card_date}>01 TH6 2023</div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.card_image}>
              </div>
              <div className={styles.card_content}>
                <div className={styles.card_tag}>Skincare</div>
                <h2 className={styles.card_title}>Làm Đẹp Toàn Diện: Hành Trình Chăm Sóc Da Hiệu Quả</h2>
                <div className={styles.card_date}>01 TH6 2023</div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.card_image}>
              </div>
              <div className={styles.card_content}>
                <div className={styles.card_tag}>Skincare</div>
                <h2 className={styles.card_title}>Xu Hướng Làm Đẹp 2025: Từ Skincare Đến Makeup Đột Phá</h2>
                <div className={styles.card_date}>01 TH6 2023</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section_recommendations}></div>
    </div>
    <Footer />
    </>
  ) 
};

export default Blog;