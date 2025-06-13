import React from "react";
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
import blog_fy1 from 'images/blog_fy1.png'
import blog_fy2 from 'images/blog_fy2.png'
import blog_fy3 from 'images/blog_fy3.png'
import blog_fy4 from 'images/blog_fy4.png'
import blog_fy5 from 'images/blog_fy5.png'
import blog_fy6 from 'images/blog_fy6.png'
import blog_banqtam1 from 'images/blog_banqtam1.png'
import blog_banqtam2 from 'images/blog_banqtam2.png'
import blog_banqtam3 from 'images/blog_banqtam3.png'
import blog_banqtam4 from 'images/blog_banqtam4.png'
import blog_banqtam5 from 'images/blog_banqtam5.png'
import blog_banqtam6 from 'images/blog_banqtam6.png'
import { Link } from 'react-router-dom';
import Breadcrumb from "../../components/Breadcrumb";

const Blog = () => {
  return(
    <>
    <div className={styles.breadcrumb}>
        <Breadcrumb pageName={"Blog"} />
      </div>
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
                <Link to="/blog-detail">
                <button className={styles.btn_seemore}>XEM THÊM</button>
                </Link>
            </div>
        </div>

        <div className={styles.section_categories}>
          <Link to="/blog-category" className={styles.category_card} style={{backgroundImage: `url(${chamsocda})`}}>         
            <div className={styles.category_label}>CHĂM SÓC DA</div>
            <div className={styles.category_bottom_line_1}></div>
          </Link>
          
          <Link to="/blog-category" className={styles.category_card} style={{backgroundImage: `url(${chamsocsuckhoe})`}}>
            <div className={styles.category_label}>CHĂM SÓC SỨC KHỎE</div>
            <div className={styles.category_bottom_line_2}></div>
          </Link>
          <Link to="/blog-category" className={styles.category_card} style={{backgroundImage: `url(${xuhuonglamdep})`}}>
            <div className={styles.category_label}>XU HƯỚNG LÀM ĐẸP</div>
            <div className={styles.category_bottom_line_3}></div>
          </Link>
          <Link to="/blog-category" className={styles.category_card} style={{backgroundImage: `url(${reviewsanpham})`}}>
            <div className={styles.category_label}>REVIEW SẢN PHẨM</div>
            <div className={styles.category_bottom_line_4}></div>
          </Link>
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
            <div className={styles.left_column}>
              <div className={styles.post_card} style={{backgroundImage: `url(${blog_fy1})`}}>
                <div className={styles.post_label}>Mỹ phẩm hữu cơ là gì? Top 5 thương hiệu mỹ phẩm hữu cơ...</div>
              </div>
            </div>

            <div className={styles.right_column}>
              <div className={styles.small_posts}>
                <div className={styles.post_item}>
                <img src={blog_fy2} alt="Post Foryou" />
                <div className={styles.post_info}>
                <div className={styles.category}>Skincare</div>
                <div className={styles.title}>CÁCH SỬ DỤNG MỸ PHẨM MURAD...</div>
                <div className={styles.date}>
                  <img src={calendar_icon} alt="calendar" /> 01 Th6 2023
                </div>
                </div>
              </div>
                <div className={styles.post_item}>
                  <img src={blog_fy3} alt="Post Foryou" />
                  <div className={styles.post_info}>
                  <div className={styles.category}>Skincare</div>
                  <div className={styles.title}>CÁCH SỬ DỤNG MỸ PHẨM MURAD...</div>
                  <div className={styles.date}>
                    <img src={calendar_icon} alt="calendar" /> 01 Th6 2023
                  </div>
                  </div>
                </div>
            <div className={styles.post_item}>
              <img src={blog_fy4} alt="Post Foryou" />
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

            <div className={styles.wide_posts}>
                <div className={styles.wide_post}>
                  <img src={blog_fy5} alt="Post Title" />
                  <div className={styles.overlay_text}>Làm Đẹp Toàn Diện: Hành Trình Chăm Sóc Da Hiệu Quả</div>
                </div>
                <div className={styles.wide_post}>
                  <img src={blog_fy6} alt="Post Title" />
                  <div className={styles.overlay_text}>Xu Hướng Làm Đẹp 2025: Từ Skincare Đến Makeup Đột Phá</div>
                </div>
            </div>
          </div>
        </div>

        <div className={styles.section_recommendations}>
          <div className={styles.section_header}>
              <h3>CÓ THỂ BẠN QUAN TÂM</h3>
              <a href="#" className={styles.btn_seeall}>XEM TẤT CẢ</a>
          </div>
        </div>
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
    </>
  ) 
};

export default Blog;