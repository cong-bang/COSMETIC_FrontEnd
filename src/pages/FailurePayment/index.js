import React from 'react'
import styles from "./FailurePayment.module.scss"
import Header from "components/Layout/Header"
import Footer from "components/Layout/Footer"
import failure_icon from 'images/failure_icon.png'
import { useNavigate } from 'react-router-dom'


const FailurePayment = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/");
    }
  return (
    <>
    <Header />
    <div className={styles.container}>
      <img src={failure_icon} alt="Failure" className={styles.failure_icon} />
      <h2>Thanh toán không thành công!</h2>
      <p className={styles.description}>
        Cảm ơn bạn đã sử dụng dịch vụ của Puré. <br />
        Nếu bạn có bất kỳ vấn đề gì, vui lòng liên hệ với chúng tôi.
      </p>

      <div className={styles.btn_group}>
        <button className={`${styles.btn} ${styles.primary}`} onClick={handleNavigate}>Quay lại</button>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default FailurePayment;