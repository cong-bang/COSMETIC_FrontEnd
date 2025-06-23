import React from "react";
import styles from "./ProductCard.module.scss";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_image_wrapper}>
        <img
          className={styles.card_image}
          src={product.Link}
          alt={product.Name}
        />
      </div>
      <div className={styles.card_content}>
        <h3 className={styles.card_title}>{product.Name}</h3>
        <p>
          <strong>Mã Sản Phẩm:</strong> {product.Id}
        </p>
        <p className={styles.price}>
          <strong>Giá:</strong> {product.Price.toLocaleString()} VND
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
