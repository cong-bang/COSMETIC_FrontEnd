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
    "Beauty Tools",
    "Voucher",
  ];
  const [activeCategory, setActiveCategory] = useState("Trang Điểm");
  const [showMenu, setShowMenu] = useState(false);

  const handleLookupClick = () => {
    navigate("/lookup");
  };

  const handleDanhMucClick = () => {
    console.log("Đã nhấn DANH MỤC");
    setShowMenu((prev) => !prev);
  };

  const handleCloseMenu = (e) => {
    // Only close if clicking outside the menu
    if (e.target.classList.contains(styles.menu_overlay)) {
      setShowMenu(false);
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "Voucher") {
      navigate("/voucher");
    }
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
          <div className={styles.div_danhmuc} onClick={handleDanhMucClick}>
            <Menu size={20} /> DANH MỤC
          </div>
          <div className={styles.div_menu}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={activeCategory === category ? styles.active : ""}
              >
                <span>●</span>
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Dropdown menu overlay */}
      {showMenu && (
        <div className={styles.menu_overlay} onClick={handleCloseMenu}>
          <div className={styles.dropdown_menu}>
            <div className={styles.menu_col}>
              <div className={styles.menu_col_title}>ĐỘC QUYỀN TẠI PURE</div>
              <div className={styles.menu_col_item}>
                <Link to="/products">Chăm Sóc Da</Link> <span>&gt;</span>
              </div>
              <div className={styles.menu_col_item}>
                Trang Điểm <span>&gt;</span>
              </div>
              <div className={styles.menu_col_item}>
                Chăm Sóc Cơ Thể <span>&gt;</span>
              </div>
              <div className={styles.menu_col_item}>
                Chăm Sóc Tóc <span>&gt;</span>
              </div>
              <div className={styles.menu_col_item}>
                <Link to="/voucher">Voucher</Link> <span>&gt;</span>
              </div>
            </div>
            <div className={styles.menu_col}>
              <div className={styles.menu_col_title}>CÁC SẢN PHẨM TẠI PURE</div>
              <div className={styles.menu_col_item}>Chăm Sóc Da</div>
              <div className={styles.menu_col_item}>Trang Điểm</div>
              <div className={styles.menu_col_item}>Chăm Sóc Cơ Thể</div>
              <div className={styles.menu_col_item}>Chăm Sóc Tóc</div>
              <div className={styles.menu_col_item}>Vệ Sinh Phụ Nữ</div>
              <div className={styles.menu_col_item}>
                Khăn Giấy - Bông Tẩy Trang
              </div>
              <div className={styles.menu_col_item}>Dụng Cụ Trang Điểm</div>
              <div className={styles.menu_col_item}>
                <Link to="/voucher">Voucher</Link>
              </div>
            </div>
            <div className={styles.menu_col}>
              <div className={styles.menu_col_title}>THƯƠNG HIỆU</div>
              <div className={styles.menu_col_item}>Dosque</div>
              <div className={styles.menu_col_item}>Dele</div>
              <div className={styles.menu_col_item}>Forsy</div>
              <div className={styles.menu_col_item}>ImUnd</div>
              <div className={styles.menu_col_item}>Magnet</div>
              <div className={styles.menu_col_item}>Bidal</div>
            </div>
            <div className={styles.menu_col}>
              <div className={styles.menu_col_title}>BEAUTY TOOL</div>
              <Link to="/virtual" className={styles.menu_col_item}>
                Virtual makeup try-on
              </Link>
              <Link to="/instant" className={styles.menu_col_item}>
                Instant skin reader
              </Link>
            </div>
            <div className={styles.menu_dots}>
              <span className={styles.menu_dot}></span>
              <span className={styles.menu_dot}></span>
              <span className={styles.menu_dot}></span>
              <span className={styles.menu_dot}></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
