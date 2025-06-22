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
} from "@ant-design/icons";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";
import { getBrands } from "../../services/brandService";
import { getCategories } from "../../services/categoryService";

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

  useEffect(() => {
    const loadData = async () => {
      await fetchBrands();
      await fetchCategories();
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

    // Add ID if editing
    if (editingProduct) {
      formData.append("id", editingProduct.id);
    }

    try {
      setLoading(true);

      if (editingProduct) {
        await updateProduct(formData);
        message.success("Sản phẩm đã được cập nhật");
      } else {
        await createProduct(formData);
        message.success("Sản phẩm mới đã được thêm");
      }

      setIsModalVisible(false);
      fetchProducts();
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Error saving product:", error);
      message.error("Không thể lưu sản phẩm");
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
      render: (images) => {
        const imageUrl =
          images && images.length > 0
            ? images[0].imageUrl
            : "https://via.placeholder.com/50";
        return <Image src={imageUrl} width={50} />;
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
            rules={[{ required: true, message: "Vui lòng nhập xuất xứ!" }]}
          >
            <Input />
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
