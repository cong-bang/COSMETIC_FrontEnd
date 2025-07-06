import React from "react";
import momo from "images/momo_logo.png";
import vnpay from "images/vnpay_logo.png";
import visa from "images/visa_logo.png";
import qr from "images/QR.png";
import appstore from "images/appstore.png";
import gg_play from "images/gg_play.png";
import chungnhan from "images/chungnhan.png";
import icon_fb from "images/icon_fb.png";
import icon_insta from "images/icon_insta.png";
import icon_youtube from "images/icon_youtube.png";
import pure_logo_2 from "images/pure_logo_2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./Footer.module.scss";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className={styles.container_1}>
        <div className={styles.div_border_bottom}></div>
      </div>

      <div className={styles.container_2}>
        <div className={styles.ctn_2_4col}>
          <div className={styles.ctn_2_col}>
            {/* Cột 1 - Về PURE */}
            <div className={styles.div_logomedia}>
              <img
                src={pure_logo_2}
                alt="Logo"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <h3>VỀ PURÉ</h3>
            <ul>
              {[
                "Về chúng tôi",
                "Sản phẩm",
                "Tuyển dụng",
                "Tư vấn",
                "Tin tức",
                "Điều khoản dịch vụ",
                "Liên hệ",
                "Chính sách thanh toán",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Cột 2 - Phương thức thanh toán */}

          <div className={styles.ctn_2_col}>
            <div className={styles.ctn_2_h25}></div>
            <h3>PHƯƠNG THỨC THANH TOÁN</h3>
            <div className={styles.ctn_2_payImg}>
              <img src={momo} alt="MoMo" />
              <img src={vnpay} alt="VNPay" />
              <img src={visa} alt="Visa" />
            </div>
          </div>

          {/* Cột 3 - Tải ứng dụng */}
          <div className={styles.ctn_2_col}>
            <div className={styles.ctn_2_h25}></div>
            <h3>TẢI ỨNG DỤNG</h3>
            <p>Quét mã QR hoặc tải ứng dụng PURÉ trên iOS và Android</p>
            <div className={styles.ctn_2_downImg}>
              <img
                src={qr}
                alt="QR Code"
                style={{
                  background: "white",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              />
              <div className={styles.ctn_2_divImg_appgg}>
                <img
                  className={styles.img_appstore}
                  src={appstore}
                  alt="App Store"
                />
                <img
                  className={styles.img_ggplay}
                  src={gg_play}
                  alt="Google Play"
                />
              </div>
            </div>
          </div>

          {/* Cột 4 - Chăm sóc khách hàng */}

          <div className={styles.ctn_2_col}>
            <div className={styles.div_logomedia}>
              <div className={styles.ctn_2_div_media}>
                <div
                  className={`${styles.div_icon_fb_insta_yt} ${styles.facebook}`}
                >
                  <img src={icon_fb} alt="Facebook" />
                </div>
                <div
                  className={`${styles.div_icon_fb_insta_yt} ${styles.instagram}`}
                >
                  <img src={icon_insta} alt="Instagram" />
                </div>
                <div
                  className={`${styles.div_icon_fb_insta_yt} ${styles.youtube}`}
                >
                  <img src={icon_youtube} alt="YouTube" />
                </div>
              </div>
            </div>

            <h3>CHĂM SÓC KHÁCH HÀNG</h3>
            <p>cs.vn@pure.com</p>
            <h3 className={styles.h3_chungnhan}>CHỨNG NHẬN</h3>
            <div>
              <img
                src={chungnhan}
                alt="Chứng nhận"
                style={{
                  background: "white",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container_3}>
        <span className={styles.ctn_3_text_copyright}>
          © Copyright © 2025 Pure
        </span>

        <div className={styles.ctn_3_text_and_icon}>
          <span>
            Việc sử dụng trang web này cho thấy bạn tuân thủ chính sách quyền
            riêng tư, điều khoản và điều kiện của chúng tôi
          </span>

          <div className={styles.icon_up} onClick={scrollToTop}>
            <FontAwesomeIcon icon={faChevronUp} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
