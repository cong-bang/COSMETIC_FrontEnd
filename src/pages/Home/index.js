import React, { useState, useRef, useEffect } from "react";
//import className và scss
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
// Import hình ảnh
import img1 from "../../assets/images/imagehome/1.png";
import img2 from "../../assets/images/imagehome/2.png";
import img3 from "../../assets/images/imagehome/3.png";
import img4 from "../../assets/images/imagehome/4.png";
import img5 from "../../assets/images/imagehome/5.png";
import img6 from "../../assets/images/imagehome/6.png";
import img7 from "../../assets/images/imagehome/7.png";
import img8 from "../../assets/images/imagehome/8.png";
import img9 from "../../assets/images/imagehome/9.png";
import img10 from "../../assets/images/imagehome/10.png";
import img11 from "../../assets/images/imagehome/11.png";
import img12 from "../../assets/images/imagehome/12.png";
import img13 from "../../assets/images/imagehome/13.png";
import img14 from "../../assets/images/imagehome/14.png";
import img15 from "../../assets/images/imagehome/15.png";
import img16 from "../../assets/images/imagehome/16.png";
import img17 from "../../assets/images/imagehome/17.png";
import img18 from "../../assets/images/imagehome/18.png";
import img19 from "../../assets/images/imagehome/19.png";
import img20 from "../../assets/images/imagehome/20.jpg";
import img21 from "../../assets/images/imagehome/21.jpg";
import img22 from "../../assets/images/imagehome/22.png";
import img23 from "../../assets/images/imagehome/23.jpg";
import img24 from "../../assets/images/imagehome/24.jpg";
import img25 from "../../assets/images/imagehome/25.jpg";
import img26 from "../../assets/images/imagehome/26.png";
import img27 from "../../assets/images/imagehome/27.jpg";
import img28 from "../../assets/images/imagehome/28.jpg";
import img29 from "../../assets/images/imagehome/29.png";
import img30 from "../../assets/images/imagehome/30.png";
import img31 from "../../assets/images/imagehome/31.png";
import img32 from "../../assets/images/imagehome/32.png";
import img33 from "../../assets/images/imagehome/33.png";
import img34 from "../../assets/images/imagehome/34.png";
import img35 from "../../assets/images/imagehome/35.png";
import img36 from "../../assets/images/imagehome/36.png";
import img37 from "../../assets/images/imagehome/37.png";
import img38 from "../../assets/images/imagehome/38.jpg";
import img39 from "../../assets/images/imagehome/39.png";
import img40 from "../../assets/images/imagehome/40.png";
import img41 from "../../assets/images/imagehome/41.png";
import img42 from "../../assets/images/imagehome/42.png";
import heroBanner from "../../assets/herobannerr.png";

import notfound_product from "images/notfound_product.png";

// Import Slick Carousel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { get5Products, get12Products } from "../../services/productService";
import { Link, NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

// Cập nhật bannerSlides để sử dụng heroBanner
const bannerSlides = [
  { img: heroBanner, alt: "Săn Deal Yêu Thương" },
  // Nếu có nhiều slide, thêm vào đây
];

const productCards = [
  {
    name: "Tinh Chất Nghệ Hưng Yên C22 Cocoon 30ml",
    originalPrice: 465000,
    salePrice: 372000,
    rating: 5.0,
    reviews: 101,
    discount: "20.03",
  },
  {
    name: "Tinh Chất Nghệ Hưng Yên C22 Cocoon 30ml",
    originalPrice: 465000,
    salePrice: 372000,
    rating: 5.0,
    reviews: 101,
    discount: "20.03",
  },
  {
    name: "Tinh Chất Nghệ Hưng Yên C22 Cocoon 30ml",
    originalPrice: 465000,
    salePrice: 372000,
    rating: 5.0,
    reviews: 101,
    discount: "20.03",
  },
  {
    name: "Tinh Chất Nghệ Hưng Yên C22 Cocoon 30ml",
    originalPrice: 465000,
    salePrice: 372000,
    rating: 5.0,
    reviews: 101,
    discount: "20.03",
  },
  {
    name: "Tinh Chất Nghệ Hưng Yên C22 Cocoon 30ml",
    originalPrice: 465000,
    salePrice: 372000,
    rating: 5.0,
    reviews: 101,
    discount: "20.03",
  },
];

// Voucher data
const voucherData = [
  {
    discount: "30%",
    condition: "Tới đa 30k",
    description: "Cho đơn hàng từ 100k",
  },
  {
    discount: "50%",
    condition: "Tới đa 499k",
    description: "Áp dụng từ thứ 4 trên Shopee PCMR App",
  },
  {
    discount: "15%",
    condition: "Tới đa 100k",
    description: "Áp dụng đơn hàng đầu tiên trên PCMR App",
  },
  {
    discount: "30%",
    condition: "Tới đa 30k",
    description: "Cho đơn hàng từ 100k",
  },
];

// Tag buttons for popular products
const tagButtons = ["MUA LÀ CÓ QUÀ", "MUA 2 TẶNG 1", "ĐỘC QUYỀN ONLINE"];

// Category data
const categories = [
  { name: "Son Môi", icon: "lipstick-icon" },
  { name: "Tẩy Trang", icon: "cleanser-icon" },
  { name: "Chống Nắng", icon: "sunscreen-icon" },
  { name: "Sữa rửa mặt", icon: "facewash-icon" },
  { name: "Trang Điểm", icon: "makeup-icon" },
  { name: "Dầu Gội", icon: "shampoo-icon" },
  { name: "Sữa Tắm", icon: "shower-icon" },
  { name: "Dưỡng thể", icon: "lotion-icon" },
];

const categoryImages = [img16, img17, img18, img19, img20, img21, img22, img23];

// Health & Beauty Services data
const healthBeautyServices = [
  {
    id: 1,
    title: "Gift Finder",
    subtitle: "Gợi ý quà tặng cho người thân yêu",
    image: img3,
    buttonText: "CHI TIẾT",
  },
  {
    id: 2,
    title: "Trạm Voucher",
    subtitle: "Ưu đãi theo mùa - Voucher hấp dẫn",
    image: img4,
    buttonText: "CHI TIẾT",
  },
  {
    id: 3,
    title: "Foundation Finder",
    subtitle: "Chọn màu kem nền hoàn hảo dành cho bạn",
    image: img5,
    buttonText: "CHI TIẾT",
  },
  {
    id: 4,
    title: "Skincare Lab",
    subtitle: "Công nghệ AI phân tích làn da của bạn",
    image: img6,
    buttonText: "CHI TIẾT",
  },
  {
    id: 5,
    title: "Skin Scanner",
    subtitle: "Chăm sóc da thông minh với công nghệ mới",
    image: img7,
    buttonText: "CHI TIẾT",
  },
  {
    id: 6,
    title: "Beauty Tools",
    subtitle: "Dụng cụ làm đẹp chính hãng",
    image: img3, // Using existing image as placeholder
    buttonText: "CHI TIẾT",
  },
];

const healthBeautyImages = [img24, img25, img26, img27, img28, img28];

// Popular brands data
const popularBrands = [
  {
    id: 1,
    name: "TSUBAKI",
    image: img3, // Using placeholder image
    background: "#FFF9F2", // Light cream background
    logo: img3, // Using placeholder for logo
  },
  {
    id: 2,
    name: "SENKA",
    image: img4, // Using placeholder image
    background: "#F0F8FF", // Light blue background
    logo: img4, // Using placeholder for logo
  },
  {
    id: 3,
    name: "COCOON",
    image: img5, // Using placeholder image
    background: "#FFFAF0", // Light gold background
    logo: img5, // Using placeholder for logo
  },
  {
    id: 4,
    name: "Simple",
    image: img6, // Using placeholder image
    background: "#F0FFF0", // Light green background
    logo: img6, // Using placeholder for logo
  },
  {
    id: 5,
    name: "LANEIGE",
    image: img7, // Using placeholder image
    background: "#F0F8FF", // Light blue background
    logo: img7, // Using placeholder for logo
  },
  {
    id: 6,
    name: "The Ordinary",
    image: img3, // Using placeholder image
    background: "#FFF5F5", // Light pink background
    logo: img3, // Using placeholder for logo
  },
];

const popularBrandsImages = [img29, img30, img31, img32];
const popularBrandsLogos = [img33, img34, img35, img36];

// Beauty news data
const beautyNews = [
  {
    id: 1,
    title: "Lorem Ipsum Lorem Ipsum",
    date: "01.01.25",
    image: img3,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    id: 2,
    title: "Lorem Ipsum Lorem Ipsum",
    date: "01.01.25",
    image: img4,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    id: 3,
    title: "Lorem Ipsum Lorem Ipsum",
    date: "01.01.25",
    image: img5,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
];

const beautyNewsImages = [img37, img38, img39];

// Trust badges data
const trustBadges = [
  {
    id: 1,
    title: "CHỈ CÓ TẠI PURE",
    subtitle: "HOTLINE 0946 581 586",
    buttonText: "1800 5593",
    icon: img3, // Using placeholder for icon
  },
  {
    id: 2,
    title: "SẢN PHẨM THẬT",
    subtitle: "100% sản phẩm chính hãng được chứng nhận từ đối tác",
    icon: img4, // Using placeholder for icon
  },
  {
    id: 3,
    title: "ƯU ĐÃI THẬT",
    subtitle: "Mua sắm rẻ hơn hơn cùng với vô số ưu đãi quyến rũ",
    icon: img5, // Using placeholder for icon
  },
  {
    id: 4,
    title: "CHIA SẺ THẬT",
    subtitle: "Hàng ngàn chia sẻ từ trải nghiệm thực tế của khách hàng",
    icon: img6, // Using placeholder for icon
  },
];

const trustBadgesImages = [img40, img41, img42];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [hours, setHours] = useState(7);
  const [minutes, setMinutes] = useState(13);
  const [seconds, setSeconds] = useState(45);
  const [email, setEmail] = useState("");
  const [productCards, setProductCards] = useState([]);
  const [voucherProducts, setVoucherProducts] = useState([]);

  const productsSliderRef = useRef(null);
  const navigate = useNavigate();

  //Get Product
  useEffect(() => {
    fetchFlashSale();
    fetchVoucherProducts();
  }, []);

  const fetchFlashSale = async () => {
    try {
      const result = await get5Products(1, 5);
      setProductCards(result.data);
    } catch (error) {
      console.log(error);
      //toast.error("Lỗi khi tải danh sách sản phẩm");
    } finally {
    }
  };

  const fetchVoucherProducts = async () => {
    try {
      const result = await get5Products(2, 5); // Lấy page thứ 2 để có sản phẩm khác
      setVoucherProducts(result.data);
    } catch (error) {
      console.log(error);
      //toast.error("Lỗi khi tải danh sách sản phẩm voucher");
    }
  };

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % bannerSlides.length);
  const prevSlide = () =>
    setCurrent(
      (prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length
    );

  const scrollProducts = (direction) => {
    if (productsSliderRef.current) {
      const scrollAmount = 300; // Scroll distance in pixels
      const currentScroll = productsSliderRef.current.scrollLeft;

      productsSliderRef.current.scrollTo({
        left:
          direction === "left"
            ? currentScroll - scrollAmount
            : currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Slider settings for the health & beauty services carousel
  const healthBeautySliderSettings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 5,
    speed: 500,
    focusOnSelect: true,
    dots: false,
    swipeToSlide: true,
    arrows: true,
    variableWidth: false,
    prevArrow: <button className={cx("slick-arrow", "slick-prev")}>‹</button>,
    nextArrow: <button className={cx("slick-arrow", "slick-next")}>›</button>,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "100px",
        },
      },
    ],
  };

  // Slider settings for popular brands slider
  const popularBrandsSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 3000,
    prevArrow: <button className={cx("slick-arrow", "slick-prev")}>‹</button>,
    nextArrow: <button className={cx("slick-arrow", "slick-next")}>›</button>,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add subscription logic here
    console.log("Subscribed email:", email);
    setEmail("");
    // Could add a success message or notification here
  };

  return (
    <>
      <div className={cx("wrapper-home")}>
        {/* Side discount tag - fixed position */}
        {/* <div className={cx("side-discount-tag")}>
          <div className={cx("discount-value")}>GIẢM</div>
          <div className={cx("discount-amount")}>10%</div>
        </div> */}

        {/* Banner chính - Sử dụng hero-banner.png */}
        <div className={cx("main-banner")}>
          <div className={cx("banner-carousel-wrap")}>
            <div className={cx("banner-carousel")}>
              <img
                src={bannerSlides[current].img}
                alt={bannerSlides[current].alt}
                className={cx("banner-img")}
              />
            </div>
          </div>
        </div>

        {/* Dots chuyển slide */}
        <div className={cx("dots")}>
          {bannerSlides.map((_, idx) => (
            <span
              key={idx}
              className={cx("dot", { active: idx === current })}
              onClick={() => setCurrent(idx)}
            ></span>
          ))}
        </div>

        {/* Menu dưới banner */}

        {/* Flash Sale Section */}
        <div className={cx("flash-sale-section")}>
          <div className={cx("flash-sale-header")}>
            <div className={cx("flash-sale-title")}>
              <i className={cx("flash-icon")}>⚡</i>
              <h2>FLASH SALE</h2>
            </div>
            <div className={cx("flash-sale-timer")}>
              <span>Kết thúc trong</span>
              <div className={cx("timer")}>
                <div className={cx("timer-box")}>
                  {String(hours).padStart(2, "0")}
                </div>
                <span>:</span>
                <div className={cx("timer-box")}>
                  {String(minutes).padStart(2, "0")}
                </div>
                <span>:</span>
                <div className={cx("timer-box")}>
                  {String(seconds).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>

          <div className={cx("product-card-container")}>
            {/* <>
            {productCards.map((product, index) => (
              <div
                key={index}
                className={cx("product-card")}
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/products")}
              >
                <div className={cx("product-image")}>
                  <img
                    src={img8}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />

                </div>
                <div className={cx("product-info")}>
                  <div className={cx("product-brand")}>COCOON</div>
                  <h3 className={cx("product-name")}>{product.name}</h3>
                  <div className={cx("product-rating")}>
                    <div className={cx("stars")}>★★★★★</div>
                    <span className={cx("review-count")}>
                      ({product.reviews})
                    </span>
                  </div>
                  <div className={cx("product-price")}>
                    <span className={cx("sale-price")}>
                      {product.salePrice} đ
                    </span>
                    <span className={cx("original-price")}>
                      {product.originalPrice} đ
                    </span>
                  </div>
                </div>
              </div>
            ))}
            </> */}

            {/* API Products */}
            {productCards.map((product) => (
              <div className={cx("product-card")}>
                <Link key={product.id} to={`/detail-product/${product.id}`}>
                  <div className={cx("product-image")}>
                    <img
                      src={product.productImages[0].link || notfound_product}
                      alt={product.name}
                    />
                    <div className={cx("discount-label")}>-{20}%</div>
                  </div>
                  <div className={cx("product-info")}>
                    <div className={cx("product-brand")}>
                      {product.brand.name}
                    </div>
                    <h3 className={cx("product-name")}>{product.name}</h3>
                    <div className={cx("product-rating")}>
                      <div className={cx("stars")}>★★★★★</div>
                      <span className={cx("review-count")}>
                        ({product.categoryName})
                      </span>
                    </div>
                    <div className={cx("product-price")}>
                      <span className={cx("sale-price")}>
                        {product.price ? product.price.toLocaleString() : "0"} đ
                      </span>
                      <span className={cx("original-price")}>
                        {product.price ? product.price.toLocaleString() : "0"} đ
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Promotional Banners */}
        <div className={cx("promo-banners")}>
          <div className={cx("promo-row")}>
            <div className={cx("promo-banner")}>
              <img
                src={img9}
                alt="Siêu hội ngày hè"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <div className={cx("promo-banner")}>
              <img
                src={img10}
                alt="Siêu sale"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <div className={cx("promo-banner")}>
              <img
                src={img11}
                alt="Ngày vàng mua sắm"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>

        {/* Săn hè - Voucher Section */}
        <div className={cx("voucher-section")}>
          <div className={cx("voucher-header")}>
            <h2 className={cx("voucher-title")}>
              SĂN HÈ - VOUCHER 15% ĐƠN TỪ 99K
            </h2>
            <button className={cx("view-all-btn")}>
              XEM TẤT CẢ <span>›</span>
            </button>
          </div>

          {/* Campaign banner as a full image */}
          <div className={cx("campaign-banner-wrapper")}>
            <img
              src={img12}
              alt="Tháng của nàng ngàn ưu đãi"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Product cards - same style as flash sale */}
          <div className={cx("product-card-container")}>
            {voucherProducts.map((product) => (
              <div key={product.id} className={cx("product-card")}>
                <Link to={`/detail-product/${product.id}`}>
                  <div className={cx("product-image", "blue-bg")}>
                    <img
                      src={
                        product.productImages &&
                        product.productImages.length > 0
                          ? product.productImages[0].link
                          : notfound_product
                      }
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                 
                  </div>
                  <div className={cx("product-info")}>
                    <div className={cx("product-brand")}>
                      {product.brand ? product.brand.name : "PURE"}
                    </div>
                    <h3 className={cx("product-name")}>{product.name}</h3>
                    <div className={cx("product-rating")}>
                      <div className={cx("stars")}>★★★★★</div>
                      <span className={cx("review-count")}>
                        ({product.categoryName || "Mỹ phẩm"})
                      </span>
                    </div>
                    <div className={cx("product-price")}>
                      <span className={cx("sale-price")}>
                        {product.price
                          ? (product.price * 0.85).toLocaleString()
                          : "0"}{" "}
                        đ
                      </span>
                      <span className={cx("original-price")}>
                        {product.price ? product.price.toLocaleString() : "0"} đ
                      </span>
                    </div>
                    <div className={cx("product-sold-count")}>
                      <span>☑ {Math.floor(Math.random() * 500) + 100}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Hàng loạt voucher hot section */}
        <div className={cx("hot-voucher-section")}>
          <div className={cx("section-header")}>
            <h2 className={cx("section-title")}>HÀNG LOẠT VOUCHER HOT</h2>
            <button className={cx("view-all-btn")}>
              XEM TẤT CẢ <span>›</span>
            </button>
          </div>

          <div className={cx("voucher-container")}>
            {voucherData.map((voucher, index) => (
              <div
                key={index}
                className={cx("voucher-card")}
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/voucher")}
              >
                <div className={cx("voucher-content")}>
                  <div className={cx("voucher-label")}>VOUCHER</div>
                  <div className={cx("discount-percent")}>
                    {voucher.discount}
                  </div>
                  <div className={cx("voucher-condition")}>
                    {voucher.condition}
                  </div>
                  <div className={cx("voucher-description")}>
                    {voucher.description}
                  </div>
                </div>
                <button className={cx("voucher-button")}>NHẬN NGAY</button>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Products Section */}
        <div className={cx("popular-products-section")}>
          <div className={cx("section-header")}>
            <h2 className={cx("section-title")}>SẢN PHẨM BÁN CHẠY</h2>

            <div className={cx("tag-buttons-container")}>
              {tagButtons.map((tag, index) => (
                <button key={index} className={cx("tag-button")}>
                  {tag}
                </button>
              ))}

              <button className={cx("view-all-btn")}>
                XEM TẤT CẢ <span>›</span>
              </button>
            </div>
          </div>

          <div className={cx("products-slider-container")}>
            <button
              className={cx("slider-arrow", "left-arrow")}
              onClick={() => scrollProducts("left")}
            >
              ‹
            </button>

            <div className={cx("products-slider")} ref={productsSliderRef}>
              {productCards.map((product, index) => (
                <div key={index} className={cx("product-card", "slider-card")}>
                  <div className={cx("product-image", "pink-bg")}>
                    <img
                      src={img8}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                    {/* <div className={cx("discount-label")}>
                      -{product.discount}%
                    </div> */}
                  </div>
                  <div className={cx("product-info")}>
                    <div className={cx("product-brand")}>COCOON</div>
                    <h3 className={cx("product-name")}>{product.name}</h3>
                    <div className={cx("product-rating")}>
                      <div className={cx("stars")}>★★★★★</div>
                      <span className={cx("review-count")}>
                        ({product.reviews})
                      </span>
                    </div>
                    <div className={cx("product-price")}>
                      <span className={cx("sale-price")}>
                        {product.salePrice
                          ? product.salePrice.toLocaleString()
                          : "0"}{" "}
                        đ
                      </span>
                      <span className={cx("original-price")}>
                        {product.originalPrice
                          ? product.originalPrice.toLocaleString()
                          : "0"}{" "}
                        đ
                      </span>
                    </div>
                    <div className={cx("selling-fast-tag")}>
                      <span>ĐANG BÁN CHẠY</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className={cx("slider-arrow", "right-arrow")}
              onClick={() => scrollProducts("right")}
            >
              ›
            </button>
          </div>
        </div>

        {/* Tháng của nàng Section */}
        <div className={cx("month-special-section")}>
          <div className={cx("section-header")}>
            <h2 className={cx("section-title")}>THÁNG CỦA NÀNG</h2>
            <button className={cx("view-all-btn")}>
              XEM TẤT CẢ <span>›</span>
            </button>
          </div>

          {/* Large banner images */}
          <div className={cx("banner-grid")}>
            <div className={cx("banner-grid-item")}>
              <div className={cx("promo-banner", "large-banner", "red-banner")}>
                <img
                  src={img14}
                  alt="24H ƯU ĐÃI"
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </div>
            <div className={cx("banner-grid-item")}>
              <div
                className={cx("promo-banner", "large-banner", "orange-banner")}
              >
                <img
                  src={img15}
                  alt="20.03 Tháng của nàng"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Product cards */}
          <div className={cx("product-card-container")}>
            {productCards.map((product, index) => (
              <div key={index} className={cx("product-card")}>
                <div className={cx("product-image", "pink-bg")}>
                  <img
                    src={img8}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
                <div className={cx("product-info")}>
                  <div className={cx("product-brand")}>COCOON</div>
                  <h3 className={cx("product-name")}>{product.name}</h3>
                  <div className={cx("product-rating")}>
                    <div className={cx("stars")}>★★★★★</div>
                    <span className={cx("review-count")}>
                      {" "}
                      ({product.reviews}){" "}
                    </span>
                  </div>
                  <div className={cx("product-price")}>
                    {product.salePrice
                      ? product.salePrice.toLocaleString()
                      : "0"}{" "}
                    đ
                  </div>
                  <div className={cx("selling-fast-tag")}>
                    {" "}
                    <span>ĐANG BÁN CHẠY</span>{" "}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom view all button */}
          <div className={cx("view-all-container")}>
            <button className={cx("view-all-btn", "center-btn")}>
              XEM TẤT CẢ <span>›</span>
            </button>
          </div>
        </div>

        {/* Danh mục quan tâm Section */}
        <div className={cx("categories-section")}>
          <div className={cx("section-header")}>
            <h2 className={cx("section-title")}>DANH MỤC QUAN TÂM</h2>
            <button className={cx("view-all-btn")}>
              XEM TẤT CẢ <span>›</span>
            </button>
          </div>

          <div className={cx("categories-container")}>
            {categories.map((category, idx) => (
              <div key={category.name} className={cx("category-item")}>
                <div className={cx("category-icon")}>
                  <img
                    src={categoryImages[idx]}
                    alt={category.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
                <div className={cx("category-name")}>{category.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Health & Beauty Services Section */}
        <div className={cx("health-beauty-section")}>
          <div className={cx("section-header", "services-header")}>
            <h2 className={cx("section-title", "services-title")}>
              DỊCH VỤ SỨC KHỎE & SẮC ĐẸP
            </h2>
            <button className={cx("view-all-btn")}>
              XEM TẤT CẢ <span>›</span>
            </button>
          </div>

          <div className={cx("services-slider-container")}>
            <Slider
              {...healthBeautySliderSettings}
              className={cx("services-slider")}
            >
              {healthBeautyServices.map((service, idx) => (
                <div key={service.id} className={cx("service-slide")}>
                  <div className={cx("service-card")}>
                    <div className={cx("service-image")}>
                      <img src={healthBeautyImages[idx]} alt={service.title} />
                    </div>
                    <div className={cx("service-content")}>
                      <h3 className={cx("service-title")}>{service.title}</h3>
                      <p className={cx("service-subtitle")}>
                        {service.subtitle}
                      </p>
                      <button className={cx("detail-btn")}>
                        {service.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Popular Brands Section */}
        <div className={cx("popular-brands-section")}>
          <div className={cx("section-header", "brands-header")}>
            <h2 className={cx("section-title", "brands-title")}>
              THƯƠNG HIỆU BÁN CHẠY
            </h2>
            <button className={cx("view-all-btn")}>
              XEM TẤT CẢ <span>›</span>
            </button>
          </div>

          <div className={cx("brands-slider-container")}>
            <Slider {...popularBrandsSettings} className={cx("brands-slider")}>
              {popularBrands.map((brand, idx) => (
                <div key={brand.id} className={cx("brand-slide")}>
                  <div className={cx("brand-card")}>
                    <div className={cx("brand-image")}>
                      <img
                        src={popularBrandsImages[idx]}
                        alt={brand.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    </div>
                    <div className={cx("brand-logo")}>
                      <img
                        src={popularBrandsLogos[idx]}
                        alt={brand.name + " logo"}
                        style={{
                          maxWidth: "120px",
                          maxHeight: "40px",
                          display: "block",
                          margin: "0 auto",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Beauty News & Tips Section */}
        <div className={cx("beauty-news-section")}>
          <div className={cx("section-header", "news-header")}>
            <h2 className={cx("section-title", "news-title")}>
              TIN TỨC & CẨM NANG LÀM ĐẸP
            </h2>
            <Link to="/blog">
              <button className={cx("view-all-btn")}>
                XEM TẤT CẢ <span>›</span>
              </button>
            </Link>
          </div>

          <div className={cx("news-grid")}>
            {beautyNews.map((news, idx) => (
              <div key={news.id} className={cx("news-item")}>
                <div className={cx("news-image")}>
                  <img src={beautyNewsImages[idx]} alt={news.title} />
                  <div className={cx("news-date")}>{news.date}</div>
                </div>
                <div className={cx("news-content")}>
                  <h3 className={cx("news-title")}>{news.title}</h3>
                  <div className={cx("news-description")}>
                    {news.description}
                  </div>
                  <button className={cx("learn-more-btn")}>XEM THÊM</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges Section */}
        <div className={cx("trust-badges-section")}>
          <div className={cx("badges-container")}>
            <div className={cx("badge-item", "brand-identity")}>
              <h3 className={cx("badge-title")}>{trustBadges[0].title}</h3>
              <p className={cx("badge-subtitle")}>{trustBadges[0].subtitle}</p>
              <button className={cx("badge-button")}>
                {trustBadges[0].buttonText}
              </button>
            </div>

            <div className={cx("regular-badges")}>
              {trustBadges.slice(1).map((badge, idx) => (
                <div key={badge.id} className={cx("badge-item")}>
                  <div className={cx("badge-icon")}>
                    <img src={trustBadgesImages[idx]} alt={badge.title} />
                  </div>
                  <div className={cx("badge-title")}>{badge.title}</div>
                  <div className={cx("badge-subtitle")}>{badge.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Email Subscription Section */}
        <div className={cx("subscription-section")}>
          <div className={cx("subscription-container")}>
            <h2 className={cx("subscription-title")}>ĐĂNG KÝ NHẬN ƯU ĐÃI</h2>
            <form
              className={cx("subscription-form")}
              onSubmit={handleSubscribe}
            >
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className={cx("email-input")}
                value={email}
                onChange={handleEmailChange}
                required
              />
              <button type="submit" className={cx("subscribe-btn")}>
                ĐĂNG KÝ
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
