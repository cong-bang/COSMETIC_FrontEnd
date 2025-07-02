import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Space,
  Tag,
  Image,
  Input,
  Modal,
  Form,
  Select,
  InputNumber,
  Upload,
  message,
  Popconfirm,
  Checkbox,
  Spin,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  ReloadOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";
import { getBrands } from "../../services/brandService";
import { getCategories } from "../../services/categoryService";
import { getCountries } from "../../services/countryService";
import { axiosInstance } from "../../apiConfig"; // Sửa lại import axiosInstance

// Hình ảnh cờ mặc định khi không tải được
const DEFAULT_FLAG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5AYUBwwXIHBN6QAABKhJREFUeNrtmF1oHFUUx//nzuxukt3sbpJNUmtSk7YmJfWDtDVKQayiIohV+qCCpRXywAcFoaCID0UffBF98cEHC1J9qA9+UKiCIKJorS+tWrRprDUmbVKTbHY32exmdmfm+JCdbWaz2WR3J0Xw/+DOuXfOvb97zj33zB1ijOG/LNTuAHK5XC+AJwE8ACADoA9AD4AuABEAJoAigBsAZgFcAvADgG8AXGx3XNQOgLlcbgDAcwCeAXAfgI4mtlEA8DOAT5RSHxPRQrsCbRlgLpd7HMCrAB5t1UcNuQTgDaXUZ60u/ZYA5nK5BwG8DWC01b9oIOcBvKSU+nErk28KMJfLJQC8AeBlAKKVoBqIAvC+EOJlIrq+2aSGAHO5XBrAFwDGthpcE/IrgCeIaKqRc12AuVxuEMAPAHa0I7IG8ieAB4jo93qOdZ+DuVzuLgDfok1wALATwDd2rDWlJqDd7b4GkGxnZA3kBoBRIrrsNjaxW8j+HAAkLRjr5IqgLlc7iCAZ9sdVRPyrB2DQ6oCZm9aWqLDTshOyU7QTtROuKKLnZCdcEWXqoSI6Ao8YiKaIqJrRDRDRNeIaJqIFohoiYiKRGQSkcFEVCIi5fhYliUty5Jaa8u2NWzb1ratDdu2Rtu2Rtu2Ztm2Ztu2Ztm2Vr5iW2nbtgZjTDPGDMZYiTFWZIwVGGPzjLFZxtifAK4CuEJEfxDRLBEtEVGRiEwiYo7vEkIwIYQWQmghhBFCGEIIQwihpJRKSqmklFJKKaWUUlmWpbIsS1mWpSzLUlprpbVWWmtla621UkrZWmtba21prS2ttWlZlmFZlmFZlmFZVskwjJJhGEXDMIqGYRSKxeJyoVBYLhQKy/l8Pj8/P5+fn5+/mc/nF/P5/GI+n18oFAoLxWJxoVgsLhSLxYVisThfLBbnisXiXKlUmi2VSrOlUmmmVCrNlEqlm6VSaapUKk0Vi8XJUqk0WSqVJkul0mShUJgoFAoThUJholAoTOTz+Rv5fP56Pp+/ns/nr+WulUunq8vLy1eXl5StLS0uXl5aWLi8tLV1aXFy8tLi4eHFxcfHi4uLihYWFhfPz8/Pn5+fnz83NnZubmzs7Ozs7MzMzMz09PT09PT09NTU1NTk5OTk5OTl5/fr1yWvXrk1eu3bt6pUrV65euXLl8uXLly9dunTp4sWLFy9cuHDh/Pnz58+dO3fu7NmzZ8+cOXPm9OnTp0+dOnXq5MmTJ0+cOHHi+PHjx48dO3bs6NGjR48cOXLk8OHDhw8dOnTo4MGDB8fHx8fHx8fH9+/fv3/fvn379u7du3fPnj179uzZs3v37t27du3atWvXrl07d+7cuXPnzh07duzYsWPHjvT09I7h4eHh4eHh4aGhoaGhoaGhwcHBwcHBwcH+/v7+/v7+/r6+vr6+vr6+3t7e3t7e3t6enp6enp6ent7e3t7e3t7e7u7u7u7u7u7u7u7u7u7u7q6urq6urq6urq6urq5IJBKJRCKRSCQSCYVC4VAoFAqFQqFQKBQKBoNBJ2AwGAwGg8FgIBAIBAKBQCAQCAQCfr/f7/f7/X6/3+/z+Xw+n8/n8/l8Pp/P5/V6vV6v1+v1er0ej8fj8Xg8Ho/H4/F4PG63233bX7H/AZMpxgc+4K7jAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA2LTIwVDA3OjEyOjIzKzAwOjAwBnDRYgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wNi0yMFQwNzoxMjoyMyswMDowMHctad4AAAAASUVORK5CYII=";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [categoryMap, setCategoryMap] = useState({});
  const [brandMap, setBrandMap] = useState({});
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      await fetchBrands();
      await fetchCategories();
      await fetchCountries();
      await fetchProducts();
    };

    loadData();
  }, [refreshKey]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts();
      console.log("Products API Response:", response);

      // Kiểm tra cấu trúc phản hồi và trích xuất dữ liệu sản phẩm
      let productsData = [];

      if (response && response.data) {
        // Kiểm tra nếu response.data là một mảng
        if (Array.isArray(response.data)) {
          productsData = response.data;
        }
        // Kiểm tra nếu response.data là một đối tượng có thuộc tính data
        else if (response.data.data && Array.isArray(response.data.data)) {
          productsData = response.data.data;
        }
        // Kiểm tra các cấu trúc phổ biến khác
        else if (response.data.items && Array.isArray(response.data.items)) {
          productsData = response.data.items;
        } else if (
          response.data.content &&
          Array.isArray(response.data.content)
        ) {
          productsData = response.data.content;
        }
      }

      console.log("Extracted products data:", productsData);
      console.log("Current categoryMap:", categoryMap);
      console.log("Current brandMap:", brandMap);

      // Thêm tên danh mục và nhãn hiệu vào sản phẩm
      const enhancedProducts = productsData.map((product) => {
        const categoryName =
          product.categoryId && categoryMap[product.categoryId]
            ? categoryMap[product.categoryId]
            : product.categoryName || "Không xác định";

        const brandName =
          product.brandId && brandMap[product.brandId]
            ? brandMap[product.brandId]
            : product.brandName || "Không xác định";

        console.log(
          `Product ID: ${product.id}, CategoryID: ${product.categoryId}, CategoryName: ${categoryName}, BrandID: ${product.brandId}, BrandName: ${brandName}`
        );

        return {
          ...product,
          categoryName,
          brandName,
        };
      });

      console.log("Enhanced products:", enhancedProducts);
      setProducts(Array.isArray(enhancedProducts) ? enhancedProducts : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error("Không thể tải danh sách sản phẩm");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await getBrands();
      console.log("Brands API Response:", response);

      // Xử lý nhiều cấu trúc phản hồi khác nhau
      let brandsData = [];

      // Xử lý cấu trúc phản hồi từ API
      if (response && response.statusCode === 200 && response.data) {
        if (Array.isArray(response.data)) {
          brandsData = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          brandsData = response.data.data;
        } else {
          brandsData = [response.data];
        }
      } else if (response && response.data) {
        brandsData = Array.isArray(response.data) ? response.data : [];
      } else if (response && Array.isArray(response)) {
        brandsData = response;
      }

      console.log("Brands Data after processing:", brandsData);
      setBrands(brandsData);

      // Tạo map brandId -> brandName để dễ dàng tra cứu
      const brandMapping = {};
      if (Array.isArray(brandsData)) {
        brandsData.forEach((brand) => {
          if (brand && brand.id && (brand.name || brand.brandName)) {
            brandMapping[brand.id] = brand.brandName || brand.name;
          }
        });
      }
      console.log("Brand Mapping:", brandMapping);
      setBrandMap(brandMapping);
    } catch (error) {
      console.error("Error fetching brands:", error);
      message.error("Không thể tải danh sách thương hiệu");
      setBrands([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      console.log("Categories API Response:", response);

      // Xử lý cấu trúc phản hồi từ API
      let categoriesData = [];

      if (response && response.data && response.data.data) {
        // Cấu trúc API mới
        categoriesData = response.data.data;
      } else if (response && response.data) {
        // Cấu trúc cũ
        categoriesData = Array.isArray(response.data) ? response.data : [];
      } else if (response && Array.isArray(response)) {
        categoriesData = response;
      }

      console.log("Categories Data after processing:", categoriesData);
      setCategories(categoriesData);

      // Tạo map categoryId -> categoryName để dễ dàng tra cứu
      const categoryMapping = {};
      if (Array.isArray(categoriesData)) {
        categoriesData.forEach((category) => {
          if (
            category &&
            category.id &&
            (category.name || category.categoryName)
          ) {
            categoryMapping[category.id] =
              category.categoryName || category.name;
          }
        });
      }
      console.log("Category Mapping:", categoryMapping);
      setCategoryMap(categoryMapping);
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Không thể tải danh sách danh mục");
      setCategories([]);
    }
  };

  const fetchCountries = async () => {
    try {
      const countriesData = await getCountries();
      console.log("Fetched countries:", countriesData.length);
      setCountries(countriesData);
    } catch (error) {
      console.error("Error fetching countries:", error);
      message.error("Không thể tải danh sách quốc gia");
    }
  };

  const handleRefresh = () => {
    setRefreshKey((oldKey) => oldKey + 1);
    message.info("Đang làm mới dữ liệu...");
  };

  const handleSearch = (value) => {
    setSearchText(value);
    if (value) {
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(value.toLowerCase()) ||
          (product.categoryName &&
            product.categoryName.toLowerCase().includes(value.toLowerCase()))
      );
      setProducts(filteredProducts);
    } else {
      fetchProducts();
    }
  };

  const showAddModal = () => {
    setEditingProduct(null);
    form.resetFields();
    setFileList([]);
    setIsModalVisible(true);
  };

  const showEditModal = (product) => {
    setEditingProduct(product);
    form.setFieldsValue({
      name: product.name,
      description: product.description,
      expiredMonthOffset: product.expiredMonthOffset || 24,
      price: product.price || 0,
      capacity: product.capacity || 0,
      quantity: product.quantity || 0,
      guide: product.guide || "",
      categoryId: product.categoryId,
      brandId: product.brandId,
      madeIn: product.madeIn || "",
    });

    // Set file list if product has images
    if (product.productImages && product.productImages.length > 0) {
      const files = product.productImages.map((img, index) => ({
        uid: `-${index}`,
        name: `image-${index}.jpg`,
        status: "done",
        url: img.imageUrl,
      }));
      setFileList(files);
    } else {
      setFileList([]);
    }

    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setFileList([]);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      message.success("Sản phẩm đã được xóa");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Không thể xóa sản phẩm");
    }
  };

  const onFinish = async (values) => {
    console.log("Form values before submission:", values);

    try {
      setLoading(true);

      if (editingProduct) {
        // Cập nhật sản phẩm hiện có
        // Thay vì sử dụng FormData, chuyển trực tiếp dữ liệu từ form
        const updateData = {
          ...values,
          id: editingProduct.id,
          // Đảm bảo categoryId và brandId là số
          categoryId: Number(values.categoryId),
          brandId: Number(values.brandId),
        };

        console.log("Sending update data:", updateData);

        const response = await updateProduct(updateData);
        console.log("Update product response:", response);

        if (response && response.statusCode === 200) {
          // Kiểm tra xem có cần upload hình ảnh mới không
          const hasNewImages = fileList.some((file) => file.originFileObj);

          if (hasNewImages) {
            // Nếu có hình ảnh mới, tạo FormData chỉ để upload hình ảnh
            try {
              const imageFormData = new FormData();
              imageFormData.append("productId", editingProduct.id); // Đổi tên trường theo yêu cầu API

              fileList.forEach((file) => {
                if (file.originFileObj) {
                  imageFormData.append("file", file.originFileObj); // Đổi tên trường thành "file" theo yêu cầu API
                }
              });

              console.log("Uploading product images separately");

              // Sử dụng đúng endpoint và phương thức POST theo API
              const uploadResponse = await axiosInstance.post(
                "/product-image",
                imageFormData,
                {
                  headers: {
                    // Không đặt Content-Type để axios tự xử lý
                  },
                }
              );

              console.log("Image upload response:", uploadResponse);

              // Nếu upload thành công, làm mới dữ liệu ngay lập tức
              if (
                uploadResponse.data &&
                uploadResponse.data.statusCode === 200
              ) {
                fetchProducts();
              }
            } catch (imageError) {
              console.error("Error uploading images:", imageError);
              message.warning(
                "Sản phẩm đã được cập nhật nhưng không thể tải lên hình ảnh"
              );
            }
          }

          message.success(
            response.message || "Sản phẩm đã được cập nhật thành công"
          );

          // Cập nhật UI ngay lập tức
          // Giữ lại thông tin hình ảnh từ sản phẩm cũ nếu không có hình ảnh mới
          setProducts((prev) =>
            Array.isArray(prev)
              ? prev.map((item) => {
                  if (item.id === editingProduct.id) {
                    // Giữ lại thông tin hình ảnh cũ nếu không có hình ảnh mới
                    const updatedProduct = {
                      ...item,
                      ...values,
                      productImages: item.productImages, // Giữ nguyên thông tin hình ảnh
                    };
                    return updatedProduct;
                  }
                  return item;
                })
              : []
          );

          // Sau đó làm mới dữ liệu từ server để lấy thông tin mới nhất
          setTimeout(() => {
            fetchProducts();
          }, 300);
        } else {
          message.error(response?.message || "Không thể cập nhật sản phẩm");
        }
      } else {
        // Thêm sản phẩm mới (giữ nguyên code hiện tại)
        const formData = new FormData();

        // Add all form values to FormData
        Object.keys(values).forEach((key) => {
          if (values[key] !== undefined && values[key] !== null) {
            // Ensure categoryId and brandId are sent as numbers
            if (key === "categoryId" || key === "brandId") {
              formData.append(key, Number(values[key]));
            } else {
              formData.append(key, values[key]);
            }
          }
        });

        // Handle file uploads
        fileList.forEach((file) => {
          if (file.originFileObj) {
            formData.append("productImagesFile", file.originFileObj);
          }
        });

        // Debug: Log FormData content
        console.log("FormData content for create:");
        for (let pair of formData.entries()) {
          if (pair[0] === "productImagesFile" && pair[1] instanceof File) {
            console.log(
              `${pair[0]}: [File] ${pair[1].name} (${pair[1].type}, ${pair[1].size} bytes)`
            );
          } else {
            console.log(`${pair[0]}: ${pair[1]}`);
          }
        }

        const response = await createProduct(formData);
        console.log("Create product response:", response);

        if (response && response.statusCode === 200) {
          message.success(
            response.message || "Sản phẩm mới đã được thêm thành công"
          );

          // Cập nhật UI ngay lập tức nếu có dữ liệu trả về
          if (response.data) {
            setProducts((prev) =>
              Array.isArray(prev) ? [...prev, response.data] : [response.data]
            );
          }

          // Sau đó làm mới dữ liệu từ server
          setTimeout(() => {
            fetchProducts();
          }, 300);
        } else {
          message.error(response?.message || "Không thể thêm sản phẩm mới");
        }
      }

      // Đóng modal và reset form
      setIsModalVisible(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Error saving product:", error);

      // Hiển thị thông báo lỗi
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);

        message.error(
          `Lỗi ${error.response.status}: ${
            error.response.statusText || "Không thể lưu sản phẩm"
          }`
        );
      } else {
        message.error("Không thể lưu sản phẩm. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Hình ảnh",
      dataIndex: "productImages",
      key: "image",
      render: (images, record) => {
        // Kiểm tra nhiều trường hợp để lấy URL hình ảnh
        let imageUrl = "https://via.placeholder.com/50";

        if (images && images.length > 0) {
          // Trường hợp 1: Có mảng productImages với imageUrl
          if (images[0].imageUrl) {
            imageUrl = images[0].imageUrl;
          }
          // Trường hợp 2: Có mảng productImages với link
          else if (images[0].link) {
            imageUrl = images[0].link;
          }
        }
        // Trường hợp 3: Có trường image hoặc imageUrl trực tiếp trên record
        else if (record.image) {
          imageUrl = record.image;
        } else if (record.imageUrl) {
          imageUrl = record.imageUrl;
        }

        return (
          <Image
            src={imageUrl}
            width={50}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/50";
            }}
          />
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price?.toLocaleString() || 0}₫`,
    },
    {
      title: "Danh mục",
      dataIndex: "categoryId",
      key: "category",
      render: (categoryId, record) => {
        console.log("Category ID:", categoryId, "CategoryMap:", categoryMap);
        // Thử lấy từ cả hai nguồn: categoryMap và record.categoryName
        return (
          categoryMap[categoryId] || record.categoryName || "Không xác định"
        );
      },
    },
    {
      title: "Thương hiệu",
      dataIndex: "brandId",
      key: "brand",
      render: (brandId, record) => {
        console.log("Brand ID:", brandId, "BrandMap:", brandMap);
        // Thử lấy từ cả hai nguồn: brandMap và record.brandName
        return brandMap[brandId] || record.brandName || "Không xác định";
      },
    },
    {
      title: "Xuất xứ",
      dataIndex: "madeIn",
      key: "madeIn",
      render: (madeIn) => {
        const foundCountry = countries.find((c) => c.name === madeIn);
        const flagUrl = foundCountry?.flag || DEFAULT_FLAG;

        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={flagUrl}
              alt={madeIn}
              style={{
                width: 24,
                height: 18,
                marginRight: 8,
                objectFit: "cover",
                border: "1px solid #eee",
              }}
              onError={(e) => {
                e.target.onerror = null; // Tránh vòng lặp lỗi
                e.target.src = DEFAULT_FLAG;
              }}
            />
            {madeIn || "Không xác định"}
          </div>
        );
      },
    },
    {
      title: "Tồn kho",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="product-management">
      <h2>Quản lý sản phẩm</h2>

      <div
        className="product-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Input
          placeholder="Tìm kiếm sản phẩm"
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
            Thêm sản phẩm mới
          </Button>
          <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
            Làm mới
          </Button>
        </div>
      </div>

      <Spin spinning={loading} tip="Đang tải...">
        <Table
          dataSource={Array.isArray(products) ? products : []}
          columns={columns}
          rowKey={(record) => record.id || Math.random()}
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "Không có dữ liệu sản phẩm" }}
        />
      </Spin>

      <Modal
        title={editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả sản phẩm!" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="expiredMonthOffset"
            label="Thời hạn sử dụng (tháng)"
            initialValue={24}
          >
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>

          <Form.Item name="price" label="Giá" initialValue={0}>
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              min={0}
            />
          </Form.Item>

          <Form.Item name="capacity" label="Dung tích" initialValue={0}>
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>

          <Form.Item name="quantity" label="Số lượng" initialValue={0}>
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>

          <Form.Item
            name="guide"
            label="Hướng dẫn sử dụng"
            rules={[
              { required: true, message: "Vui lòng nhập hướng dẫn sử dụng!" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Select
              placeholder="Chọn danh mục"
              loading={categories.length === 0}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {Array.isArray(categories) &&
                categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.categoryName || category.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="brandId"
            label="Thương hiệu"
            rules={[{ required: true, message: "Vui lòng chọn thương hiệu!" }]}
          >
            <Select
              placeholder="Chọn thương hiệu"
              loading={brands.length === 0}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {Array.isArray(brands) &&
                brands.map((brand) => (
                  <Select.Option key={brand.id} value={brand.id}>
                    {brand.brandName || brand.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="madeIn"
            label="Xuất xứ"
            rules={[{ required: true, message: "Vui lòng chọn xuất xứ!" }]}
          >
            <Select
              placeholder="Chọn quốc gia"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              loading={countries.length === 0}
            >
              {countries.map((country) => (
                <Select.Option key={country.name} value={country.name}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={country.flag}
                      alt={country.name}
                      style={{
                        width: 24,
                        height: 18,
                        marginRight: 8,
                        objectFit: "cover",
                        border: "1px solid #eee",
                      }}
                      onError={(e) => {
                        e.target.onerror = null; // Tránh vòng lặp lỗi
                        e.target.src = DEFAULT_FLAG;
                      }}
                    />
                    {country.name}
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="productImagesFile" label="Hình ảnh sản phẩm">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false}
              multiple
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item style={{ textAlign: "right" }}>
            <Button style={{ marginRight: 8 }} onClick={handleCancel}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingProduct ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;
