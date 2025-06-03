import React from 'react'
import styles from "./BlogDetail.module.scss"
import blog_cate1 from 'images/blog_cate1.png'
import view from 'images/view.png'
import calendar_icon from 'images/calendar_icon.png'
import blog_banqtam1 from 'images/blog_banqtam1.png'
import blog_banqtam2 from 'images/blog_banqtam2.png'
import blog_banqtam3 from 'images/blog_banqtam3.png'
import blog_banqtam4 from 'images/blog_banqtam4.png'
import blog_banqtam5 from 'images/blog_banqtam5.png'
import blog_banqtam6 from 'images/blog_banqtam6.png'

const BlogDetail = () => {
  return (
    <>
    <div className={styles.blog_container}>
        <div className={styles.blog_content}>
            <div className={styles.header}>
                <h1>Mỹ phẩm hữu cơ là gì? Top 5 thương hiệu mỹ phẩm hữu cơ được yêu thích hiện nay</h1>
                <div className={styles.blog_info}>
                    <div className={styles.info_1}>
                        <span className={styles.category}>Blogs về chăm sóc da</span>
                        <span className={styles.date}>/ 2024-03-15</span>
                    </div>
                    <div className={styles.info_2}>
                        <span className={styles.author}>by Beauty Love</span>
                        <span className={styles.view}><img src={view} /> 220 Lượt xem</span>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.image_section}>
                    <img src={blog_cate1} alt="Blog" />
                </div>
                <div className={styles.text_section}>
                    <p>
                    Sử dụng các loại mỹ phẩm hữu cơ đã trở thành một trào lưu được nhiều người đón nhận bởi các cam kết về sức khỏe và bảo vệ môi trường. Đây cũng là một trong những xu hướng làm đẹp mới được nhiều tín đồ mê skincare đón nhận nhờ những lợi ích mà nó mang đến. Vậy  Mỹ phẩm hữu cơ là gì? Hãy cùng Beauty Love khám phá qua bài viết sau.
                    </p>
                </div>
            </div>
            <div className={styles.blog_author}>
                by Puré
            </div>
        </div>

        <div className={styles.blog_list}>
            <h3>BLOG</h3>
            <div className={styles.blogs}>
                <div className={styles.blog}>
                    <div className={styles.title}>Học Amee chăm sóc da mặt với kem chống nắng...</div>
                    <div className={styles.date}>
                        <img src={calendar_icon} alt="calendar" /> 01 Th6 2023
                    </div>
                </div>
                <div className={styles.blog}>
                    <div className={styles.title}>Chống nắng Sunplay Skin Aqua nhất bạn được yêu thích...</div>
                    <div className={styles.date}>
                        <img src={calendar_icon} alt="calendar" /> 03 Th6 2023
                    </div>
                </div>
                <div className={styles.blog}>
                    <div className={styles.title}>Muối tắm Spa Bo à Bonne của nước nào? Sử dụng...</div>
                    <div className={styles.date}>
                        <img src={calendar_icon} alt="calendar" /> 01 Th6 2023
                    </div>
                </div>
                <div className={styles.blog}>
                    <div className={styles.title}>3 cách làm sữa tắm trắng da từ sữa tươi...</div>
                    <div className={styles.date}>
                        <img src={calendar_icon} alt="calendar" /> 01 Th6 2023
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className={styles.section_recommendations}>
        <div className={styles.section_header}>
            <h3>CÓ THỂ BẠN QUAN TÂM</h3>
            <a href="#" className={styles.btn_seeall}>XEM TẤT CẢ</a>
        </div>

        <div className={styles.bg_blog}>
          <div className={styles.blog_grid}>
            <div className={styles.col_1}>
                <div className={styles.blog_item_big}>
                <img src={blog_banqtam1} alt="" />
                <div className={styles.overlay_text}>Làm Đẹp Toàn Diện: Hành Trình Chăm Sóc Da Hiệu Quả</div>
                </div>
            </div>

            <div className={styles.col_2}>
                <div className={styles.row}>
                <div className={styles.blog_item_small}>
                    <img src={blog_banqtam2} alt="" />
                    <div className={styles.overlay_text}>Top 5 mã hồng tone lạnh...</div>
                </div>
                <div className={styles.blog_item_small}>
                    <img src={blog_banqtam3} alt="" />
                    <div className={styles.overlay_text}>Bí Ẩn Sắc Đẹp Hàn Quốc: Xu Hướng Đang Lên Ngôi</div>
                </div>
                </div>
                <div className={styles.row}>
                <div className={styles.blog_item_small}>
                    <img src={blog_banqtam4} alt="" />
                    <div className={styles.overlay_text}>Làm Đẹp Và Sức Khỏe: Mối Liên Hệ Không Thể Tách Rời</div>
                </div>
                <div className={styles.blog_item_small}>
                    <img src={blog_banqtam5} alt="" />
                    <div className={styles.overlay_text}>Combo mỹ phẩm phù hợp...</div>
                </div>
                </div>
            </div>

            <div className={styles.col_3}>
                <div className={styles.blog_item_big}>
                <img src={blog_banqtam6} alt="" />
                <div className={styles.overlay_text}>Sắc Đẹp Tự Nhiên: Khám Phá Bí Ẩn Làn Da Không Tỳ Vết</div>
                </div>
            </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default BlogDetail;