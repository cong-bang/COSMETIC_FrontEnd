import React, { useState } from 'react'
import styles from "./Order.module.scss"
import viuudai from 'images/viuudai.png'
import location_marker from 'images/location_marker.png'
import product from 'images/product.png'

const Order = () => {
    const [isChecked1, setChecked1] = useState(false);
    const [isChecked2, setChecked2] = useState(false);

  return (
    <>
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.section}>
            <h3> <img src={location_marker} alt='' /> Địa chỉ</h3>
            <div className={styles.address_info}>
                <span className={styles.tag}>Nhà riêng</span>
                <span>Lương Công Bằng - 0961346723</span>
                <span className={styles.change}>Thay đổi</span>
                <p>Vinhomes Grand Park - Origami S7.01, Phường Long Thạnh Mỹ, Quận 9, Hồ Chí Minh</p>
            </div>
            </div>

            <div className={styles.section}>
            <h3>Hình thức thanh toán</h3>
            <div className={styles.pay_method}>
                <label>
                    <input type="checkbox" /> Các phương thức thanh toán khác
                </label>
                <span className={styles.change}>Thay đổi</span>
            </div>           
            </div>

            <div className={styles.section}>
                <h3>Mã giảm giá</h3>
                <div className={styles.voucher}>
                    <img src={viuudai} alt='' />
                    <span className={styles.change}>Thay đổi</span>
                </div>
            </div>

            <div className={styles.shipping_info}>
            <h3>Thông tin kiện hàng</h3>

            <div className={styles.shipping_options}>
                <label className={`${styles.shipping_item} ${isChecked1 ? styles.active : ''}`}>
                <input
                    type="checkbox"
                    checked={isChecked1}
                    onChange={() => setChecked1(!isChecked1)}
                />
                <div>
                    <strong>Thứ 6. Trước 10h, 20/03</strong>
                    <p>NowFree Giao Nhanh</p>
                </div>
                <span className={styles.price_tag}>0 đ</span>
                </label>

                <label className={`${styles.shipping_item} ${isChecked2 ? styles.active : ''}`}>
                <input
                    type="checkbox"
                    checked={isChecked2}
                    onChange={() => setChecked2(!isChecked2)}
                />
                <div>
                    <strong>Thứ 6. Trước 10h, 20/03</strong>
                    <p>NowFree Giao Nhanh</p>
                </div>
                <span className={styles.price_tag}>0 đ</span>
                </label>
            </div>
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

            <div className={styles.note_total}>
            <textarea className={styles.note_input} placeholder="Ghi chú" />

            <div className={styles.total_price}>
                <span className={styles.label}>Tổng tiền (1)</span>
                <span className={styles.price}>299.000 đ</span>
            </div>
            </div>

            <p className={styles.policy_note}>
            Nhấn "Đặt hàng" đồng nghĩa việc bạn đồng ý tuân theo Chính sách xử lý dữ liệu cá nhân & Điều khoản Puré
            </p>

        </div>

        <div className={styles.right}>
            <button className={styles.order_btn}>Đặt Hàng (2)</button>

            <div className={styles.summary}>
            <h4>Đơn hàng <span className={styles.change}>Thay đổi</span></h4>
            <div className={styles.line_item}><span>Tổng sản phẩm đã chọn</span><span className={styles.number}>2</span></div>
            <div className={styles.line_item}><span>Tạm tính</span><span className={styles.number}>299.000 đ</span></div>
            <div className={styles.line_item}><span>Mã giảm giá</span><span className={styles.number}>0 đ</span></div>
            <div className={styles.total}><span className={styles.total_span_1}>Tổng thanh toán</span><span className={styles.total_span_2}>299.000 đ</span></div>
            <p className={styles.note_1}>Không thêm phí</p>
            <p className={styles.note_2}>(Không bao gồm phí giao hàng)</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Order;