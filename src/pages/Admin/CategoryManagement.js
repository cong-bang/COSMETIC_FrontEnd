import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  Popconfirm,
  message,
  Spin,
  Typography,
  Select,
  Tag,
  Space,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./CategoryManagement.scss";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";

const { Title } = Typography;
const { Option } = Select;

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, [refreshKey]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategories();
      console.log("API Response:", response);
      if (response?.data?.data) {
        setTimeout(() => {
          setCategories(response.data.data);
          setLoading(false);
        }, 300);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Không thể tải danh mục từ server!");
      setCategories([]);
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((oldKey) => oldKey + 1);
    message.info("Đang làm mới dữ liệu...");
  };

  const handleDelete = async (category) => {
    try {
      setLoading(true);
      const response = await deleteCategory(category.id);

      if (response && response.statusCode === 200) {
        message.success(response.message || "Category deleted successfully");

        setCategories((prev) => prev.filter((item) => item.id !== category.id));
        setTimeout(() => {
          fetchCategories();
        }, 300);
      } else {
        message.error(response?.message || "Failed to delete category");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      message.error("Failed to delete category. Please try again.");
      setLoading(false);
    }
  };

  const handleUpdateCategory = (category) => {
    setIsUpdate(true);
    setCurrentCategory(category);
    form.setFieldsValue({
      categoryName: category.categoryName,
      description: category.description,
      parentId: category.parentId || null,
    });
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsUpdate(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsUpdate(false);
    setCurrentCategory(null);
    form.resetFields();
  };

  const onFinish = async (values) => {
    if (isUpdate && currentCategory) {
      // Update existing category
      try {
        setLoading(true);
        const categoryData = {
          id: currentCategory.id,
          ...values,
          parentId: values.parentId || null,
        };

        const response = await updateCategory(currentCategory.id, categoryData);

        if (response && response.statusCode === 200) {
          message.success(response.message || "Category updated successfully");

          setCategories((prev) =>
            prev.map((item) =>
              item.id === currentCategory.id ? { ...item, ...values } : item
            )
          );

          setTimeout(() => {
            fetchCategories();
          }, 300);
        } else {
          message.error(response?.message || "Failed to update category");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error updating category:", error);
        message.error("Failed to update category. Please try again.");
        setLoading(false);
      } finally {
        handleCancel();
      }
    } else {
      // Add new category
      try {
        setLoading(true);
        const categoryData = {
          ...values,
          parentId: values.parentId || null,
        };

        const response = await createCategory(categoryData);
        console.log("Create response:", response);

        if (response && response.statusCode === 200) {
          message.success(response.message || "Category added successfully");

          if (response.data) {
            setCategories((prev) => [...prev, response.data]);
          }

          setTimeout(() => {
            fetchCategories();
          }, 300);
        } else {
          message.error(response?.message || "Failed to add category");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error adding category:", error);
        message.error("Failed to add category. Please try again.");
        setLoading(false);
      } finally {
        handleCancel();
      }
    }
  };

  // Tìm tên danh mục cha dựa trên parentId
  const getParentCategoryName = (parentId) => {
    if (!parentId) return null;
    const parentCategory = categories.find((cat) => cat.id === parentId);
    return parentCategory ? parentCategory.categoryName : null;
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <span className="category-name">{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <span className="category-description">{text}</span>,
    },
    {
      title: "Parent Category",
      dataIndex: "parentId",
      key: "parentId",
      render: (parentId) => {
        const parentName = getParentCategoryName(parentId);
        return parentName ? (
          <Tag color="blue">{parentName}</Tag>
        ) : (
          <Tag color="green">null</Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="action-buttons">
          <Button
            type="primary"
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
            onClick={() => handleUpdateCategory(record)}
            className="edit-button"
          >
            Update
          </Button>
          <Popconfirm
            title="Delete the category"
            description="Are you sure to delete this category?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
            placement="topRight"
          >
            <Button danger icon={<DeleteOutlined />} className="delete-button">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Tạo danh sách các danh mục có thể chọn làm cha (loại bỏ danh mục hiện tại nếu đang cập nhật)
  const getParentOptions = () => {
    if (isUpdate && currentCategory) {
      // Khi cập nhật, loại bỏ danh mục hiện tại và các danh mục con của nó
      return categories
        .filter(
          (cat) =>
            cat.id !== currentCategory.id && cat.parentId !== currentCategory.id
        )
        .map((cat) => (
          <Option key={cat.id} value={cat.id}>
            {cat.categoryName}
          </Option>
        ));
    } else {
      // Khi tạo mới, hiển thị tất cả danh mục
      return categories.map((cat) => (
        <Option key={cat.id} value={cat.id}>
          {cat.categoryName}
        </Option>
      ));
    }
  };

  return (
    <div className="category-management">
      <div className="category-header">
        <Title level={2}>Category Management</Title>
        <div className="header-buttons">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenModal}
            style={{ marginRight: 8 }}
            className="add-button"
          >
            Add New Category
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            className="refresh-button"
          >
            Refresh
          </Button>
        </div>
      </div>

      <Modal
        title={isUpdate ? "Update Category" : "Add New Category"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        confirmLoading={loading}
        className="category-modal"
      >
        <Form
          form={form}
          name="categoryForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          className="category-form"
        >
          <Form.Item
            label="Category Name"
            name="categoryName"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input className="input-animation" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea className="input-animation" />
          </Form.Item>
          <Form.Item label="Parent Category" name="parentId">
            <Select
              placeholder="Select parent category (optional)"
              allowClear
              className="input-animation"
              dropdownClassName="parent-dropdown"
            >
              {getParentOptions()}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="submit-button"
              >
                {isUpdate ? "Update" : "Add"}
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Spin spinning={loading} tip="Loading...">
        <Table
          dataSource={categories}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className="categories-table"
          rowClassName="table-row-animation"
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>
                <strong>ID:</strong> {record.id} |<strong> Created:</strong>{" "}
                {record.createdAt
                  ? new Date(record.createdAt).toLocaleString()
                  : "N/A"}{" "}
                |<strong> Updated:</strong>{" "}
                {record.updatedAt
                  ? new Date(record.updatedAt).toLocaleString()
                  : "N/A"}
              </p>
            ),
            expandIconColumnIndex: 5,
          }}
        />
      </Spin>
    </div>
  );
};

export default CategoryManagement;
