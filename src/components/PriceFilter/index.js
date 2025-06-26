import React, { useState } from "react";
import styles from "./PriceFilter.module.scss";

const PriceFilter = ({ onChange }) => {
  const [price, setPrice] = useState(1000000);

  const handleChange = (e) => {
    setPrice(Number(e.target.value));
  };

  const handleCommit = () => {
    onChange && onChange(price);
  };

  return (
    <div className={styles.filter_section}>
      <h3 className={styles.section_title}>Giá</h3>
      <div className={styles.price_range}>
        <div className={styles.price_values}>
          <span>0 đ</span>
          <span>{price.toLocaleString()} đ</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000000"
          step="10000"
          value={price}
          onChange={handleChange}
          onMouseUp={handleCommit}
          onTouchEnd={handleCommit}
          className={styles.price_slider}
          style={{
            background: `linear-gradient(to right, #ff6b8a 0%, #ff6b8a ${
              (price / 1000000) * 100
            }%, #ddd ${(price / 1000000) * 100}%, #ddd 100%)`,
          }}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
