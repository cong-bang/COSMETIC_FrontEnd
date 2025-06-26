import React from "react";
import styles from "./ProductSkeleton.module.scss";

const ProductSkeleton = () => {
  return (
    <div className={styles.skeleton_card}>
      <div className={styles.skeleton_image}></div>
      <div className={styles.skeleton_info}>
        <div
          className={`${styles.skeleton_text} ${styles.skeleton_brand}`}
        ></div>
        <div
          className={`${styles.skeleton_text} ${styles.skeleton_name}`}
        ></div>
        <div
          className={`${styles.skeleton_text} ${styles.skeleton_price}`}
        ></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
