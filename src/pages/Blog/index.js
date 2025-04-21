import React from "react";
import Header from "components/Layout/Header"
import Footer from "components/Layout/Footer"
import styles from "./Blog.module.scss";
import blog_intro from 'images/blog_intro.png'

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

        <div className={styles.section_categories}></div>
        <div className={styles.section_lastest_posts}></div>
        <div className={styles.section_blog_foryou}></div>
        <div className={styles.section_recommendations}></div>
    </div>
    <Footer />
    </>
  ) 
};

export default Blog;