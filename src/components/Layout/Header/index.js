import React, { useState } from "react";
import banner from "images/header-top.png";
import logo from "images/PURE_logo.png";
import down_icon from "images/arrow-narrow-down.png";
import list_icon from "images/clipboard-list.png";
import home_icon from "images/home.png";
import icon_user from "images/icon_user.png";
import icon_cart from "images/icon_cart.png";
import icon_search from "images/icon_search.png";
import "./Header.module.scss";
import styles from "./Header.module.scss";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const categories = [
    "Chăm Sóc Da Mặt",
    "Trang Điểm",
    "Chăm Sóc Cơ Thể",
    "Chăm Sóc Sức Khỏe",
    "Chăm Sóc Tóc",
    "Tất Cả Thương Hiệu",
  ];
  const [activeCategory, setActiveCategory] = useState("Trang Điểm");

  const handleLookupClick = () => {
    navigate("/lookup");
  };

  return (
    <>
      <div className={styles.container_header}>
        {/* row1 */}
        <div>
          <img className={styles.banner_img} src={banner} alt="banner-header" />
        </div>

        {/* row2 */}
        <div className={styles.ctn_2}>
          <Link to="/" className={styles.div_logo}>
            <img src={logo} alt="Logo" />
          </Link>
          {/* header-right */}
          <div className={styles.div_ctn_2_right}>
            <div className={styles.div_3_icon}>
              <div className={styles.div_icon_text}>
                <img src={down_icon} alt="down_icon" />
                <span>Tải app ngay</span>
              </div>
              <div className={styles.div_icon_text} onClick={handleLookupClick}>
                <img src={list_icon} alt="list_icon" />
                <span>Tra cứu đơn hàng</span>
              </div>
              <div className={styles.div_icon_text}>
                <img src={home_icon} alt="home_icon" />
                <span>Hệ thống cửa hàng</span>
              </div>
            </div>
            <div className={styles.container_bar_search}>
              <div className={styles.bar_search}>
                <div className={styles.div_icon_search}>
                  <img src={icon_search} alt="icon_search" />
                </div>
                <div className={styles.div_input_search}>
                  <input
                    type="text"
                    placeholder="Voucher 15% - Đơn từ 99k | Deal Hot Dịp Hè"
                  />
                </div>
              </div>
              <div className={styles.div_button}>
                <div className={styles.button}>
                  <img src={icon_user} alt="icon_user" />
                  <span>Tài Khoản</span>
                </div>
              </div>
              <div className={styles.div_button}>
                <div className={styles.button}>
                  <img src={icon_cart} alt="icon_cart" />
                  <span>Giỏ Hàng</span>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>

        {/* row 3 */}
        <div className={styles.ctn_3}>
          <div className={styles.div_danhmuc}>
            <Menu size={20} /> DANH MỤC
          </div>
          <div className={styles.div_menu}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? styles.active : ""}
              >
                <span>●</span>
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
