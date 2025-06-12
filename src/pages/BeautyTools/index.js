import React from "react";
import styles from "./BeautyTools.module.scss";
import Breadcrumb from "../../components/Breadcrumb";

const BeautyTools = () => {
  return (
    <>
      <div className={styles.breadcrumb}>
        <Breadcrumb pageName={"Beauty tools"}/>
      </div>
      <div className={styles.beautytools_container}>
        {/* <div className={styles.breadcrumb}>
          TRANG CHỦ <span> &gt; </span>{" "}
          <span className={styles.active}>BEAUTY TOOL</span>
        </div> */}


        {/* Block 1: Makeup Try-on */}
        <div className={styles.tool_block}>
          <div className={styles.tool_imagewrap}>
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
              alt="Makeup Try-on"
            />
            <div className={styles.tool_label}>
              MAKEUP
              <br />
              TRY-ON
            </div>
            <button className={styles.explore_btn}>KHÁM PHÁ NGAY</button>
          </div>
          <div className={styles.tool_desc}>
            Tải hình selfie lên và chờ công nghệ của Pure nhận diện & phân tích
            khuôn mặt của bạn. Công nghệ Virtual Makeup Try tân tiến từ Pure sẽ
            giúp bạn thử nghiệm các màu sắc và kiểu trang điểm gợi ý những sản
            phẩm phù hợp với tông màu và phong cách của bạn.
          </div>
        </div>

        {/* Block 2: Instant Skin Reader */}
        <div className={styles.tool_block}>
          <div className={styles.tool_imagewrap}>
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
              alt="Instant Skin Reader"
            />
            <div className={styles.tool_label}>
              INSTANT
              <br />
              SKIN
              <br />
              READER
            </div>
            <button className={styles.explore_btn}>KHÁM PHÁ NGAY</button>
          </div>
          <div className={styles.tool_desc}>
            Tải hình selfie lên và chờ công nghệ của Pure nhận diện & phân tích
            làn da của bạn. Công nghệ Instant Skin Reader tân tiến từ Pure sẽ
            giúp bạn chỉ điểm các vùng da đang gặp vấn đề, đồng thời gợi ý
            routine chăm da dành riêng cho bạn.
          </div>
        </div>
      </div>
    </>
  );
};

export default BeautyTools;
