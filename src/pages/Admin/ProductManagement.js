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
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: "Kem Dưỡng Ẩm PURE Hydration",
    price: 450000,
    category: "Skincare",
    stock: 25,
    image: "https://via.placeholder.com/150",
    status: "active",
  },
  {
    id: 2,
    name: "Sữa Rửa Mặt PURE Clean",
    price: 250000,
    category: "Skincare",
    stock: 35,
    image: "https://via.placeholder.com/150",
    status: "active",
  },
  {
    id: 3,
    name: "Phấn Mắt PURE Colors",
    price: 350000,
    category: "Makeup",
    stock: 15,
    image: "https://via.placeholder.com/150",
    status: "active",
  },
  {
    id: 4,
    name: "Son Môi PURE Lips",
    price: 200000,
    category: "Makeup",
    stock: 40,
    image: "https://via.placeholder.com/150",
    status: "active",
  },
  {
    id: 5,
    name: "Serum Vitamin C PURE",
    price: 550000,
    category: "Skincare",
    stock: 0,
    image: "https://via.placeholder.com/150",
    status: "out_of_stock",
  },
];

// Mock categories for dropdown
const mockCategories = [
  { id: 1, name: "Skincare" },
  { id: 2, name: "Makeup" },
  { id: 3, name: "Hair Care" },
  { id: 4, name: "Body Care" },
  { id: 5, name: "Fragrance" },
];

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Simulate API fetch
    setProducts(mockProducts);
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    if (value) {
      const filteredProducts = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(value.toLowerCase()) ||
          product.category.toLowerCase().includes(value.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      setProducts(mockProducts);
    }
  };

  const showAddModal = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (product) => {
    setEditingProduct(product);
    form.setFieldsValue({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      status: product.status,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    message.success("Sản phẩm đã được xóa");
  };

  const onFinish = (values) => {
    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id ? { ...product, ...values } : product
      );
      setProducts(updatedProducts);
      message.success("Sản phẩm đã được cập nhật");
    } else {
      // Add new product
      const newProduct = {
        id: Math.max(0, ...products.map((p) => p.id)) + 1,
        ...values,
        image: "https://via.placeholder.com/150", // Default image for new products
      };
      setProducts([...products, newProduct]);
      message.success("Sản phẩm mới đã được thêm");
    }
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={image} width={50} />,
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
      render: (price) => `${price.toLocaleString()}₫`,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Đang bán" : "Hết hàng"}
        </Tag>
      ),
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
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
          Thêm sản phẩm mới
        </Button>
      </div>

      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
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
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              addonAfter="₫"
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Select>
              {mockCategories.map((category) => (
                <Select.Option key={category.id} value={category.name}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="stock"
            label="Số lượng tồn kho"
            rules={[
              { required: true, message: "Vui lòng nhập số lượng tồn kho!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
            initialValue="active"
          >
            <Select>
              <Select.Option value="active">Đang bán</Select.Option>
              <Select.Option value="out_of_stock">Hết hàng</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="image" label="Hình ảnh">
            <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </Form.Item>

          <Form.Item style={{ textAlign: "right" }}>
            <Button style={{ marginRight: 8 }} onClick={handleCancel}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              {editingProduct ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;
