import React, { useState, useEffect } from "react";
import { getOrderByUserId } from "../../services/orderService";
import { getProductById } from "../../services/productService";
import styles from "./MyOrder.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faStore } from "@fortawesome/free-solid-svg-icons";
import product_ordered from "images/product_ordered.png";
import { toast } from "react-toastify";

const MyOrder = () => {
  const tabs = ["Tất cả", "Xác nhận", "Vận chuyển", "Đã hoàn thành", "Đã huỷ"];
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [orders, setOrders] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrdersAndProducts = async () => {
      try {
        const res = await getOrderByUserId(currentPage, 3);
        if (res && res.data) {
          const ordersData = res.data;

          setOrders(ordersData);
          setTotalPages(res.pagination.totalPages);

          const productIds = [
            ...new Set(
              ordersData.flatMap((order) =>
                order.orderDetails.map((item) => item.productId)
              )
            ),
          ];

          const productPromises = productIds.map((id) => getProductById(id));
          const productsResponses = await Promise.all(productPromises);

          const map = {};
          productsResponses.forEach((productRes) => {
            if (productRes.statusCode === 200) {
              const product = productRes.data;
              map[product.id] = product;
            }
          });
          setProductsMap(map);
        }
      } catch (error) {
        console.error("Lỗi khi lấy đơn hàng hoặc sản phẩm:", error);
        toast.error("Không thể tải dữ liệu đơn hàng. Vui lòng thử lại sau.");
      }
    };

    fetchOrdersAndProducts();
  }, [currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.my_order}>
      <div className={styles.order_tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? styles.active : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {orders.map((order) => (
        <div key={order.code} className={styles.order_item}>
          <div className={styles.order_header}>
            <div className={styles.faStore_icon}>
              <FontAwesomeIcon icon={faStore} className={styles.icon} />
            </div>
            <div className={styles.order_status}>
              <FontAwesomeIcon icon={faTruck} />
              <span>
                {order.status === 0
                  ? "Chờ xác nhận"
                  : order.status === 1
                  ? "Đang vận chuyển"
                  : "Đã giao thành công"}
              </span>
            </div>
          </div>

          <div className={styles.order_product}>
            {order.orderDetails.map((item, index) => (
              <div key={index} className={styles.product_info}>
                <img
                  src={
                    productsMap[item.productId]?.productImages[0]?.link ||
                    product_ordered
                  }
                  alt="product"
                />
                <div className={styles.name_and_weight}>
                  <p className={styles.name}>
                    {productsMap[item.productId]?.name ||
                      `Sản phẩm ID: ${item.productId}`}
                  </p>
                  <p>
                    {productsMap[item.productId]?.capacity
                      ? `${productsMap[item.productId].capacity}ml`
                      : "30ml"}
                  </p>
                </div>
                <span>x{item.quantity}</span>
                <span className={styles.price}>
                  {item.price.toLocaleString() || item.price} VNĐ
                </span>
              </div>
            ))}
          </div>

          <div className={styles.total}>
            <span>Tổng</span>
            <span className={styles.total_price}>
              {order.total.toLocaleString() || order.total} VNĐ
            </span>
          </div>

          <div className={styles.order_actions}>
            <button className={styles.btn_review}>Đánh giá</button>
            <button className={styles.btn_rebuy}>Mua lại</button>
          </div>
        </div>
      ))}

      {orders.length > 0 && totalPages > 1 && (
        <div className={styles.pagination}>
          <button onClick={() => goToPage(1)} disabled={currentPage === 1}>
            {"«"}
          </button>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={currentPage === page ? styles.active : ""}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            {"»"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
