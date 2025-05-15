import React from 'react'
import styles from "./Cart.module.scss"
import Header from "components/Layout/Header"
import Footer from "components/Layout/Footer"
import product from 'images/product.png'
import viuudai from 'images/viuudai.png'


const Cart = () => {
  return (
    <>
    <Header />
    <div className={styles.container}>
        <div className={styles.cart_left} >
            <div className={styles.cart_header}>
                <div className={styles.left}>
                    <h2>GIỎ HÀNG</h2>
                    <span>(2 Sản phẩm)</span>
                </div>
                <div className={styles.right}>
                    <label>
                    <input type="checkbox" />
                    Chọn tất cả
                    </label>
                </div>
            </div>
            {/* Product */}
            <div className={styles.cart_item}>
                <input type="checkbox" />
                <img src={product} alt="Product" />
                <div className={styles.item_info}>
                    <p className={styles.brand}>SKINTIFIC</p>
                    <p className={styles.name}>Gel Dưỡng Ẩm Skintific 5X Ceramide</p>
                    <span className={styles.variant}>Phân loại: 30 gr</span>
                    <div className={styles.actions}>
                    <a href="#">Xóa</a>
                    <a href="#">Chuyển vào wishlist</a>
                    </div>
                </div>
                <div className={styles.item_price}>149.500 đ</div>
                <div className={styles.item_quantity}>
                    <button>-</button>
                    <input type="text" value="1" />
                    <button>+</button>
                </div>
                <div className={styles.item_total}>299.000 đ</div>
            </div>
            {/* <!-- Thêm sản phẩm... --> */}
            <div className={styles.cart_item}>
                <input type="checkbox" />
                <img src={product} alt="Product" />
                <div className={styles.item_info}>
                    <p className={styles.brand}>SKINTIFIC</p>
                    <p className={styles.name}>Gel Dưỡng Ẩm Skintific 5X Ceramide</p>
                    <span className={styles.variant}>Phân loại: 30 gr</span>
                    <div className={styles.actions}>
                    <a href="#">Xóa</a>
                    <a href="#">Chuyển vào wishlist</a>
                    </div>
                </div>
                <div className={styles.item_price}>149.500 đ</div>
                <div className={styles.item_quantity}>
                    <button>-</button>
                    <input type="text" value="1" />
                    <button>+</button>
                </div>
                <div className={styles.item_total}>299.000 đ</div>
            </div>
            <div className={styles.cart_item}>
                <input type="checkbox" />
                <img src={product} alt="Product" />
                <div className={styles.item_info}>
                    <p className={styles.brand}>SKINTIFIC</p>
                    <p className={styles.name}>Gel Dưỡng Ẩm Skintific 5X Ceramide</p>
                    <span className={styles.variant}>Phân loại: 30 gr</span>
                    <div className={styles.actions}>
                    <a href="#">Xóa</a>
                    <a href="#">Chuyển vào wishlist</a>
                    </div>
                </div>
                <div className={styles.item_price}>149.500 đ</div>
                <div className={styles.item_quantity}>
                    <button>-</button>
                    <input type="text" value="1" />
                    <button>+</button>
                </div>
                <div className={styles.item_total}>299.000 đ</div>
            </div>
            <div className={styles.cart_item}>
                <input type="checkbox" />
                <img src={product} alt="Product" />
                <div className={styles.item_info}>
                    <p className={styles.brand}>SKINTIFIC</p>
                    <p className={styles.name}>Gel Dưỡng Ẩm Skintific 5X Ceramide</p>
                    <span className={styles.variant}>Phân loại: 30 gr</span>
                    <div className={styles.actions}>
                    <a href="#">Xóa</a>
                    <a href="#">Chuyển vào wishlist</a>
                    </div>
                </div>
                <div className={styles.item_price}>149.500 đ</div>
                <div className={styles.item_quantity}>
                    <button>-</button>
                    <input type="text" value="1" />
                    <button>+</button>
                </div>
                <div className={styles.item_total}>299.000 đ</div>
            </div>
        </div>

        <div className={styles.cart_right}>
            <div className={styles.summary}>
            <h3>THÔNG TIN ĐƠN HÀNG</h3>
            <div className={styles.line_item}>
                <span>Tổng sản phẩm đã chọn</span>
                <span>0</span>
            </div>
            <div className={styles.line_item}>
                <span>Tạm tính</span>
                <span>0 đ</span>
            </div>
            <div className={styles.line_item}>
                <span>Mã giảm giá</span>
                <span>0 đ</span>
            </div>
            <div className={styles.total}>
                <span>Tổng thanh toán</span>
                <span>0 đ</span>
            </div>
            <p className={styles.note_1}>Không thêm phí</p>
            <p className={styles.note_2}>(Không bao gồm phí giao hàng)</p>
            </div>

            <div className={styles.promotion}>
            <h3>THÔNG TIN ĐƠN HÀNG</h3>
            <p>Sử dụng mã giảm giá, thẻ quà tặng bạn đã tích lũy. </p>
            <img src={viuudai} alt='' />
            </div>
            <p className={styles.p_pls_check}>Vui lòng kiểm tra sản phẩm & quà tặng trước khi thanh toán </p>
            <button className={styles.checkout_btn}>Tiến Hành Đặt Hàng</button>
        </div>

    </div>
    <Footer />
    </>
  )
}

export default Cart;