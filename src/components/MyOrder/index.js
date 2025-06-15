// import React, { useState } from 'react';
// import styles from './MyOrder.module.scss';
// import calendar_icon from 'images/calendar_icon.png'
// import product_ordered from 'images/product_ordered.png'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTruck, faStore  } from '@fortawesome/free-solid-svg-icons';


// const MyOrder = () => {
//     const tabs = ["Tất cả", "Xác nhận", "Vận chuyển", "Đã hoàn thành", "Đã huỷ"];
//     const [activeTab, setActiveTab] = useState("Tất cả");

//   return (
//     <div className={styles.my_order}>
//     <div className={styles.order_tabs}>
//         {tabs.map((tab) => (
//         <button
//             key={tab}
//             className={activeTab === tab ? styles.active : ""}
//             onClick={() => setActiveTab(tab)}
//         >
//             {tab}
//         </button>
//         ))}
//     </div>

//       <div className={styles.order_item}>
//         <div className={styles.order_header}>
//           <div className={styles.faStore_icon}>
//             <FontAwesomeIcon icon={faStore} className={styles.icon}/>
//           </div>
//           <div className={styles.order_status}>
//             <FontAwesomeIcon icon={faTruck} />
//             <span>Đơn hàng đã được giao thành công</span>
//           </div>
//         </div>

//         <div className={styles.order_product}>
//           <div className={styles.product_info}>
//             <img src={product_ordered} alt="product" />
//             <div className={styles.name_and_weight}>
//               <p className={styles.name}>Tinh Chất Nghệ Hưng Yên C22 Cocoon 30ml</p>
//               <p>30ml</p>
//             </div>
//             <span>x1</span>
//             <span className={styles.price}>200,000 VNĐ</span>
//           </div>

//           <div className={styles.product_info}>
//             <img src={product_ordered} alt="product" />
//             <div className={styles.name_and_weight}>
//               <p className={styles.name}>Tinh Chất Nghệ Hưng Yên C22 Cocoon 30ml</p>
//               <p>30ml</p>
//             </div>
//             <span>x1</span>
//             <span className={styles.price}>180,000 VNĐ</span>
//           </div>
//         </div>

//         <div className={styles.total}>
//           <span>Tổng</span>
//           <span className={styles.total_price}>405,00 VNĐ</span>
//         </div>

//         <div className={styles.order_actions}>
//           <button className={styles.btn_review}>Đánh giá</button>
//           <button className={styles.btn_rebuy}>Mua lại</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyOrder;

import React, { useState, useEffect } from 'react';
import { getOrderByUserId } from '../../services/orderService';
import { getProductById } from '../../services/productService'; // thêm dòng này
import styles from './MyOrder.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faStore } from '@fortawesome/free-solid-svg-icons';
import product_ordered from 'images/product_ordered.png';

const MyOrder = () => {
  const tabs = ["Tất cả", "Xác nhận", "Vận chuyển", "Đã hoàn thành", "Đã huỷ"];
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [orders, setOrders] = useState([]);
  const [productsMap, setProductsMap] = useState({});

  useEffect(() => {
    const fetchOrdersAndProducts = async () => {
      const res = await getOrderByUserId();
      if (res && res.statusCode === 200) {
        const ordersData = res.data.data;
        setOrders(ordersData);

        // Lấy tất cả productId từ orderDetails
        const productIds = [
          ...new Set(ordersData.flatMap(order => order.orderDetails.map(item => item.productId)))
        ];

        // Gọi API lấy thông tin từng product
        const productPromises = productIds.map(id => getProductById(id));
        const productsResponses = await Promise.all(productPromises);

        // Tạo map productId -> productData
        const map = {};
        productsResponses.forEach(productRes => {
          if (productRes.statusCode === 200) {
            const product = productRes.data;
            map[product.id] = product;
          }
        });

        setProductsMap(map);
      }
    };

    fetchOrdersAndProducts();
  }, []);

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
                {order.status === 0 ? "Chờ xác nhận" : order.status === 1 ? "Đang vận chuyển" : "Đã giao thành công"}
              </span>
            </div>
          </div>

          <div className={styles.order_product}>
            {order.orderDetails.map((item, index) => (
              <div key={index} className={styles.product_info}>
                <img src={product_ordered} alt="product" />
                <div className={styles.name_and_weight}>
                  <p className={styles.name}>
                    {productsMap[item.productId]?.name || `Sản phẩm ID: ${item.productId}`}
                  </p>
                  <p>{productsMap[item.productId]?.capacity ? `${productsMap[item.productId].capacity}ml` : "30ml"}</p>
                </div>
                <span>x{item.quantity}</span>
                <span className={styles.price}>{item.price.toLocaleString() || item.price} VNĐ</span>
              </div>
            ))}
          </div>

          <div className={styles.total}>
            <span>Tổng</span>
            <span className={styles.total_price}>{order.total.toLocaleString() || order.total} VNĐ</span>
          </div>

          <div className={styles.order_actions}>
            <button className={styles.btn_review}>Đánh giá</button>
            <button className={styles.btn_rebuy}>Mua lại</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrder;
