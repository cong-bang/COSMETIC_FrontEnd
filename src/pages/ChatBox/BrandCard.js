import styles from "./BrandCard.module.scss";

const BrandCard = ({ brand }) => {
  return (
    <div className={styles.card}>
      <img src={brand.Logo} alt={brand.Name} className={styles.logo} />
      <div className={styles.info}>
        <h4>{brand.Name}</h4>
        <p>{brand.Description}</p>
        <p>
          <strong>Xuất xứ:</strong> {brand.Country}
        </p>
      </div>
    </div>
  );
};

export default BrandCard;
