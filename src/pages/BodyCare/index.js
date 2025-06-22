import React, { useState } from "react";
import styles from "./BodyCare.module.scss";
import {
  Search,
  Filter,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Header from "components/Layout/Header";
import Footer from "components/Layout/Footer";

// Import product images
import product1 from "images/product1.png";
import product2 from "images/product2.png";
import product3 from "images/product3.png";
import product4 from "images/product4.png";
import product5 from "images/product5.png";
import product6 from "images/product6.png";
import product7 from "images/product7.png";
import product8 from "images/product8.png";

// Import banner images
import product9 from "images/product9.png";
import product10 from "images/product10.png";
import product11 from "images/product11.png";

const BodyCare = () => {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [rating, setRating] = useState(null);
  const [isOnSale, setIsOnSale] = useState(false);
  const [sortOption, setSortOption] = useState("Sắp xếp");

  // Banner images
  const bannerImages = [
    { id: 1, image: product9, alt: "Sữa tắm dưỡng ẩm" },
    { id: 2, image: product10, alt: "Dầu gội đầu" },
    { id: 3, image: product11, alt: "Dầu xả dưỡng tóc" },
  ];

  // Sample body care products data
  const products = [
    {
      id: 1,
      name: "Sữa Tắm Dưỡng Ẩm Cocoon 300ml",
      brand: "COCOON",
      price: 189000,
      originalPrice: 210000,
      image: product1,
    },
    {
      id: 2,
      name: "Dầu Gội Dưỡng Tóc Cocoon 300ml",
      brand: "COCOON",
      price: 165000,
      originalPrice: 195000,
      image: product2,
    },
    {
      id: 3,
      name: "Dầu Xả Dưỡng Tóc Cocoon 250ml",
      brand: "COCOON",
      price: 155000,
      originalPrice: 180000,
      image: product3,
    },
    {
      id: 4,
      name: "Sữa Tắm Hương Nước Hoa 300ml",
      brand: "COCOON",
      price: 192000,
      originalPrice: 220000,
      image: product4,
    },
    {
      id: 5,
      name: "Tẩy Tế Bào Chết Toàn Thân 200ml",
      brand: "COCOON",
      price: 175000,
      originalPrice: 195000,
      image: product5,
    },
    {
      id: 6,
      name: "Dầu Gội Trị Gàu Cocoon 300ml",
      brand: "COCOON",
      price: 172000,
      originalPrice: 195000,
      image: product6,
    },
    {
      id: 7,
      name: "Sữa Dưỡng Thể Cocoon 250ml",
      brand: "COCOON",
      price: 162000,
      originalPrice: 185000,
      image: product7,
    },
    {
      id: 8,
      name: "Xà Phòng Tắm Dưỡng Ẩm 100g",
      brand: "COCOON",
      price: 75000,
      originalPrice: 89000,
      image: product8,
    },
    {
      id: 9,
      name: "Sữa Tắm Dưỡng Ẩm Hương Hoa 300ml",
      brand: "COCOON",
      price: 189000,
      originalPrice: 210000,
      image: product1,
    },
    {
      id: 10,
      name: "Dầu Gội Dành Cho Tóc Khô 300ml",
      brand: "COCOON",
      price: 165000,
      originalPrice: 195000,
      image: product2,
    },
    {
      id: 11,
      name: "Dầu Xả Dành Cho Tóc Nhuộm 250ml",
      brand: "COCOON",
      price: 155000,
      originalPrice: 180000,
      image: product3,
    },
    {
      id: 12,
      name: "Sữa Tắm Dưỡng Trắng Da 300ml",
      brand: "COCOON",
      price: 192000,
      originalPrice: 220000,
      image: product4,
    },
    {
      id: 13,
      name: "Tẩy Tế Bào Chết Cà Phê 200ml",
      brand: "COCOON",
      price: 175000,
      originalPrice: 195000,
      image: product5,
    },
    {
      id: 14,
      name: "Dầu Gội Dưỡng Màu Tóc 300ml",
      brand: "COCOON",
      price: 172000,
      originalPrice: 195000,
      image: product6,
    },
    {
      id: 15,
      name: "Sữa Dưỡng Thể Trắng Da 250ml",
      brand: "COCOON",
      price: 162000,
      originalPrice: 185000,
      image: product7,
    },
    {
      id: 16,
      name: "Xà Phòng Tắm Thảo Mộc 100g",
      brand: "COCOON",
      price: 75000,
      originalPrice: 89000,
      image: product8,
    },
  ];

  // Filter options
  const filterOptions = [
    "Sắp xếp",
    "Mới nhất",
    "Bán chạy",
    "Giá thấp đến cao",
    "Giá cao đến thấp",
  ];

  // Filter categories for body care
  const bodyCareCategories = [
    { id: 1, name: "Sữa tắm", expanded: true },
    { id: 2, name: "Dầu gội", expanded: true },
    { id: 3, name: "Dầu xả", expanded: true },
    { id: 4, name: "Tẩy tế bào chết", expanded: true },
    { id: 5, name: "Sữa dưỡng thể", expanded: true },
    { id: 6, name: "Xà phòng tắm", expanded: true },
    { id: 7, name: "Khử mùi", expanded: true },
    { id: 8, name: "Chăm sóc tóc", expanded: true },
    { id: 9, name: "Set chăm sóc cơ thể", expanded: true },
  ];

  // Brands for the brand filter
  const brands = [
    "Cocoon",
    "Dove",
    "Nivea",
    "The Body Shop",
    "Neutrogena",
    "Pantene",
    "Head & Shoulders",
    "L'Oreal",
  ];

  // Handle sorting option change
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Toggle category expansion
  const toggleCategory = (id) => {
    // Implementation would be here to toggle the expanded state
  };

  // Handle price range changes
  const handlePriceChange = (e) => {
    // Implementation would update the price range based on slider
  };

  // Handle rating selection
  const handleRatingSelect = (value) => {
    setRating(value === rating ? null : value);
  };

  // Handle on sale toggle
  const handleSaleToggle = () => {
    setIsOnSale(!isOnSale);
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    // Implementation would apply all selected filters
    console.log("Applying filters");
  };

  // Reset all filters
  const handleResetFilters = () => {
    setPriceRange([0, 1000000]);
    setRating(null);
    setIsOnSale(false);
  };

  // Function to check if a product is on sale
  const isProductOnSale = (originalPrice, price) => {
    return originalPrice > price;
  };

  return (
    <>
      <Header />
      <div className={styles.products_page_wrapper}>
        <div className={styles.products_container}>
          {/* Left sidebar for filters - 20% width */}
          <div className={styles.filters_sidebar}>
            <h2 className={styles.sidebar_title}>Chăm Sóc Cơ Thể</h2>

            {/* Search box */}
            <div className={styles.search_box}>
              <Search size={18} className={styles.search_icon} />
              <input type="text" placeholder="Tìm kiếm sản phẩm..." />
            </div>

            {/* Categories accordion */}
            <div className={styles.filter_section}>
              {bodyCareCategories.map((category) => (
                <div key={category.id} className={styles.category_item}>
                  <div className={styles.category_header}>
                    <span>{category.name}</span>
                    <span className={styles.arrow_icon}>▼</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Brand filter */}
            <div className={styles.filter_section}>
              <h3 className={styles.section_title}>Thương Hiệu</h3>
              <div className={styles.search_box}>
                <Search size={18} className={styles.search_icon} />
                <input type="text" placeholder="Tìm kiếm thương hiệu..." />
              </div>
              <div className={styles.brands_list}>
                {brands.map((brand, index) => (
                  <div key={index} className={styles.brand_item}>
                    <input type="checkbox" id={`brand-${index}`} />
                    <label htmlFor={`brand-${index}`}>{brand}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price range slider */}
            <div className={styles.filter_section}>
              <h3 className={styles.section_title}>Giá</h3>
              <div className={styles.price_range}>
                <span>0 đ - 1.000.000 đ</span>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  value={priceRange[1]}
                  onChange={handlePriceChange}
                  className={styles.price_slider}
                />
              </div>
            </div>

            {/* Rating filter */}
            <div className={styles.filter_section}>
              <h3 className={styles.section_title}>Đánh Giá</h3>
              <div className={styles.ratings_list}>
                {[5, 4, 3, 2, 1].map((value) => (
                  <div
                    key={value}
                    className={`${styles.rating_item} ${
                      rating === value ? styles.selected : ""
                    }`}
                    onClick={() => handleRatingSelect(value)}
                  >
                    <input
                      type="checkbox"
                      id={`rating-${value}`}
                      checked={rating === value}
                      readOnly
                    />
                    <label htmlFor={`rating-${value}`}>
                      <div className={styles.stars}>
                        {"★".repeat(value)}
                        {"☆".repeat(5 - value)}
                      </div>
                      <span className={styles.rating_value}>{value}.0</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* On sale filter */}
            <div className={styles.filter_section}>
              <div className={styles.sale_filter}>
                <input
                  type="checkbox"
                  id="on-sale"
                  checked={isOnSale}
                  onChange={handleSaleToggle}
                />
                <label htmlFor="on-sale">Đang sale</label>
              </div>
            </div>

            {/* Filter action buttons */}
            <div className={styles.filter_actions}>
              <button className={styles.reset_btn} onClick={handleResetFilters}>
                Đặt lại
              </button>
              <button className={styles.apply_btn} onClick={handleApplyFilters}>
                Áp dụng
              </button>
            </div>
          </div>

          {/* Right product display area - 80% width */}
          <div className={styles.products_display}>
            {/* Header with title and product count */}
            <div className={styles.products_header}>
              <div className={styles.title_section}>
                <h1>Chăm Sóc Cơ Thể</h1>
                <span className={styles.product_count}>
                  {products.length} sản phẩm
                </span>
              </div>

              {/* Filter toolbar */}
              <div className={styles.filter_toolbar}>
                <div className={styles.toolbar_item}>Hiển thị</div>
                <div className={styles.toolbar_divider}></div>

                {/* Sort dropdown */}
                <div className={styles.sort_dropdown}>
                  <div className={styles.dropdown_header}>
                    <span>{sortOption}</span>
                    <ArrowDown size={14} />
                  </div>
                  <div className={styles.dropdown_options}>
                    {filterOptions.map((option) => (
                      <div
                        key={option}
                        className={styles.dropdown_option}
                        onClick={() => handleSortChange(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick filter chips */}
            <div className={styles.quick_filters}>
              <div className={styles.filter_chip}>Sắp xếp</div>
              <div className={styles.filter_chip}>Sữa tắm</div>
              <div className={styles.filter_chip}>Dầu gội</div>
              <div className={styles.filter_chip}>Giá thấp đến cao</div>
              <div className={styles.filter_chip}>Giá cao đến thấp</div>
              <div className={styles.filter_chip}>Yêu thích nhiều</div>
            </div>

            {/* Products grid */}
            <div className={styles.products_grid}>
              {products.map((product) => (
                <div key={product.id} className={styles.product_card}>
                  <div className={styles.product_image}>
                    <img src={product.image} alt={product.name} />
                    {product.id === 8 && (
                      <div className={styles.product_promo}>
                        <span>1/5 - 1/6</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.product_info}>
                    <div className={styles.product_brand}>{product.brand}</div>
                    <div className={styles.product_name}>{product.name}</div>
                    <div className={styles.product_price_container}>
                      <span className={styles.product_price}>
                        {product.price.toLocaleString()} đ
                      </span>
                      <span className={styles.product_original_price}>
                        {product.originalPrice.toLocaleString()} đ
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
              <div className={styles.pagination_info}>1 - 16 / 1110</div>
              <div className={styles.pagination_controls}>
                <button className={styles.pagination_button}>❮</button>
                <button
                  className={`${styles.pagination_button} ${styles.active}`}
                >
                  1
                </button>
                <button className={styles.pagination_button}>2</button>
                <button className={styles.pagination_button}>3</button>
                <div className={styles.pagination_dots}>...</div>
                <button className={styles.pagination_button}>40</button>
                <button className={styles.pagination_button}>❯</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className={styles.banner_section}>
        <div className={styles.banner_container}>
          {bannerImages.map((banner) => (
            <div key={banner.id} className={styles.banner_item}>
              <img src={banner.image} alt={banner.alt} />
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter signup section */}
      <div className={styles.newsletter_section}>
        <div className={styles.newsletter_container}>
          <h3 className={styles.newsletter_title}>ĐĂNG KÝ NHẬN ƯU ĐÃI</h3>
          <div className={styles.newsletter_form}>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className={styles.newsletter_input}
            />
            <button className={styles.newsletter_button}>ĐĂNG KÝ</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BodyCare;
