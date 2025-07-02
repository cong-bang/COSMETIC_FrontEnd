import React, { useEffect, useState } from "react";
import styles from "./Wishlist.module.scss";
import product_wishlist from "images/product_wishlist.png";
import icon_search from "images/icon_search.png";
import {
  addWishListToCart,
  deleteWishListById,
  get8WishList,
} from "../../services/wishListService";
import { toast } from "react-toastify";
import { getBrandById } from "../../services/brandService";
import { truncateText } from "../../utils/truncateText";

const Wishlist = () => {
  const [wishList, setWishList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [brands, setBrands] = useState({});

  //Get WishList
  useEffect(() => {
    fetchWishList(currentPage);
  }, [currentPage]);

  useEffect(() => {
    wishList.forEach((item) => {
      if (!brands[item.productPlace.brandId]) {
        fetchBrandById(item.productPlace.brandId);
      }
    });
  }, [wishList]);

  const fetchWishList = async (page) => {
    try {
      const result = await get8WishList(page, pageSize);
      setWishList(result.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchBrandById = async (brandId) => {
    try {
      const result = await getBrandById(brandId);
      console.log(result.data);
      setBrands((prev) => ({
        ...prev,
        [brandId]: result.data.name,
      }));
    } catch (error) {
      toast.error("Lỗi lấy brand");
    }
  };

  //Delete Item wishlist:
  const handleRemoveItem = async (id) => {
    try {
      const res = await deleteWishListById(id);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    }
    fetchWishList();
  };

  //Add item to cart
  const handleAddItemToCart = async () => {
    try {
      const res = await addWishListToCart();
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    }
    fetchWishList();
  };

  // const products = Array(8).fill({
  //   brand: "COCOON",
  //   name: "Tinh Chất Nghệ Hưng Yên C22 Cocoon 30ml",
  //   price: 372000,
  //   oldPrice: 465000,
  //   image: product_wishlist
  // });

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
            {/* {products.map((item, index) => (
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
        ))} */}
            {wishList.map((item, index) => (
              <div key={index} className={styles.product_card}>
                <img
                  src={item.productPlace.image || product_wishlist}
                  alt={"Product"}
                />
                <h4>{brands[item.productPlace.brandId] || "Pure"}</h4>
                <p className={styles.name} title={item.productPlace.name}>
                  {truncateText(item.productPlace.name, 40)}
                </p>
                <p className={styles.price}>
                  {item.productPlace.price.toLocaleString()} đ{" "}
                  <span className={styles.old_price}>
                    {item.productPlace.price.toLocaleString()} đ{" "}
                  </span>
                </p>
                <div className={styles.actions}>
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddItemToCart();
                    }}
                  >
                    Thêm vào giỏ hàng
                  </span>
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveItem(item.id);
                    }}
                  >
                    Xóa
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* pagination */}
          {wishList.length > 0 && (
            <div className={styles.pagination}>
              <button>{"«"}</button>
              <button>{"<"}</button>
              <button className={styles.active}>1</button>
              <button>2</button>
              <button>3</button>
              <span className={styles.ellipsis}>...</span>
              <button>40</button>
              <button>{">"}</button>
              <button>{"»"}</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
