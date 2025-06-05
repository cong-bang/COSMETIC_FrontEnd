import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Table, Popconfirm, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./CategoryManagement.scss";

// Mock data for categories since no API is available yet
const mockCategories = [
  { id: 1, category_name: "Skincare" },
  { id: 2, category_name: "Makeup" },
  { id: 3, category_name: "Hair Care" },
  { id: 4, category_name: "Body Care" },
  { id: 5, category_name: "Fragrance" },
];

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Simulate API fetch with mock data
    setCategories(mockCategories);
  }, []);

  const handleDelete = (category) => {
    // Filter out the deleted category
    setCategories(categories.filter((item) => item.id !== category.id));
    message.success("Category deleted successfully");
  };

  const handleUpdateCategory = (category) => {
    setIsUpdate(true);
    setCurrentCategory(category);
    form.setFieldsValue({ category_name: category.category_name });
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

  const onFinish = (values) => {
    if (isUpdate && currentCategory) {
      // Update existing category
      const updatedCategories = categories.map((category) =>
        category.id === currentCategory.id
          ? { ...category, ...values }
          : category
      );
      setCategories(updatedCategories);
      message.success("Category updated successfully");
    } else {
      // Add new category with a generated ID
      const newCategory = {
        id: Math.max(0, ...categories.map((c) => c.id)) + 1,
        ...values,
      };
      setCategories([...categories, newCategory]);
      message.success("Category added successfully");
    }
    handleCancel();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
            onClick={() => handleUpdateCategory(record)}
          >
            Update
          </Button>
          <Popconfirm
            title="Delete the category"
            description="Are you sure to delete this category?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="category-management">
      <div className="category-header">
        <h2>Category Management</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenModal}
          style={{ marginBottom: 16 }}
        >
          Add New Category
        </Button>
      </div>

      <Modal
        title={isUpdate ? "Update Category" : "Add New Category"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="categoryForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Category Name"
            name="category_name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {isUpdate ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Table
        dataSource={categories}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default CategoryManagement;
