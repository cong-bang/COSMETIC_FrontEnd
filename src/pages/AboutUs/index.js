import React from 'react'
import styles from "./AboutUs.module.scss"
import Header from "components/Layout/Header"
import Footer from "components/Layout/Footer"
import aboutus from 'images/aboutus.png'
import aboutus_1 from 'images/aboutus_1.png'
import aboutus_2 from 'images/aboutus_2.png'
import aboutus_3 from 'images/aboutus_3.png'

const AboutUs = () => {
  return (
    <>
    <Header />
        <div className={styles.container}>
            <h2 className={styles.section_title}>VỀ PURÉ</h2>

            <div className={styles.about_pure_intro}>
                <div className={styles.about_pure_image}>
                    <img src={aboutus} alt="Puré" />
                </div>
                <div className={styles.about_pure_text}>
                    <h3>YÊN TÂM MUA HÀNG THẬT. THẬT LÀ PURÉ: </h3>
                    <p>Là nền tảng làm đẹp toàn diện và đáng tin cậy hàng đầu tại Việt Nam , Puré vinh hạnh đem đến một trải nghiệm mua sắm các sản phẩm làm đẹp và chăm sóc sắc đẹp thông minh, thú vị và an toàn cho người tiêu dùng tại Việt Nam</p>
                    <h3>ĐỐI VỚI CHÚNG TÔI, SẢN PHẨM THẬT LÀ SẢN PHẨM CHÍNH HÃNG VÀ PHẢI CÓ CHỨNG NHẬN CÔNG BỐ MỸ PHẨM TẠI CỤC QUẢN LÝ DƯỢC - BỘ Y TẾ VIỆT NAM</h3>
                    <p>Với Puré, nghiêm túc lựa chọn và kiểm tra nhằm đảm bảo nguồn gốc lẫn chất lượng của mỹ phẩm là cực kỳ quan trọng đối với làn da phái đẹp, bởi sử dụng những sản phẩm làm giả hoặc không rõ nguồn gốc có thể khiến làn da bạn bị tổn hại nghiêm trọng.</p>
                    <p>Vì thế Puré hợp tác trực tiếp với nhà phân phối chính thức quốc tế và Việt Nam đế đảm bảo rằng tất cả những sản phẩm bạn mua tại Puré đều là hàng chính hãng với chứng nhận công bố mỹ phẩm tại Cục Quản Lý Dược - Bộ Y Tế Việt Nam</p>
                    <p>Bên cạnh đó, hệ thống quản lý vận hành của Puré cam kết chất lượng sản phẩm lưu kho đạt tiêu chuẩn quốc tế khắt khe và tuân thủ theo hướng dẫn của các thương hiệu đối tác. Chúng tôi cam kết làm việc chặt chẽ với các đối tác kinh doanh thứ 3 nhằm đem 3 lại chất lượng dịch vụ tối ưu cho người tiêu dùng Việt Nam như giao nhận hàng hóa, phương thức thanh toán, chính sách đổi trả và dịch vụ hậu mãi.</p>
                    <p>Với phương châm "Thật là Puré", chúng tôi cam kết sản phẩm thật - chất lượng thật - phục vụ tận tâm và chân thật!</p>
                </div>
            </div>

            <div className={styles.pure_info_section}>
                <div className={styles.left_column}>
                    <p className={styles.title}>Chỉ có tại Puré</p>
                    <p className={styles.hotline_label}>Hotline CSKH</p>
                    <div className={styles.hotline_number}>1800 5593</div>
                </div>

                <div className={styles.right_column}>
                    <div className={styles.info_box}>
                    <img src={aboutus_1} alt="Sản phẩm thật" />
                    <h4>Sản phẩm thật</h4>
                    <p>100% sản phẩm chính hãng được chứng nhận từ Bộ Y Tế</p>
                    </div>
                    <div className={styles.info_box}>
                    <img src={aboutus_2} alt="Ưu đãi thật" />
                    <h4>Ưu đãi thật</h4>
                    <p>Mua sắm tiết kiệm hơn cùng vô vàn ưu đãi độc quyền</p>
                    </div>
                    <div className={styles.info_box}>
                    <img src={aboutus_3} alt="Chia sẻ thật" />
                    <h4>Chia sẻ thật</h4>
                    <p>Hàng ngàn chia sẻ từ trải nghiệm thực tế của khách hàng</p>
                    </div>
                </div>
            </div>
        </div>
    <Footer />
    </>
  )
}

export default AboutUs;