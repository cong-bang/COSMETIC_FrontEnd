// components/TypingIndicator.jsx
import React from "react";
import styles from "./ChatBox.module.scss";

const TypingIndicator = () => {
  return (
    <div className={styles.typing}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  );
};

export default TypingIndicator;
