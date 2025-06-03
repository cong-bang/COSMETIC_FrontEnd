import React from 'react'
import styles from "./Cart.module.scss"
import product from 'images/product.png'
import viuudai from 'images/viuudai.png'
import product_1 from 'images/product_1.png'
import product_2 from 'images/product_2.png'
import product_3 from 'images/product_3.png'
import product_4 from 'images/product_4.png'
import product_5 from 'images/product_5.png'
import product_6 from 'images/product_6.png'
import product_7 from 'images/product_7.png'


const Cart = () => {
  return (
    <>
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

    {/* Mua thêm */}
    <div className={styles.product_list}>
        <p className={styles.title}><span class="icon">&lt;</span>Tiếp tục mua hàng</p>
        <div className={styles.product_items}>
            <div className={styles.product_item}>
                <img src={product_1} alt="Product 1" />
            </div>
            <div className={styles.product_item}>
                <img src={product_2} alt="Product 2" />
            </div>
            <div className={styles.product_item}>
                <img src={product_3} alt="Product 3" />
            </div>
            <div className={styles.product_item}>
                <img src={product_4} alt="Product 3" />
            </div>
            <div className={styles.product_item}>
                <img src={product_5} alt="Product 3" />
            </div>
            <div className={styles.product_item}>
                <img src={product_6} alt="Product 3" />
            </div>
            <div className={styles.product_item}>
                <img src={product_7} alt="Product 3" />
            </div>
        </div>
    </div>
    </>
  )
}

export default Cart;