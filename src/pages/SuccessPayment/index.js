import React from 'react'
import styles from "./SuccessPayment.module.scss"
import Header from "components/Layout/Header"
import Footer from "components/Layout/Footer"
import success_icon from 'images/success_icon.png'


const SuccessPayment = () => {
  return (
    <>
    <Header />
    <div className={styles.container}>
      <img src={success_icon} alt="Success" className={styles.success_icon} />
      <h2>Cảm ơn bạn!</h2>
      <p className={styles.order_id}>
        Mã đặt hàng: <span>167499587JKP</span>
      </p>
      <p className={styles.description}>
        Cảm ơn bạn đã sử dụng dịch vụ của Puré. <br />
        Nếu bạn có bất kỳ vấn đề gì, vui lòng liên hệ với chúng tôi.
      </p>

      <div className={styles.btn_group}>
        <button className={`${styles.btn} ${styles.primary}`}>Tiếp tục mua sắm</button>
        <button className={`${styles.btn} ${styles.primary}`}>Chi tiết đơn hàng</button>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default SuccessPayment;