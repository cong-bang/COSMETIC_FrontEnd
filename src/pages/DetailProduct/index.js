import React, { useEffect, useState } from "react";
import styles from "./DetailProduct.module.scss";
import detail1 from "../../assets/images/detail1.png";
import detail2 from "../../assets/images/detail2.png";
import detail3 from "../../assets/images/detail3.png";
import detail4 from "../../assets/images/detail4.png";
import detail5 from "../../assets/images/detail5.png";
import detail6 from "../../assets/images/detail6.png";
import detail8 from "../../assets/images/detail8.png";

import { getProductById } from "../../services/productService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { addToCart } from "../../services/cartService";
import Breadcrumb from "../../components/Breadcrumb";
import { addWishList } from "../../services/wishListService";
import {
  deleteFeedback,
  get2Feedbacks,
  postFeedback,
  updateFeedback,
} from "../../services/feedbackService";
import { getUserById } from "../../services/userService";
import avatar_user from "images/user/avatar_user.png";
import FeedbackModal from "../../components/Modals/FeedbackModal";
import FeedbackForm from "../../components/Modals/FeedbackForm";
import { useSelector } from "react-redux";
import ConfirmDeleteModal from "../../components/Modals/ConfirmDeleteModal";

const DetailProduct = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [reviewerAvatars, setReviewerAvatars] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const [pagination, setPagination] = useState({
    totalCount: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userFromLocal = useSelector((state) => state.user.user);

  //Gọi API Product:
  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await getProductById(id);
        //console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        toast.error("Lỗi khi lấy thông tin sản phẩm");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductById();
  }, [id]);

  useEffect(() => {
    fetchFeedback(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (product && product.productImages.length > 0) {
      setSelectedImage(product.productImages[0].link);
    }
  }, [product]);

  //Get Feedback Product
  const fetchFeedback = async (page) => {
    try {
      const response = await get2Feedbacks(page, pageSize, id);
      setFeedbacks(response.data);
      setPagination(response.pagination);
      response.data.forEach((fb) => {
        if (fb.userId) fetchUser(fb.userId);
      });
    } catch (error) {
      console.error("Lỗi khi lấy feedback:", error);
    }
  };

  const fetchUser = async (userId) => {
    try {
      const res = await getUserById(userId);
      const userName = res.data.userName || "Người dùng ẩn danh";
      const reviewerAvatar = res.data.avatar || avatar_user;
      setUserNames((prev) => ({ ...prev, [userId]: userName }));
      setReviewerAvatars((prev) => ({ ...prev, [userId]: reviewerAvatar }));
    } catch (err) {
      console.error("Lỗi khi lấy tên user:", err);
      setUserNames((prev) => ({ ...prev, [userId]: "Người dùng ẩn danh" }));
      setReviewerAvatars((prev) => ({ ...prev, [userId]: avatar_user }));
    }
  };

  //Pagnation
  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) return;
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.paginationBtn} ${
            currentPage === i ? styles.active : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  //Post Feedback
  const handleFeedbackSubmit = async (formData) => {
    try {
      formData.append("ProductID", id);
      const res = await postFeedback(formData);
      toast.success(res.message);
      setIsModalOpen(false);
      fetchFeedback(currentPage);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsModalOpen(false);
    }
  };

  // Delete Feedback
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await deleteFeedback(deleteId);
      toast.success(res.message);
      fetchFeedback(currentPage);
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    } finally {
      setConfirmOpen(false);
    }
  };

  // Upadte Feedback
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);

  const handleUpdateClick = (feedbackId) => {
    const feedbackToEdit = feedbacks.find((fb) => fb.id === feedbackId);
    setEditingFeedback(feedbackToEdit);
    setIsEditModalOpen(true);
  };

  const handleUpdateFeedbackSubmit = async (formData) => {
    try {
      const res = await updateFeedback(formData);
      toast.success(res.message);
      setIsEditModalOpen(false);
      fetchFeedback(currentPage);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsEditModalOpen(false);
    }
  };

  //Handle Add to Cart
  const handleAddToCart = async () => {
    try {
      const response = await addToCart(product.id);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Thêm vào giỏ hàng thành công!");
      }
    } catch (error) {
      toast.error("Thêm vào giỏ hàng thất bại!");
      console.error(error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  //Add to wish list
  const handleAddWishList = async () => {
    try {
      const data = {
        productId: product.id,
      };
      const response = await addWishList(data);
      toast.success(response.message);
    } catch (error) {
      //toast.error("Thêm vào wishlist thất bại!");
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className={styles.breadcrumb}>
        <Breadcrumb pageName={"Chi tiết sản phẩm"} />
      </div>

      <div className={styles.detailProduct}>
        <div className={styles.contentContainer}>
          {/* <div className={styles.product_Images}>
            <div className={styles.mainImage}>
              <img src={selectedImage} alt="Main product" />
            </div>
            <div className={styles.thumbnails}>
              <div
                className={`${styles.thumbnail} ${
                  selectedImage === detail1 ? styles.active : ""
                }`}
                onClick={() => handleImageClick(detail1)}
              >
                <img src={detail1} alt="Thumbnail 1" />
              </div>
              <div
                className={`${styles.thumbnail} ${
                  selectedImage === detail2 ? styles.active : ""
                }`}
                onClick={() => handleImageClick(detail2)}
              >
                <img src={detail2} alt="Thumbnail 2" />
              </div>
              <div
                className={`${styles.thumbnail} ${
                  selectedImage === detail3 ? styles.active : ""
                }`}
                onClick={() => handleImageClick(detail3)}
              >
                <img src={detail3} alt="Thumbnail 3" />
              </div>
              <div
                className={`${styles.thumbnail} ${
                  selectedImage === detail4 ? styles.active : ""
                }`}
                onClick={() => handleImageClick(detail4)}
              >
                <img src={detail4} alt="Thumbnail 4" />
              </div>
              <div
                className={`${styles.thumbnail} ${
                  selectedImage === detail5 ? styles.active : ""
                }`}
                onClick={() => handleImageClick(detail5)}
              >
                <img src={detail5} alt="Thumbnail 5" />
              </div>
            </div>
          </div> */}
          <div className={styles.product_Images}>
            <div className={styles.mainImage}>
              <img src={selectedImage} alt="Main product" />
            </div>

            <div className={styles.thumbnails}>
              {product?.productImages?.length > 0
                ? product.productImages.map((img) => (
                    <div
                      key={img.id}
                      className={`${styles.thumbnail} ${
                        selectedImage === img.link ? styles.active : ""
                      }`}
                      onClick={() => setSelectedImage(img.link)}
                    >
                      <img src={img.link} alt={`Thumbnail ${img.id}`} />
                    </div>
                  ))
                : [detail1, detail2, detail3, detail4, detail5].map(
                    (img, index) => (
                      <div
                        key={index}
                        className={`${styles.thumbnail} ${
                          selectedImage === img ? styles.active : ""
                        }`}
                        onClick={() => setSelectedImage(img)}
                      >
                        <img src={img} alt={`Thumbnail ${index + 1}`} />
                      </div>
                    )
                  )}
            </div>
          </div>

          <div className={styles.productInfo}>
            <h1 className={styles.productTitle}>
              {product ? product.name : "LA ROCHE-POSAY"}
            </h1>
            <p className={styles.productDescription}></p>
            <div className={styles.productId}>
              Số công bố với bộ Y tế: 175801/22/CBMP-QLD
            </div>
            <div className={styles.ratings}>
              <span>★★★★★</span>{" "}
              <span className={styles.reviewCount}>(10)</span>
            </div>

            <div className={styles.reviewLink}>Xem đánh giá</div>

            <div className={styles.priceContainer}>
              <div className={styles.price}>
                <span className={styles.currentPrice}>
                  {product ? product.price.toLocaleString("vi-VN") : "000.000"}{" "}
                  đ
                </span>
              </div>
              <div className={styles.priceDetails}>
                <span className={styles.discount}>-170.000 đ</span>
                <span className={styles.originalPrice}>
                  {product
                    ? (product.price + 170000).toLocaleString("vi-VN")
                    : "000.000"}{" "}
                  đ
                </span>
              </div>
            </div>

            <div className={styles.sizeContainer}>
              <div className={styles.sizeLabel}>KÍCH THƯỚC:</div>
              <div className={styles.sizeOptions}>
                <button className={`${styles.sizeOption} ${styles.active}`}>
                  {product ? product.capacity : "200"}ml
                </button>
              </div>
            </div>

            <div className={styles.deliveryInfo}>
              <h3>Hình thức giao hàng</h3>
              <div className={styles.deliveryOptions}>
                <div className={styles.deliveryOption}>
                  <div className={styles.radioButton}>
                    <input
                      type="radio"
                      id="standard"
                      name="delivery"
                      defaultChecked
                    />
                    <label htmlFor="standard"></label>
                  </div>
                  <span className={styles.deliveryText}>
                    Tiêu chuẩn (3-5 ngày): miễn phí đơn từ 500.000 VND.
                  </span>
                </div>
                <div className={styles.deliveryOption}>
                  <div className={styles.radioButton}>
                    <input type="radio" id="fast" name="delivery" />
                    <label htmlFor="fast"></label>
                  </div>
                  <span className={styles.deliveryText}>
                    Nhanh (1-2 ngày): áp dụng tại HN, HCM, Đà Nẵng.
                  </span>
                </div>
                <div className={styles.deliveryOption}>
                  <div className={styles.radioButton}>
                    <input type="radio" id="express" name="delivery" />
                    <label htmlFor="express"></label>
                  </div>
                  <span className={styles.deliveryText}>
                    Hỏa tốc (trong ngày): chỉ nội thành HN, HCM.
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.quantityActions}>
              <div className={styles.quantityControls}>
                <button onClick={decrementQuantity}>-</button>
                <input type="text" value={quantity} readOnly />
                <button onClick={incrementQuantity}>+</button>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.addToCart}
                  onClick={handleAddToCart}
                  disabled={!product}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 14.5C6.82843 14.5 7.5 13.8284 7.5 13C7.5 12.1716 6.82843 11.5 6 11.5C5.17157 11.5 4.5 12.1716 4.5 13C4.5 13.8284 5.17157 14.5 6 14.5Z"
                      stroke="#EE6983"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 14.5C13.8284 14.5 14.5 13.8284 14.5 13C14.5 12.1716 13.8284 11.5 13 11.5C12.1716 11.5 11.5 12.1716 11.5 13C11.5 13.8284 12.1716 14.5 13 14.5Z"
                      stroke="#EE6983"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.5 13H2.5V1.5H1"
                      stroke="#EE6983"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.5 1.5L15 2.5L14 8.5H2.5"
                      stroke="#EE6983"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  THÊM VÀO GIỎ HÀNG
                </button>
                <button className={styles.buyNow}>MUA NGAY</button>
                <button className={styles.wishlist} onClick={handleAddWishList}>
                  ♡
                </button>
              </div>
            </div>
          </div>

          <div className={styles.promotionContainer}>
            <div className={styles.promotionBox}>
              <div className={styles.promotionItem}>
                <div className={styles.iconWrapper}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z"
                      stroke="#EE6983"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className={styles.promotionContent}>
                  <span className={styles.promotionTitle}>ƯU ĐÃI ĐẶC BIỆT</span>
                  <span className={styles.promotionDetails}>
                    Hãy sử dụng ưu đãi để tiết kiệm hơn nhé
                  </span>
                </div>
              </div>

              <div className={styles.promotionItem}>
                <div className={styles.iconWrapper}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="#EE6983"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M12 7V12L15 15"
                      stroke="#EE6983"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className={styles.promotionContent}>
                  <span className={styles.promotionTitle}>
                    VOUCHER GIẢM 50...
                  </span>
                  <span className={styles.promotionDetails}>
                    Có giá trị đến hết ngày 28/3/2025
                  </span>
                </div>
              </div>

              <div className={styles.promotionItem}>
                <div className={styles.iconWrapper}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="#EE6983"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M12 7V12L15 15"
                      stroke="#EE6983"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className={styles.promotionContent}>
                  <span className={styles.promotionTitle}>
                    MIỄN PHÍ VẬN CHUYỂN ...
                  </span>
                  <span className={styles.promotionDetails}>
                    Có giá trị đến hết ngày 28/3/2025
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.anessaBanner}>
              <img src={detail6} alt="Anessa Banner" />
            </div>
          </div>
        </div>

        <div className={styles.productDetails}>
          <div className={styles.tabsContainer}>
            <button className={`${styles.tab} ${styles.active}`}>
              CHI TIẾT
            </button>
            <button className={styles.tab}>HƯỚNG DẪN SỬ DỤNG</button>
            <button className={styles.tab}>THÀNH PHẦN</button>
          </div>

          <div className={styles.detailsContent}>
            <div className={styles.leftContent}>
              <div className={styles.productDescription}>
                <p>
                  {product
                    ? product.description
                    : `Puré tự hào mang đến một công thức làm sạch chuyên sâu, kết hợp sức mạnh của khoa học và sự tinh túy từ thiên nhiên để giải quyết các vấn đề về sắc tố da ngay từ bước đầu tiên.`}
                </p>
                {/* <p>Làm sạch sâu với PHA giúp loại bỏ bụi bẩn, tế bào chết.</p>
                <p>
                  Giảm thâm nám nhờ Melasyl, hỗ trợ cải thiện đốm nâu, thâm mụn.
                </p>
                <p>Làm dịu da với Niacinamide, giúp se khít lỗ chân lông.</p>
                <p>Kết cấu gel tạo bọt mịn, dễ dàng làm sạch.</p>
                <p>Phù hợp mọi loại da, kể cả da nhạy cảm!</p> */}
              </div>

              <div className={styles.ratingsContainer}>
                <h3>ĐÁNH GIÁ TRUNG BÌNH</h3>
                <div className={styles.ratingStars}>
                  <span className={styles.stars}>★★★★★</span>
                  <span className={styles.ratingScore}>5.0</span>
                </div>
                <p className={styles.ratingCount}>
                  5 of 5 người tham gia đánh giá đề xuất sản phẩm này
                </p>

                <div className={styles.ratingDetailsGrid}>
                  <div className={styles.ratingCategory}>
                    <span className={styles.categoryName}>Hiệu Quả</span>
                    <span className={styles.categoryScore}>
                      5.0<span className={styles.outOf}>/5</span>
                    </span>
                  </div>
                  <div className={styles.ratingCategory}>
                    <span className={styles.categoryName}>Bao Bì</span>
                    <span className={styles.categoryScore}>
                      5.0<span className={styles.outOf}>/5</span>
                    </span>
                  </div>
                  <div className={styles.ratingCategory}>
                    <span className={styles.categoryName}>Kết Cấu</span>
                    <span className={styles.categoryScore}>
                      5.0<span className={styles.outOf}>/5</span>
                    </span>
                  </div>
                  <div className={styles.ratingCategory}>
                    <span className={styles.categoryName}>Mức Giá</span>
                    <span className={styles.categoryScore}>
                      5.0<span className={styles.outOf}>/5</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.rightContent}>
              <div className={styles.promotionImage}>
                <img src={detail8} alt="Promotion" />
                <div className={styles.productCard}>
                  <div className={styles.productPrice}>
                    <span className={styles.currentProductPrice}>
                      372.000 đ
                    </span>
                    <span className={styles.originalProductPrice}>
                      465.000 đ
                    </span>
                  </div>
                  <div className={styles.productBrand}>Vaseline</div>
                  <div className={styles.productCardTitle}>
                    Sữa Dưỡng Thể Vaseline Sáng Da Chuyên Sâu Ban Đêm 330ml
                  </div>
                  <div className={styles.productRating}>
                    <div className={styles.stars}>★★★★★</div>
                    <div className={styles.ratingCount}>(101)</div>
                    <div className={styles.soldCount}>498</div>
                  </div>
                  <div className={styles.hotSelling}>ĐANG BÁN CHẠY</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.reviewActions}>
          <button className={`${styles.reviewButton} ${styles.active}`}>
            Tất cả đánh giá (5)
          </button>
          <button className={styles.reviewButton}>
            Đánh giá từ chuyên gia (0)
          </button>
          <button className={styles.reviewButton}>
            Đánh giá từ người mua hàng (5)
          </button>
          <button className={styles.reviewButton}>
            Đánh giá có hình ảnh (1)
          </button>
        </div>

        <div className={styles.additionalContent}>
          <div className={styles.leftSection}>
            <div className={styles.userReviews}>
              {/* <div className={styles.reviewItem}>
              <div className={styles.reviewerInfo}>
                <div className={styles.reviewerAvatar}>
                  <img src="https://via.placeholder.com/40" alt="Reviewer" />
                </div>
                <div className={styles.reviewerDetails}>
                  <div className={styles.reviewerName}>Mya Tran</div>
                  <div className={styles.reviewerJoin}>3 ngày trước</div>
                  <div className={styles.reviewerFeatures}>
                    <div>
                      Đặc điểm da: Da dầu, Lỗ chân lông to , Nhiều sợ bã nhờn ,
                      Mụn đầu đen
                    </div>
                  </div>
                  <div className={styles.reviewerTags}>
                    <span className={styles.tag}>Hiệu Quả</span>
                    <span className={styles.tag}>Bao Bì</span>
                    <span className={styles.tag}>Kết Cấu</span>
                    <span className={styles.tag}>Mức Giá</span>
                  </div>
                </div>
              </div>
              <div className={styles.reviewContent}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerName}>Mya Tran</div>
                  <div className={styles.reviewStars}>★★★★★</div>
                  <div className={styles.reviewDate}>15 tháng 3, 2023</div>
                </div>
                <div className={styles.purchaseLabel}>Đã mua hàng</div>
                <div className={styles.reviewProduct}>
                  Phân loại: Sữa rửa mặt 200ml
                </div>
                <div className={styles.reviewText}>
                  <p>
                    Sản phẩm ổn, nhưng bao bì hơi nhỏ mỏi. Giao hàng đúng hẹn.
                  </p>
                </div>
                <div className={styles.reviewerLabel}>Quản trị viên</div>
                <div className={styles.adminResponse}>
                  <p>
                    Cảm ơn bạn đã phản hồi! Bên mình luôn lắng nghe ý kiến từ
                    khách hàng để cải thiện sản phẩm tốt hơn. Mình sẽ gửi góp ý
                    này đến bộ phận sản xuất để điều chỉnh bao bì tiện lợi hơn
                    trong tương lai. Mong bạn tiếp tục ủng hộ nhé!
                  </p>
                </div>
              </div>
            </div> */}

              {/* <div className={styles.reviewItem}>
              <div className={styles.reviewerInfo}>
                <div className={styles.reviewerAvatar}>
                  <img src="https://via.placeholder.com/40" alt="Reviewer" />
                </div>
                <div className={styles.reviewerDetails}>
                  <div className={styles.reviewerName}>Mya Tran</div>
                  <div className={styles.reviewerJoin}>3 ngày trước</div>
                  <div className={styles.reviewerFeatures}>
                    <div>
                      Đặc điểm da: Da dầu, Lỗ chân lông to , Nhiều sợ bã nhờn ,
                      Mụn đầu đen
                    </div>
                  </div>
                  <div className={styles.reviewerTags}>
                    <span className={styles.tag}>Hiệu Quả</span>
                    <span className={styles.tag}>Bao Bì</span>
                    <span className={styles.tag}>Kết Cấu</span>
                    <span className={styles.tag}>Mức Giá</span>
                  </div>
                </div>
              </div>
              <div className={styles.reviewContent}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerName}>Mya Tran</div>
                  <div className={styles.reviewStars}>★★★★★</div>
                  <div className={styles.reviewDate}>15 tháng 3, 2023</div>
                </div>
                <div className={styles.purchaseLabel}>Đã mua hàng</div>
                <div className={styles.reviewProduct}>
                  Phân loại: Sữa rửa mặt 200ml
                </div>
                <div className={styles.reviewText}>
                  <p>
                    Sản phẩm ổn, nhưng bao bì hơi nhỏ mỏi. Giao hàng đúng hẹn.
                  </p>
                </div>
                <div className={styles.reviewerLabel}>Quản trị viên</div>
                <div className={styles.adminResponse}>
                  <p>
                    Cảm ơn bạn đã phản hồi! Bên mình luôn lắng nghe ý kiến từ
                    khách hàng để cải thiện sản phẩm tốt hơn. Mình sẽ gửi góp ý
                    này đến bộ phận sản xuất để điều chỉnh bao bì tiện lợi hơn
                    trong tương lai. Mong bạn tiếp tục ủng hộ nhé!
                  </p>
                </div>
              </div>
            </div> */}

              <div className={styles.ctn_feedback}>
                {/* Button mở modal */}
                <button
                  className={styles.btn_feedback}
                  onClick={() => setIsModalOpen(true)}
                >
                  Viết bình luận
                </button>

                {/* Modal feedback */}
                <FeedbackModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                >
                  <h2>Viết đánh giá sản phẩm</h2>
                  <FeedbackForm onSubmit={handleFeedbackSubmit} />
                </FeedbackModal>
              </div>

              {feedbacks.map((feedback) => (
                <div key={feedback.id} className={styles.reviewItem}>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerAvatar}>
                      <img
                        src={reviewerAvatars[feedback.userId] || "Avatar"}
                        alt="Reviewer"
                      />
                    </div>
                    <div className={styles.reviewerDetails}>
                      <div className={styles.reviewerName}>
                        {userNames[feedback.userId] || "Unknown"}
                      </div>
                      <div className={styles.reviewerJoin}>
                        {new Date(feedback.createAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </div>
                      <div className={styles.reviewerFeatures}>
                        <div>
                          {/* Tạm thời placeholder vì API chưa có */}
                          Đặc điểm da: Chưa cập nhật
                        </div>
                      </div>
                      <div className={styles.reviewerTags}>
                        {/* Tạm thời static */}
                        <span className={styles.tag}>Hiệu Quả</span>
                        <span className={styles.tag}>Bao Bì</span>
                        <span className={styles.tag}>Kết Cấu</span>
                        <span className={styles.tag}>Mức Giá</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.reviewContent}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewerName}>
                        {userNames[feedback.userId] || "Unknown"}
                      </div>
                      <div className={styles.reviewStars}>
                        {"★".repeat(feedback.star)}
                        {"☆".repeat(5 - feedback.star)}
                      </div>
                      <div className={styles.reviewDate}>
                        {new Date(feedback.createAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </div>
                    </div>

                    <div className={styles.purchaseLabel}>Đã mua hàng</div>

                    <div className={styles.reviewProduct}>
                      Phân loại:{" "}
                      {product ? product.category.categoryName : `Pure`}
                    </div>

                    <div className={styles.reviewText}>
                      <p>{feedback.comment}</p>
                      <img src={feedback.evidence || ""} />
                    </div>

                    {feedback.adminComment && (
                      <>
                        <div className={styles.reviewerLabel}>
                          Quản trị viên
                        </div>
                        <div className={styles.adminResponse}>
                          <p>{feedback.adminComment}</p>
                        </div>
                      </>
                    )}

                    {/* {feedback.userId == userFromLocal.id && (
                  <div className={styles.actions}>
                      <span onClick={(e) => { e.preventDefault();  handleUpdateClick(feedback.id); }}>
                        Sửa đánh giá
                      </span>
                  </div>
                )} */}
                  </div>
                </div>
              ))}

              {/* <div className={styles.pagination}>
              <span className={styles.paginationText}>1 - 16 trên 1110</span>
              <div className={styles.paginationControls}>
                <button className={styles.paginationBtn}>&lt;&lt;</button>
                <button className={styles.paginationBtn}>&lt;</button>
                <button className={`${styles.paginationBtn} ${styles.active}`}>
                  1
                </button>
                <button className={styles.paginationBtn}>2</button>
                <button className={styles.paginationBtn}>3</button>
                <span className={styles.paginationEllipsis}>...</span>
                <button className={styles.paginationBtn}>40</button>
                <button className={styles.paginationBtn}>&gt;</button>
                <button className={styles.paginationBtn}>&gt;&gt;</button>
              </div>
            </div> */}

              {feedbacks.length > 0 && (
                <div className={styles.pagination}>
                  <span className={styles.paginationText}>
                    {pagination.totalCount > 0
                      ? `${(currentPage - 1) * pageSize + 1} - ${Math.min(
                          currentPage * pageSize,
                          pagination.totalCount
                        )} trên ${pagination.totalCount}`
                      : "0 / 0"}
                  </span>
                  <div className={styles.paginationControls}>
                    <button
                      className={styles.paginationBtn}
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                    >
                      &lt;&lt;
                    </button>
                    <button
                      className={styles.paginationBtn}
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={!pagination.hasPrevious}
                    >
                      &lt;
                    </button>

                    {renderPageNumbers()}

                    <button
                      className={styles.paginationBtn}
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={!pagination.hasNext}
                    >
                      &gt;
                    </button>
                    <button
                      className={styles.paginationBtn}
                      onClick={() => handlePageChange(pagination.totalPages)}
                      disabled={currentPage === pagination.totalPages}
                    >
                      &gt;&gt;
                    </button>
                  </div>
                </div>
              )}

              <div className={styles.realStories}>
                <h3>Real Stories, Real Experiences</h3>
              </div>
            </div>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.additionalPromotion}>
              <img src={detail8} alt="Additional Promotion" />
              <div className={styles.productCard}>
                <div className={styles.productPrice}>
                  <span className={styles.currentProductPrice}>372.000 đ</span>
                  <span className={styles.originalProductPrice}>465.000 đ</span>
                </div>
                <div className={styles.productBrand}>Vaseline</div>
                <div className={styles.productCardTitle}>
                  Sữa Dưỡng Thể Vaseline Sáng Da Chuyên Sâu Ban Đêm 330ml
                </div>
                <div className={styles.productRating}>
                  <div className={styles.stars}>★★★★★</div>
                  <div className={styles.ratingCount}>(101)</div>
                  <div className={styles.soldCount}>498</div>
                </div>
                <div className={styles.hotSelling}>ĐANG BÁN CHẠY</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.relatedProductsSection}>
          <h2 className={styles.sectionTitle}>SẢN PHẨM CÙNG THƯƠNG HIỆU</h2>

          <div className={styles.relatedProducts}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={styles.relatedProductItem}>
                <div className={styles.relatedProductImage}>
                  <img src={detail8} alt="Related Product" />
                  <div className={styles.promoDate}>20.03</div>
                </div>
                <div className={styles.relatedProductInfo}>
                  <div className={styles.relatedProductPrice}>
                    <span className={styles.currentPrice}>372.000 đ</span>
                    <span className={styles.originalPrice}>465.000 đ</span>
                  </div>
                  <div className={styles.relatedProductBrand}>
                    LA ROCHE-POSAY
                  </div>
                  <div className={styles.relatedProductName}>
                    Kem Chống Nắng SPF Rộng Nâng Tông Kiềm Dầu
                  </div>
                  <div className={styles.relatedProductRating}>
                    <div className={styles.stars}>★★★★★</div>
                    <span className={styles.rateCount}>5.0 (101)</span>
                    <span className={styles.soldCount}>498</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.compareSection}>
          <h2 className={styles.compareTitle}>SO SÁNH LỰA CHỌN CỦA BẠN</h2>

          <div className={styles.compareTable}>
            <div className={styles.compareRow}>
              <div className={styles.compareCategory}></div>
              <div
                className={`${styles.compareProduct} ${styles.currentProduct}`}
              >
                <div className={styles.currentLabel}>Hiện tại</div>
                <div className={styles.productImage}>
                  <img src={detail1} alt="Current Product" />
                </div>
                <div className={styles.productName}>
                  Kem Chống Nắng, Phổ Rộng Nâng Tông Kiềm Dầu
                </div>
              </div>
              <div className={styles.compareProduct}>
                <div className={styles.productImage}>
                  <img src={detail2} alt="Compare Product 1" />
                </div>
                <div className={styles.productName}>
                  Kem Chống Nắng, Phổ Rộng Nâng Tông Kiềm Dầu
                </div>
              </div>
              <div className={styles.compareProduct}>
                <div className={styles.productImage}>
                  <img src={detail3} alt="Compare Product 2" />
                </div>
                <div className={styles.productName}>
                  Kem Chống Nắng, Phổ Rộng Nâng Tông Kiềm Dầu
                </div>
              </div>
              <div className={styles.compareProduct}>
                <div className={styles.productImage}>
                  <img src={detail4} alt="Compare Product 3" />
                </div>
                <div className={styles.productName}>
                  Kem Chống Nắng, Phổ Rộng Nâng Tông Kiềm Dầu
                </div>
              </div>
            </div>

            <div className={styles.compareRow}>
              <div className={styles.compareCategory}>Giá</div>
              <div className={styles.compareProduct}>
                <div className={styles.priceInfo}>
                  <div className={styles.currentPrice}>499.900 đ</div>
                  <div className={styles.discountInfo}>
                    <span className={styles.discountAmount}>-270.100 đ</span>
                    <span className={styles.originalPrice}>770.000 đ</span>
                  </div>
                </div>
              </div>
              <div className={styles.compareProduct}>
                <div className={styles.priceInfo}>
                  <div className={styles.currentPrice}>499.900 đ</div>
                  <div className={styles.discountInfo}>
                    <span className={styles.discountAmount}>-270.100 đ</span>
                    <span className={styles.originalPrice}>770.000 đ</span>
                  </div>
                </div>
              </div>
              <div className={styles.compareProduct}>
                <div className={styles.priceInfo}>
                  <div className={styles.currentPrice}>499.900 đ</div>
                  <div className={styles.discountInfo}>
                    <span className={styles.discountAmount}>-270.100 đ</span>
                    <span className={styles.originalPrice}>770.000 đ</span>
                  </div>
                </div>
              </div>
              <div className={styles.compareProduct}>
                <div className={styles.priceInfo}>
                  <div className={styles.currentPrice}>499.900 đ</div>
                  <div className={styles.discountInfo}>
                    <span className={styles.discountAmount}>-270.100 đ</span>
                    <span className={styles.originalPrice}>770.000 đ</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.compareRow}>
              <div className={styles.compareCategory}>
                Đánh
                <br />
                Giá
              </div>
              <div className={styles.compareProduct}>
                <div className={styles.ratingStars}>
                  ★★★★★ <span className={styles.ratingCount}>(54)</span>
                </div>
              </div>
              <div className={styles.compareProduct}>
                <div className={styles.ratingStars}>
                  ★★★★★ <span className={styles.ratingCount}>(54)</span>
                </div>
              </div>
              <div className={styles.compareProduct}>
                <div className={styles.ratingStars}>
                  ★★★★★ <span className={styles.ratingCount}>(54)</span>
                </div>
              </div>
              <div className={styles.compareProduct}>
                <div className={styles.ratingStars}>
                  ★★★★★ <span className={styles.ratingCount}>(54)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.relatedSection}>
          <div className={styles.relatedHeader}>
            <h2 className={styles.relatedTitle}>SẢN PHẨM LIÊN QUAN</h2>
            <div className={styles.relatedTags}>
              <button className={styles.relatedTag}>MUA LÁ CÓ QUÀ</button>
              <button className={styles.relatedTag}>MUA 2 TẶNG 1</button>
              <button className={styles.relatedTag}>ĐỘC QUYỀN ONLINE</button>
              <button className={`${styles.relatedTag} ${styles.viewAll}`}>
                XEM TẤT CẢ <span className={styles.arrowRight}>&#8250;</span>
              </button>
            </div>
          </div>

          <div className={styles.relatedSlider}>
            <button className={styles.sliderArrow}>&#8249;</button>

            <div className={styles.relatedItems}>
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className={styles.relatedItem}>
                  <div className={styles.relatedItemImage}>
                    <img src={detail8} alt="Related Product" />
                    <div className={styles.discountLabel}>
                      <div className={styles.discountTop}>GIẢM CÒN</div>
                      <div className={styles.discountPrice}>106.000 đ</div>
                    </div>
                    <div className={styles.dateLabel}>20.03</div>
                  </div>
                  <div className={styles.relatedItemInfo}>
                    <div className={styles.relatedItemBrand}>COCOON</div>
                    <div className={styles.relatedItemName}>
                      Tinh Chất Nghệ Hưng Yên C22 Cocoon 30ml
                    </div>
                    <div className={styles.relatedItemRating}>
                      <span className={styles.stars}>★★★★★</span>
                      <span className={styles.ratingValue}>5.0 (101)</span>
                      <span className={styles.soldValue}>498</span>
                    </div>
                    <div className={styles.relatedItemPrices}>
                      <span className={styles.currentPrice}>372.000 đ</span>
                      <span className={styles.originalPrice}>465.000 đ</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className={styles.sliderArrow}>&#8250;</button>
          </div>
        </div>

        <div className={styles.trustSection}>
          <div className={styles.trustContainer}>
            <div className={styles.trustItem}>
              <div className={styles.trustTitle}>CHỈ CÓ TẠI PURÊ</div>
              <div className={styles.trustPhone}>
                <div className={styles.trustLabel}>HOTLINE CSKH</div>
                <button className={styles.trustButton}>1800 5593</button>
              </div>
              <div className={styles.trustSupport}>
                <button className={styles.trustButton}>Hệ Thống PURÊ</button>
              </div>
            </div>

            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>
                <img src="https://via.placeholder.com/80" alt="Authentic" />
              </div>
              <div className={styles.trustTitle}>SẢN PHẨM THẬT</div>
              <div className={styles.trustDesc}>
                100% sản phẩm chính hãng được chứng nhận từ Bộ Y Tế
              </div>
            </div>

            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>
                <img
                  src="https://via.placeholder.com/80"
                  alt="Special offers"
                />
              </div>
              <div className={styles.trustTitle}>ƯU ĐÃI THẬT</div>
              <div className={styles.trustDesc}>
                Mua sắm tiết kiệm hơn cùng vô vàn ưu đãi độc quyền
              </div>
            </div>

            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>
                <img src="https://via.placeholder.com/80" alt="Sharing" />
              </div>
              <div className={styles.trustTitle}>CHIA SẺ THẬT</div>
              <div className={styles.trustDesc}>
                Hàng ngàn chia sẻ từ trải nghiệm thực tế của khách hàng
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={confirmOpen}
        message="Bạn có chắc muốn xoá đánh giá này không?"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />

      <FeedbackModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <FeedbackForm
          onSubmit={handleUpdateFeedbackSubmit}
          initialValues={editingFeedback}
        />
      </FeedbackModal>
    </>
  );
};

export default DetailProduct;
