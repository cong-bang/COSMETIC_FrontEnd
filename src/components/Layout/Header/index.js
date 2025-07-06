import React, { useEffect, useState } from "react";
import logo from "images/PURE_logo.png";
import list_icon from "images/clipboard-list.png";
import home_icon from "images/home.png";
import icon_user from "images/icon_user.png";
import icon_cart from "images/icon_cart.png";
import icon_search from "images/icon_search.png";
import styles from "./Header.module.scss";
import { Menu, Search } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../services/userService";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const categories = [
    "Shop",
    "Trang Điểm",
    "Chăm Sóc Cơ Thể",
    "Blogs",
    "Tất Cả Thương Hiệu",
    "Beauty Tools",
    "Voucher",
    "About Us",
  ];
  const [activeCategory, setActiveCategory] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Theo dõi thay đổi đường dẫn để cập nhật activeCategory
  useEffect(() => {
    // Reset activeCategory khi về trang chủ
    if (location.pathname === "/") {
      setActiveCategory("");
    }
  }, [location.pathname]);

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
    } else if (category === "Beauty Tools") {
      navigate("/beauty-tools");
    } else if (category === "Blogs") {
      navigate("/blog");
    } else if (category === "About Us") {
      navigate("/aboutus");
    } else {
      navigate("/products");
    }
  };

  const handleLogoClick = () => {
    setActiveCategory(""); // Reset trạng thái active khi click vào logo
    navigate("/");
  };

  const handleAuthen = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.id) {
      navigate("/my-profile");
    } else {
      navigate("/login");
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      // Thực hiện tìm kiếm
      navigate(`/products?search=${searchTerm}`);
    }
  };

  return (
    <>
      <div className={styles.container_header}>
        {/* Header mới với 3 phần: trái, giữa, phải */}
        <div className={styles.header_top}>
          {/* Bên trái: Tra cứu đơn hàng và Hệ thống cửa hàng */}
          <div className={styles.header_left}>
            <div className={styles.div_icon_text} onClick={handleLookupClick}>
              <img src={list_icon} alt="list_icon" />
              <span>Tra cứu đơn hàng</span>
            </div>
            <div className={styles.div_icon_text}>
              <img src={home_icon} alt="home_icon" />
              <span>Hệ thống cửa hàng</span>
            </div>
          </div>

          {/* Ở giữa: Logo */}
          <div className={styles.header_center}>
            <div className={styles.div_logo} onClick={handleLogoClick}>
              <img src={logo} alt="Logo" style={{ height: "80px" }} />
            </div>
          </div>

          {/* Bên phải: admin, giỏ hàng */}
          <div className={styles.header_right}>
            <div className={styles.user_links}>
              <div className={styles.user_link} onClick={handleAuthen}>
                <span>
                  {JSON.parse(localStorage.getItem("user"))?.username ||
                    "Sign in"}
                </span>
              </div>

              <Link to="/cart" className={styles.user_link}>
                <img
                  src={icon_cart}
                  alt="icon_cart"
                  className={styles.cart_icon}
                />
                <span>Giỏ Hàng</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Menu danh mục */}
        <div className={styles.ctn_3}>
          <div className={styles.div_danhmuc} onClick={handleDanhMucClick}>
            <Menu size={18} /> DANH MỤC
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

          {/* Thanh tìm kiếm bên phải */}
          <div className={styles.search_container}>
            <input
              type="text"
              className={styles.search_input}
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
            <div className={styles.search_icon}>
              <img src={icon_search} alt="icon_search" />
            </div>
          </div>
        </div>
      </div>

      {/* Menu dropdown */}
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
                <Link to="/bodycare">Chăm Sóc Cơ Thể</Link> <span>&gt;</span>
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
              <div className={styles.menu_col_item}>
                <Link to="/bodycare">Chăm Sóc Cơ Thể</Link>
              </div>
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
