import React from "react";
import styles from "./Wishlist.module.scss";
import product_wishlist from 'images/product_wishlist.png'
import icon_search from 'images/icon_search.png'

const Wishlist = () => {
  
  const products = Array(12).fill({
    brand: "COCOON",
    name: "Tinh Chất Nghệ Hưng Yên C22 Cocoon 30ml",
    price: 372000,
    oldPrice: 465000,
    image: product_wishlist
  });

  return (

    <>
    <div className={styles.container}>
    <div className={styles.search_bar}>
    <div className={styles.input_wrapper}>
        <input type="text" placeholder="Tìm kiếm sản phẩm" />
        <div className={styles.icon_search}>
        <img src={icon_search} alt="icon_search" />
        </div>
    </div>
    <div className={styles.filters}>
        <button className={styles.active}>Mới nhất</button>
        <button>Phổ biến</button>
        <button>Sắp hết</button>
    </div>
    </div>

    
    <div className={styles.wishlist}>

      <div className={styles.wishlist_title}>
        <h2>Wishlist</h2>
        <p>Những sản phẩm mà bạn yêu thích</p>
      </div>

      <div className={styles.product_grid}>
        {products.map((item, index) => (
          <div key={index} className={styles.product_card}>
            <img src={item.image} alt={item.name} />
            <h4>{item.brand}</h4>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.price}>
              {item.price.toLocaleString()} đ{" "}
              <span className={styles.old_price}>
                {item.oldPrice.toLocaleString()} đ
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* pagination */}
      <div className={styles.pagination}>
        <button>{'«'}</button>
        <button>{'<'}</button>
        <button className={styles.active}>1</button>
        <button>2</button>
        <button>3</button>
        <span className={styles.ellipsis}>...</span>
        <button>40</button>
        <button>{'>'}</button>
        <button>{'»'}</button>
      </div>
      </div>
    </div>
    </>
  );
};

export default Wishlist;
