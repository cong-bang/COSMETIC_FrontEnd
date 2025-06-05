import React from "react";
import styles from "./Virtual.module.scss";
// import virtual_banner from "images/login.png";
import virtual from "images/virtual.jpg";
import virtual6 from "images/virtual6.jpg";
import virtual7 from "images/virtual7.jpg";
import virtual8 from "images/virtual8.png";

const Virtual = () => {
  return (
    <>
      <div className={styles.virtual_container}>
        <div className={styles.breadcrumb}>
          <span>TRANG CHỦ</span>
          <span className={styles.separator}>&gt;</span>
          <span>BEAUTY TOOL</span>
          <span className={styles.separator}>&gt;</span>
          <span className={styles.active}>VIRTUAL MAKEUP TRY-ON</span>
        </div>

        <div className={styles.banner_section}>
          <img src={virtual} alt="Virtual Makeup Banner" />
        </div>

        <div className={styles.content_section}>
          <p className={styles.description}>
            Tải hình selfie lên và chờ công nghệ của Puré nhận diện & phân tích
            khuôn mặt của bạn. Công nghệ Virtual Makeup Try tân tiến từ Puré sẽ
            giúp bạn thử nghiệm các màu sắc và kiểu trang điểm gợi ý những sản
            phẩm phù hợp với tông màu và phong cách của bạn.
          </p>
        </div>

        <div className={styles.how_it_works}>
          <h2>CÁCH VIRTUAL MAKEUP TRY-ON HOẠT ĐỘNG?</h2>
          <div className={styles.steps_grid}>
            <div className={styles.step_item}>
              <div className={styles.step_image}>
                <img
                  src="/images/step1.jpg"
                  alt="Thử trang điểm ngay tức thì"
                />
              </div>
              <h3>THỬ TRANG ĐIỂM NGAY TỨC THÌ</h3>
              <p>
                Công nghệ Virtual Makeup Try của Puré sẽ phân tích hình ảnh bạn
                tải lên để ngay lập tức gợi ý các phong cách trang điểm phù hợp
                với tông màu và đặc điểm khuôn mặt của bạn.
              </p>
            </div>

            <div className={styles.step_item}>
              <div className={styles.step_image}>
                <img
                  src="/images/step2.jpg"
                  alt="Tìm ra phong cách trang điểm"
                />
              </div>
              <h3>TÌM RA PHONG CÁCH TRANG ĐIỂM</h3>
              <p>
                Puré sẽ giúp bạn thử nghiệm các kiểu trang điểm từ nhẹ nhàng đến
                nổi bật, phù hợp với sở thích và cá tính của bạn.
              </p>
            </div>

            <div className={styles.step_item}>
              <div className={styles.step_image}>
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Gợi ý sản phẩm phù hợp"
                />
              </div>
              <h3>GỢI Ý SẢN PHẨM PHÙ HỢP</h3>
              <p>
                Bạn sẽ nhận được gợi ý về các sản phẩm trang điểm Puré phù hợp
                với nhu cầu và đặc điểm làn da của bạn, giúp bạn tỏa sáng mỗi
                ngày.
              </p>
            </div>

            <div className={styles.step_item}>
              <div className={styles.step_image}>
                <img src="/images/step4.jpg" alt="Cảm nhận sự biến hóa" />
              </div>
              <h3>CẢM NHẬN SỰ BIẾN HÓA</h3>
              <p>
                Chỉ với một bức ảnh, bạn có thể ngay lập tức nhìn thấy sự thay
                đổi diện mạo của mình, từ đôi môi quyến rũ đến làn má hồng căng
                đầy, giúp bạn tự tin hơn với vẻ ngoài mới mẻ.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.try_makeup_section}>
          <div className={styles.try_makeup_content}>
            <div className={styles.try_makeup_images}>
              <img
                src={virtual6}
                alt="Try Makeup Example 1"
                className={styles.try_image}
              />
              <img
                src={virtual7}
                alt="Try Makeup Example 2"
                className={styles.try_image}
              />
            </div>
            <div className={styles.try_makeup_info}>
              <h2>THỬ TRANG ĐIỂM CHỈ VỚI 1 TẤM ẢNH</h2>
              <p className={styles.main_desc}>
                Virtual Makeup Try của Puré giúp bạn thử ngay các phong cách
                trang điểm chỉ với một selfie, từ đó gợi ý màu sắc và sản phẩm
                phù hợp.
              </p>
              <div className={styles.feature_list}>
                <div className={styles.feature_item}>
                  <h3>Phong cách trang điểm:</h3>
                  <p>
                    Khám phá các kiểu trang điểm phù hợp với tông màu và sở
                    thích của bạn.
                  </p>
                </div>
                <div className={styles.feature_item}>
                  <h3>Gợi ý sản phẩm:</h3>
                  <p>
                    Đề xuất những sản phẩm làm nổi bật vẻ đẹp tự nhiên và cá
                    tính của bạn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom_banner}>
          <img src={virtual8} alt="Virtual Banner" />
        </div>
      </div>
    </>
  );
};

export default Virtual;
