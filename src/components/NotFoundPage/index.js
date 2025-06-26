import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";
import notfound from "images/notfound.png";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate("/products");
  };

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundContent}>
        <img
          src={notfound}
          alt="Cosmetic illustration"
          className={styles.notFoundIllustration}
        />

        <h1 className={styles.notFoundTitle}>
          Oops! Lạc Lối Giữa Vườn Hoa Sắc Đẹp
        </h1>
        <p className={styles.notFoundSubtitle}>
          Trang bạn tìm kiếm dường như đã bị ẩn đi hoặc không tồn tại.
          <br />
          Đừng lo, hãy cùng khám phá những sản phẩm lộng lẫy khác nhé!
        </p>

        <div className={styles.searchBarContainer}>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm bạn yêu..."
            className={styles.searchInput}
          />
          <button
            type="button"
            className={styles.searchButton}
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
        </div>

        <div className={styles.actionLinks}>
          <Link to="/" className={styles.homeButton}>
            Quay về Trang Chủ
          </Link>

          <p className={styles.suggestionText}>Hoặc thử xem qua:</p>
          <div className={styles.suggestionLinks}>
            <Link to="/products" className={styles.suggestionLink}>
              Bán Chạy Nhất
            </Link>
            <Link to="/products" className={styles.suggestionLink}>
              Hàng Mới Về
            </Link>
            <Link to="/products" className={styles.suggestionLink}>
              Chăm Sóc Da
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
