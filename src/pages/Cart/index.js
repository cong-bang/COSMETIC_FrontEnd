import React, { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import product from 'images/product.png'
import Breadcrumb from "../../components/Breadcrumb";
import { getCart, removeFromCart, updateCartItem } from "../../services/cartService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      if (res.statusCode === 200 && res.data && Array.isArray(res.data.items)) {
        setCartItems(res.data.items);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error("Lỗi lấy giỏ hàng:", err);
      setCartItems([]);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const res = await removeFromCart(id);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    }
    
    fetchCart();
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(id);
    }
    else
      await updateCartItem(id, newQuantity);
    fetchCart();
  };


  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleChangeQuantity = (id, value) => {
    const quantity = parseInt(value);
    if (isNaN(quantity) || quantity < 1) return;
    handleUpdateQuantity(id, quantity);
  };
  
  //ORDER
  const handleOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng của bạn đang trống.");
      return;
    }
    navigate("/order");
  };



  return (
    <>
      <div className={styles.breadcrumb}>
        <Breadcrumb pageName={"Giỏ hàng"} />
      </div>
      <div className={styles.container}>
        <div className={styles.cart_left}>
          <div className={styles.cart_header}>
            <div className={styles.left}>
              <h2>GIỎ HÀNG</h2>
              <span>({cartItems.length} Sản phẩm)</span>
            </div>
          </div>

            {cartItems.length === 0 ? (
              <div className={styles.empty_cart}>
                <p>Giỏ hàng của bạn đang trống.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className={styles.cart_item}>
                  <input type="checkbox" />
                  <img src={product} alt="Product" />
                  <div className={styles.item_info}>
                    <p className={styles.brand}>{item.product.code}</p>
                    <p className={styles.name}>{item.product.name}</p>
                    <span className={styles.variant}>Phân loại: {item.product.capacity} ml</span>
                    <div className={styles.actions}>
                      <span onClick={(e) => { e.preventDefault(); handleRemoveItem(item.productId); }}>
                        Xóa
                      </span>
                      <span>Chuyển vào wishlist</span>
                    </div>
                  </div>
                  <div className={styles.item_price}>{item.product.price} đ</div>
                  <div className={styles.item_quantity}>
                    <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}>-</button>
                    <input
                      type="text"
                      value={item.quantity}
                      onChange={(e) => handleChangeQuantity(item.product.id, e.target.value)}
                    />
                    <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className={styles.item_total}>
                    {(item.product.price * item.quantity).toLocaleString()} đ
                  </div>
                </div>
              ))
            )}

        </div>

        <div className={styles.cart_right}>
          <div className={styles.summary}>
            <h3>THÔNG TIN ĐƠN HÀNG</h3>
            <div className={styles.line_item}>
              <span>Tổng sản phẩm đã chọn</span>
              <span>{cartItems.length}</span>
            </div>
            <div className={styles.line_item}>
              <span>Tạm tính</span>
              <span>{totalAmount.toLocaleString()} đ</span>
            </div>
            <div className={styles.line_item}>
              <span>Mã giảm giá</span>
              <span>0 đ</span>
            </div>
            <div className={styles.total}>
              <span>Tổng thanh toán</span>
              <span>{totalAmount.toLocaleString()} đ</span>
            </div>
          </div>
          <button className={styles.checkout_btn} onClick={() => handleOrder()}>Tiến Hành Đặt Hàng</button>
        </div>
      </div>
    </>
  );
};

export default Cart;

