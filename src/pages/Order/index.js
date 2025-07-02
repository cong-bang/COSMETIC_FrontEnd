import React, { useEffect, useState } from "react";
import styles from "./Order.module.scss";
import viuudai from "images/viuudai.png";
import location_marker from "images/location_marker.png";
import product from "images/product.png";
import { createOrder } from "../../services/orderService";
import { createPayOSUrl } from "../../services/payOSService";
import ModalAdd from "../../components/Modals/ModalAdd";
import { toast } from "react-toastify";
import PaymentMethodModal from "../../components/PaymentMethod";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../../services/cartService";
import { getVoucherApply } from "../../services/voucherService";

const Order = () => {
  const user = useSelector((state) => state.user.user);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [note, setNote] = useState("");
  const [phone, setPhone] = useState("");

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [openModalPaymentMethod, setOpenModalPaymentMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [voucherCode, setVoucherCode] = useState("");
  const [order, setOrder] = useState(null);
  const [itemAmount, setItemAmount] = useState(0);
  const navigate = useNavigate();

  //
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      if (res.statusCode === 200 && res.data && Array.isArray(res.data.items)) {
        setCartItems(res.data.items);
        setItemAmount(res.data.items.length);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error("Lỗi lấy giỏ hàng:", err);
      setCartItems([]);
    }
  };

  const totalAmountOrigin = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  //Clear Field:
  const clearFields = () => {
    setShippingAddress("");
    setNote("");
    setPhone("");
  };

  //Handle input address
  const handleInputAddress = () => {
    setShowModalAdd(false);
  };

  //Handle Payment Method
  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    setOpenModalPaymentMethod(false);
  };

  //handle apply voucher
  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      toast.error("Vui lòng nhập mã voucher.");
      return;
    }

    // Nếu đã có order
    if (order) {
      const voucher = {
        voucherId: voucherCode,
        orderId: order.orderId,
      };
      try {
        const res = await getVoucherApply(voucher);
        if (res.statusCode === 200) {
          setOrder((prevOrder) => ({
            ...prevOrder,
            discount: res.data.discount,
            totalAmount: res.data.totalAmount,
            totalAfterDiscount: res.data.totalAfterDiscount,
            voucher: res.data.voucher,
          }));
          toast.success(res.message);
        } else {
          toast.error(res.message || "Áp dụng voucher thất bại.");
        }
      } catch (error) {
        toast.error(error.message);
      }
      return;
    }

    // Nếu chưa có order thì phải tạo order trước
    if (!shippingAddress.trim()) {
      toast.error("Vui lòng nhập địa chỉ giao hàng");
      return;
    }

    if (!phone.trim()) {
      toast.error("Vui lòng nhập số điện thoại");
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Số điện thoại không đúng");
      return;
    }

    if (!paymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán trước khi đặt hàng.");
      return;
    }

    const newOrder = {
      shippingAddress,
      orderNote: note,
      phoneNumber: phone,
    };

    try {
      const result = await createOrder(newOrder);
      setOrder(result.data);

      const voucher = {
        voucherId: voucherCode,
        orderId: result.data.orderId,
      };

      try {
        const res = await getVoucherApply(voucher);
        if (res.statusCode === 200) {
          setOrder((prevOrder) => ({
            ...prevOrder,
            discount: res.data.discount,
            totalAmount: res.data.totalAmount,
            totalAfterDiscount: res.data.totalAfterDiscount,
            voucher: res.data.voucher,
          }));
          toast.success(res.message);
        } else {
          toast.error(res.message || "Áp dụng voucher thất bại.");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //handleOrder
  const handleOrder = async () => {
    if (!order) {
      if (!shippingAddress.trim()) {
        toast.error("Vui lòng nhập địa chỉ giao hàng");
        return;
      }

      if (!phone.trim()) {
        toast.error("Vui lòng nhập số điện thoại");
        return;
      }

      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) {
        toast.error("Số điện thoại không đúng");
        return;
      }

      if (!paymentMethod) {
        toast.error("Vui lòng chọn phương thức thanh toán trước khi đặt hàng.");
        return;
      }

      const newOrder = {
        shippingAddress,
        orderNote: note,
        phoneNumber: phone,
      };

      try {
        const result = await createOrder(newOrder);
        if (result && result.data) {
          setOrder(result.data);
          await handlePayment(result.data.orderId);
        }
      } catch (error) {
        console.error("Order error:", error);
        toast.error("Lỗi khi đặt hàng. Vui lòng thử lại!");
      }
    } else {
      await handlePayment(order.orderId);
    }
  };

  const handlePayment = async (orderId) => {
    if (paymentMethod === "payos") {
      try {
        const response = await createPayOSUrl(orderId);
        if (response && response.paymentUrl) {
          window.location.href = response.paymentUrl;
        } else {
          toast.error("Không lấy được link thanh toán.");
        }
      } catch (error) {
        console.error("PayOS error:", error);
        toast.error(error.message);
      }
    } else if (paymentMethod === "momo") {
      toast.error("Hiện tại chỉ hỗ trợ thanh toán qua PayOS");
    } else {
      navigate("/payment-cancel");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.section}>
            <h3>
              {" "}
              <img src={location_marker} alt="" /> Địa chỉ
            </h3>
            <div className={styles.address_info}>
              <span className={styles.tag}>Nhà riêng</span>
              <span>
                {user && user.id ? user.username : "Unkown"} -{" "}
                {phone || "Chưa có số điện thoại"}
              </span>
              <span
                className={styles.change}
                onClick={() => setShowModalAdd(true)}
              >
                Thay đổi
              </span>
              <p>{shippingAddress || "Chưa có địa chỉ"}</p>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Hình thức thanh toán</h3>
            <div className={styles.pay_method}>
              <label>
                <input
                  type="checkbox"
                  checked={
                    paymentMethod === "payos" || paymentMethod === "momo"
                  }
                  readOnly
                />{" "}
                {paymentMethod === "payos"
                  ? "Chuyển khoản ngân hàng trực tiếp (PayOS)"
                  : paymentMethod === "momo"
                  ? "Chuyển khoản qua ví điện tử (Momo)"
                  : "Các phương thức thanh toán khác"}
              </label>

              <span
                className={styles.change}
                onClick={() => setOpenModalPaymentMethod(true)}
              >
                Thay đổi
              </span>
            </div>
          </div>

          {/* <div className={styles.section}>
            <h3>Mã giảm giá</h3>
            <div className={styles.voucher}>
              <img src={viuudai} alt="" />
              <span className={styles.change}>Thay đổi</span>
            </div>
          </div> */}

          <div className={styles.section}>
            <h3>Mã giảm giá</h3>
            <div className={styles.voucher}>
              <input
                type="text"
                placeholder="Nhập mã giảm giá"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
              />
              <button
                className={styles.applyButton}
                onClick={handleApplyVoucher}
              >
                Áp dụng
              </button>
              <Link to="/voucher" className={styles.change}>
                <span>Nhận voucher</span>
              </Link>
            </div>
          </div>

          <div className={styles.shipping_info}>
            <h3>Thông tin kiện hàng</h3>

            <div className={styles.shipping_options}>
              <label
                className={`${styles.shipping_item} ${
                  isChecked1 ? styles.active : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked1}
                  onChange={() => setChecked1(!isChecked1)}
                />
                <div>
                  <strong>Thứ 6. Trước 10h, 2025</strong>
                  <p>NowFree Giao Nhanh</p>
                </div>
                <span className={styles.price_tag}>0 đ</span>
              </label>

              <label
                className={`${styles.shipping_item} ${
                  isChecked2 ? styles.active : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked2}
                  onChange={() => setChecked2(!isChecked2)}
                />
                <div>
                  <strong>Thứ 6. Trước 10h, 2025</strong>
                  <p>NowFree Giao Nhanh</p>
                </div>
                <span className={styles.price_tag}>0 đ</span>
              </label>
            </div>
          </div>

          {/* <div className={styles.cart_item}>
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
          </div> */}

          <div className={styles.note_total}>
            <textarea className={styles.note_input} placeholder="Ghi chú" />

            <div className={styles.total_price}>
              <span className={styles.label}>
                Tổng tiền ({cartItems.length})
              </span>
              <span className={styles.price}>
                {(order?.totalAmount || totalAmountOrigin).toLocaleString()} đ
              </span>
            </div>
          </div>

          <p className={styles.policy_note}>
            Nhấn "Đặt hàng" đồng nghĩa việc bạn đồng ý tuân theo Chính sách xử
            lý dữ liệu cá nhân & Điều khoản Puré
          </p>
        </div>

        <div className={styles.right}>
          <button className={styles.order_btn} onClick={() => handleOrder()}>
            Đặt Hàng ({itemAmount})
          </button>

          <div className={styles.summary}>
            <h4>
              Đơn hàng <span className={styles.change}>Thay đổi</span>
            </h4>
            <div className={styles.line_item}>
              <span>Tổng sản phẩm đã chọn</span>
              <span className={styles.number}>{itemAmount}</span>
            </div>
            <div className={styles.line_item}>
              <span>Tạm tính</span>
              <span className={styles.number}>
                {(order?.totalAmount || totalAmountOrigin).toLocaleString()} đ
              </span>
            </div>

            <div className={styles.line_item}>
              <span>Mã giảm giá</span>
              <span className={styles.number}>
                -{" "}
                {order?.discount
                  ? `${order.discount.toLocaleString()} đ`
                  : "0 đ"}
              </span>
            </div>
            <div className={styles.total}>
              <span className={styles.total_span_1}>Tổng thanh toán</span>
              <span className={styles.total_span_2}>
                {(
                  order?.totalAfterDiscount ||
                  order?.totalAmount ||
                  `${totalAmountOrigin.toLocaleString()}`
                ).toLocaleString()}{" "}
                đ
              </span>
            </div>
            <p className={styles.note_1}>Không thêm phí</p>
            <p className={styles.note_2}>(Không bao gồm phí giao hàng)</p>
          </div>
        </div>
      </div>

      {/* Modal nhập địa chỉ */}
      <ModalAdd
        title="Địa chỉ nhận hàng"
        show={showModalAdd}
        onClose={() => {
          setShowModalAdd(false);
          clearFields();
        }}
        onSubmit={handleInputAddress}
        fields={[
          {
            label: "Shipping address",
            type: "text",
            value: shippingAddress,
            onChange: (e) => setShippingAddress(e.target.value),
          },
          {
            label: "Note",
            type: "text",
            value: note,
            onChange: (e) => setNote(e.target.value),
          },
          {
            label: "Phone number",
            type: "text",
            value: phone,
            onChange: (e) => setPhone(e.target.value),
          },
        ]}
      />

      <PaymentMethodModal
        isOpen={openModalPaymentMethod}
        onClose={() => setOpenModalPaymentMethod(false)}
        onConfirm={handlePaymentMethod}
      />
    </>
  );
};

export default Order;
