import React, { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import { Search, ArrowDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { searchProducts } from "../../services/productService";

// Import product images
import notfound_product from "images/notfound_product.png";

// Import banner images
import product9 from "images/product9.png";
import product10 from "images/product10.png";
import product11 from "images/product11.png";
import { toast } from "react-toastify";
import { get5Brands } from "../../services/brandService";
import { get5Categories } from "../../services/categoryService";
import PriceFilter from "../../components/PriceFilter";
import ProductSkeleton from "../../components/ProductSkeleton";
import Breadcrumb from "../../components/Breadcrumb";

const Products = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(null);
  const [isOnSale, setIsOnSale] = useState(false);
  const [sortOption, setSortOption] = useState("Sắp xếp");
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] =
    useState("Sản phẩm Puré");
  const [loading, setLoading] = useState(true);

  //Search Filter
  const [priceRange, setPriceRange] = useState(1000000);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSortValue, setSelectedSortValue] = useState(null);

  //Get Product
  useEffect(() => {
    fetchBrandList();
    fetchCategoryList();
  }, []);

  useEffect(() => {
    fetchProductList(currentPage);
  }, [
    currentPage,
    searchTerm,
    selectedBrands,
    selectedCategory,
    priceRange,
    rating,
    selectedSortValue,
  ]);

  const fetchProductList = async (page, isLoadMore = false) => {
    setLoading(true);

    try {
      const result = await searchProducts({
        searchTerm: searchTerm,
        brandIds: selectedBrands,
        categoryId: selectedCategory,
        amountPrice: priceRange,
        minRating: rating,
        sortBy: selectedSortValue,
        pageIndex: page,
        pageSize: pageSize,
      });

      if (result && result.data) {
        if (isLoadMore) {
          setProductList((prevList) => [...prevList, ...result.data]);
        } else {
          setProductList(result.data);
        }
        setPagination(result.pagination);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi tải danh sách sản phẩm");
      setProductList([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrandList = async () => {
    try {
      const result = await get5Brands(1, 5);
      setBrandList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategoryList = async () => {
    try {
      const result = await get5Categories(1, 5);
      setCategoryList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

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
          className={`${styles.pagination_button} ${
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

  // Banner images
  const bannerImages = [
    { id: 1, image: product9, alt: "CLIO EVERY FRUIT GROCERY EDITION" },
    { id: 2, image: product10, alt: "Cocoon Nước Tẩy Trang" },
    { id: 3, image: product11, alt: "CLIO PRO EYE PALETTE" },
  ];

  // Filter options
  const sortOptions = [
    { label: "Mới nhất", value: 0 },
    { label: "Giá thấp đến cao", value: 1 },
    { label: "Giá cao đến thấp", value: 2 },
    { label: "Bán chạy nhất", value: 3 },
    { label: "Yêu thích nhiều", value: 4 },
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
  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
  };

  // Handle rating selection
  const handleRatingSelect = (value) => {
    if (rating === value) {
      setRating(null);
    } else {
      setRating(value);
    }
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
    setSearchTerm("");
    setSelectedBrands([]);
    setSelectedCategory(null);
    setPriceRange(1000000);
    setRating(null);
    setSelectedSortValue(null);
    setCurrentPage(1);
    setSelectedCategoryName("Sản phẩm Puré");
  };

  // Function to check if a product is on sale
  const isProductOnSale = (originalPrice, price) => {
    return originalPrice > price;
  };

  //Search:
  const handleSelectCategory = (id, name) => {
    setSelectedCategory(id);
    setSelectedCategoryName(name);
  };

  const handleBrandChange = (e, brandId) => {
    if (e.target.checked) {
      setSelectedBrands([...selectedBrands, brandId]);
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId));
    }
    console.log("brand: " + [...selectedBrands, brandId]);
  };

  const handleSortSelect = (value) => {
    setSelectedSortValue(value);
    //console.log("Selected sort value:", value);
  };

  return (
    <>
      <div className={styles.breadcrumb}>
        <Breadcrumb pageName={"Shop"} />
      </div>
      <div className={styles.products_page_wrapper}>
        <div className={styles.products_container}>
          {/* Left sidebar for filters - 20% width */}
          <div className={styles.filters_sidebar}>
            <h2 className={styles.sidebar_title}>PURÉ</h2>

            {/* Search box */}
            <div className={styles.search_box}>
              <Search size={18} className={styles.search_icon} />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>

            {/* Categories accordion */}
            <div className={styles.filter_section}>
              {categoryList.map((category) => (
                <div
                  key={category.id}
                  className={`${styles.category_item} ${
                    selectedCategory === category.id ? styles.active : ""
                  }`}
                  onClick={() =>
                    handleSelectCategory(category.id, category.categoryName)
                  }
                >
                  <div className={styles.category_header}>
                    <span>{category.categoryName || "Pure"}</span>
                    <span className={styles.arrow_icon}>▼</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Brand filter */}
            <div className={styles.filter_section}>
              <h3 className={styles.section_title}>Thương Hiệu</h3>
              {/* <div className={styles.search_box}>
                <Search size={18} className={styles.search_icon} />
                <input type="text" placeholder="Tìm kiếm thương hiệu..." />
              </div> */}
              <div className={styles.brands_list}>
                {brandList &&
                  brandList.map((brand) => (
                    <div key={brand.id} className={styles.brand_item}>
                      <input
                        type="checkbox"
                        id={`brand-${brand.id}`}
                        checked={selectedBrands.includes(brand.id)}
                        onChange={(e) => handleBrandChange(e, brand.id)}
                      />
                      <label htmlFor={`brand-${brand.id}`}>
                        {brand.name || "Pure"}
                      </label>
                    </div>
                  ))}
              </div>
            </div>

            {/* Price range slider */}
            {/* <div className={styles.filter_section}>
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
            </div> */}
            <div>
              <PriceFilter onChange={handlePriceChange} />
              {/* <button
                type="submit"
                className={styles.btn_search_price}
                onClick={handleSearchPrice}
              >
                Áp dụng
              </button> */}
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
            {/* <div className={styles.filter_section}>
              <div className={styles.sale_filter}>
                <input
                  type="checkbox"
                  id="on-sale"
                  checked={isOnSale}
                  onChange={handleSaleToggle}
                />
                <label htmlFor="on-sale">Đang sale</label>
              </div>
            </div> */}

            {/* Filter action buttons */}
            {/* <div className={styles.filter_actions}>
              <button className={styles.reset_btn} onClick={handleResetFilters}>
                Đặt lại
              </button>
              <button className={styles.apply_btn} onClick={handleApplyFilters}>
                Áp dụng
              </button>
            </div> */}
          </div>

          {/* Right product display area - 80% width */}
          <div className={styles.products_display}>
            {/* Header with title and product count */}
            <div className={styles.products_header}>
              <div className={styles.title_section}>
                <h1>{selectedCategoryName}</h1>
                <span className={styles.product_count}>
                  {productList.length} sản phẩm
                </span>
              </div>

              {/* Filter toolbar */}
              <div className={styles.filter_toolbar}>
                <div
                  className={styles.reset_filter}
                  onClick={handleResetFilters}
                >
                  Đặt lại bộ lọc
                </div>
                <div className={styles.toolbar_divider}></div>

                {/* Sort dropdown */}
                <div className={styles.sort_dropdown}>
                  <div className={styles.dropdown_header}>
                    <span>{sortOption}</span>
                    <ArrowDown size={14} />
                  </div>
                  <div className={styles.dropdown_options}>
                    {sortOptions.map((item) => (
                      <div
                        key={item.value}
                        className={`${styles.dropdown_option} ${
                          selectedSortValue === item.value ? styles.active : ""
                        }`}
                        onClick={() => setSelectedSortValue(item.value)}
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick filter chips */}
            <div className={styles.quick_filters}>
              {sortOptions.map((item) => (
                <div
                  key={item.value}
                  className={`${styles.filter_chip} ${
                    selectedSortValue === item.value ? styles.active : ""
                  }`}
                  onClick={() => setSelectedSortValue(item.value)}
                >
                  {item.label}
                </div>
              ))}
            </div>

            <div className={styles.products_grid}>
              {loading ? (
                Array(pageSize)
                  .fill(0)
                  .map((_, index) => <ProductSkeleton key={index} />)
              ) : productList.length > 0 ? (
                productList.map((product) => (
                  <Link key={product.id} to={`/detail-product/${product.id}`}>
                    <div className={styles.product_card}>
                      <div className={styles.product_image}>
                        <img
                          src={
                            product.productImages[0].link || notfound_product
                          }
                          alt={product.name}
                        />
                      </div>
                      <div className={styles.product_info}>
                        <div className={styles.product_brand}>
                          {product.brand.name}
                        </div>
                        <div className={styles.product_name}>
                          {product.name}
                        </div>
                        <div className={styles.product_price_container}>
                          <span className={styles.product_price}>
                            {product.price} đ
                          </span>
                          <span className={styles.product_original_price}>
                            {product.price} đ
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className={styles.noProductFriendly}>
                  <img
                    src={notfound_product}
                    alt="Không tìm thấy"
                    className={styles.friendlyIcon}
                  />
                  <h2 className={styles.friendlyTitle}>
                    Không có gì ở đây cả!
                  </h2>
                  <p className={styles.friendlySubtitle}>
                    Có vẻ như bộ lọc của bạn hơi kỹ tính đó. Hãy thử một vài
                    cách sau đây nhé:
                  </p>
                  <div className={styles.friendlyActions}>
                    <button
                      className={styles.resetButton}
                      onClick={handleResetFilters}
                    >
                      Xóa tất cả bộ lọc
                    </button>
                    <p>hoặc</p>
                    <Link
                      to="/products"
                      className={styles.exploreLink}
                      onClick={handleResetFilters}
                    >
                      Khám phá tất cả sản phẩm
                    </Link>
                  </div>
                  <div className={styles.suggestionBox}>
                    <span>Gợi ý:</span> Thử tìm với các từ khóa chung hơn như
                    "sữa rửa mặt", "kem chống nắng",...
                  </div>
                </div>
              )}
            </div>

            <div>
              {/* Pagination */}
              {productList.length > 0 && (
                <div className={styles.pagination}>
                  <div className={styles.pagination_info}>
                    {pagination.totalCount > 0
                      ? `${
                          (currentPage - 1) * pagination.pageSize + 1
                        } - ${Math.min(
                          currentPage * pagination.pageSize,
                          pagination.totalCount
                        )} / ${pagination.totalCount}`
                      : "0 / 0"}
                  </div>
                  <div className={styles.pagination_controls}>
                    <button
                      className={styles.pagination_button}
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={!pagination.hasPrevious}
                    >
                      ❮
                    </button>

                    {renderPageNumbers()}

                    <button
                      className={styles.pagination_button}
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={!pagination.hasNext}
                    >
                      ❯
                    </button>
                  </div>
                </div>
              )}
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
    </>
  );
};

export default Products;
