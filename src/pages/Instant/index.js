import React from "react";
import styles from "./Instant.module.scss";
import Header from "components/Layout/Header";
import Footer from "components/Layout/Footer";
import instant1 from "images/instant1.png";
import instant2 from "images/instant2.jpg";
import instant3 from "images/instant3.jpg";
import instant4 from "images/instant4.jpg";
import instant5 from "images/instant5.jpg";
import instant6 from "images/instant6.jpg";
import instant7 from "images/instant7.jpg";
import instant8 from "images/instant8.png";

const Instant = () => {
  return (
    <>
      <Header />
      <div className={styles.instant_container}>
        <div className={styles.breadcrumb}>
          <span>TRANG CHỦ</span>
          <span className={styles.separator}>&gt;</span>
          <span>BEAUTY TOOL</span>
          <span className={styles.separator}>&gt;</span>
          <span className={styles.active}>INSTANT SKIN READER</span>
        </div>

        <div className={styles.banner_section}>
          <img src={instant1} alt="Instant Skin Reader Banner" />
        </div>

        <div className={styles.content_section}>
          <p className={styles.description}>
            Tải hình selfie lên và chờ công nghệ của Puré nhận diện & phân tích
            làn da của bạn. Công nghệ Instant Skin Reader tân tiến từ Puré sẽ
            giúp bạn chỉ điểm các vùng da đang gặp vấn đề, đồng thời gợi ý
            routine chăm da dành riêng cho bạn.
          </p>
        </div>

        <div className={styles.how_it_works}>
          <h2>CÁCH INSTANT SKIN READER HOẠT ĐỘNG?</h2>
          <div className={styles.steps_grid}>
            <div className={styles.step_item}>
              <div className={styles.step_image}>
                <img src={instant2} alt="Phân tích ảnh ngay tức thì" />
              </div>
              <h3>PHÂN TÍCH ẢNH NGAY TỨC THÌ</h3>
              <p>
                Công nghệ Instant Skin Reader của Puré sẽ phân tích ảnh selfie
                của bạn tải lên ngay lập tức và chỉ ra các vị điểm cũng như các
                vùng da mà bạn đang gặp vấn đề.
              </p>
            </div>

            <div className={styles.step_item}>
              <div className={styles.step_image}>
                <img src={instant3} alt="Xác định vấn đề da của bạn" />
              </div>
              <h3>XÁC ĐỊNH VẤN ĐỀ DA CỦA BẠN</h3>
              <p>
                Đưa ra đánh giá và xác định những vấn đề da đang gặp phải như
                nám, sạm màu, mụn, lỗ chân lông to hay lão hóa da không đều màu.
              </p>
            </div>

            <div className={styles.step_item}>
              <div className={styles.step_image}>
                <img src={instant4} alt="Gợi ý chu trình chăm da" />
              </div>
              <h3>GỢI Ý CHU TRÌNH CHĂM DA</h3>
              <p>
                Bạn sẽ nhận được gợi ý chu trình chăm sóc da phù hợp của Puré
                giúp bạn sở hữu làn da khỏe mạnh, trẻ trung hơn.
              </p>
            </div>

            <div className={styles.step_item}>
              <div className={styles.step_image}>
                <img src={instant5} alt="Tìm hiểu về thành phần phù hợp" />
              </div>
              <h3>TÌM HIỂU VỀ THÀNH PHẦN PHÙ HỢP</h3>
              <p>
                Khám phá thành phần dưỡng da của Puré phù hợp với vết thâm của
                bạn như AHA, BHA, Sqaulane hay Vitamin C.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.skin_analysis}>
          <div className={styles.skin_analysis_content}>
            <div className={styles.skin_analysis_images}>
              <img
                src={instant6}
                alt="Skin Analysis Example 1"
                className={styles.analysis_image}
              />
              <img
                src={instant7}
                alt="Skin Analysis Example 2"
                className={styles.analysis_image}
              />
            </div>
            <div className={styles.skin_analysis_info}>
              <h2>SOI DA CHỈ VỚI 1 TẤM ẢNH</h2>
              <p className={styles.main_desc}>
                Instant Skin Reader của Puré phân tích làn da nhanh chóng chỉ
                với một selfie và vài câu hỏi, giúp bạn hiểu rõ ưu điểm và vấn
                đề da, kèm gợi ý chăm sóc phù hợp.
              </p>
              <div className={styles.feature_list}>
                <div className={styles.feature_item}>
                  <h3>Ưu điểm của làn da:</h3>
                  <p>
                    Những điểm mạnh tự nhiên giúp da bạn tươi trẻ và rạng rỡ.
                  </p>
                </div>
                <div className={styles.feature_item}>
                  <h3>Các vấn đề về da:</h3>
                  <p>
                    Bao gồm độ ẩm, độ đàn hồi, lỗ chân lông, nếp nhăn, sắc tố da
                    và các dấu hiệu lão hóa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.qr_banner}>
          <img src={instant8} alt="QR Code Banner" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Instant;
