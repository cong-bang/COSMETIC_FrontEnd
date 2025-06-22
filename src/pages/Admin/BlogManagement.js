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
  Upload,
  Space,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { get5Blogs, createBlog, updateBlog, deleteBlog } from "../../services/blogService";

const { Title } = Typography;

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [image, setImage] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBlogs();
  }, [refreshKey]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await get5Blogs(1, 5);
      if (response?.data) {
        setTimeout(() => {
          setBlogs(response.data);
          setLoading(false);
        }, 300);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      message.error("Không thể tải blog từ server!");
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((oldKey) => oldKey + 1);
    message.info("Đang làm mới dữ liệu...");
  };

  const handleDelete = async (blog) => {
    try {
      setLoading(true);
      const response = await deleteBlog(blog.id);
      if (response?.statusCode === 200) {
        message.success(response.message || "Blog deleted successfully");
        setTimeout(() => fetchBlogs(), 300);
      } else {
        message.error(response?.message || "Failed to delete blog");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      message.error("Failed to delete blog");
      setLoading(false);
    }
  };

  const handleUpdateBlog = (blog) => {
    setIsUpdate(true);
    setCurrentBlog(blog);
    form.setFieldsValue({
      title: blog.title,
      description: blog.description,
      image: image
    });
    setImage(blog.image);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsUpdate(false);
    form.resetFields();
    setImage(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsUpdate(false);
    setCurrentBlog(null);
    setImage(null);
    form.resetFields();
  };

  const onFinish = async (values) => {
    const blogData = {
      ...values,
      image,
    };

    if (isUpdate && currentBlog) {
      // Update blog
      blogData.id = currentBlog.id;
      console.log(blogData);
      try {
        setLoading(true);
        const response = await updateBlog(blogData);
        message.success(response.message);
      } catch (error) {
        console.error("Error updating blog:", error);
        message.error(error.message);
        setLoading(false);
      } finally {
        handleCancel();
        setLoading(false);
      }
    } else {
      // Create new blog
      try {
        setLoading(true);
        const response = await createBlog(blogData);
        message.success(response.message);
      } catch (error) {
        console.error("Error adding blog:", error);
        message.error(error.message);
        setLoading(false);
      } finally {
        handleCancel();
        setLoading(false);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image ? (
          <img src={image} alt="blog" style={{ width: 80, height: 50, objectFit: "cover" }} />
        ) : (
          <span style={{ color: "#ccc" }}>No Image</span>
        ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleUpdateBlog(record)}
          >
            Update
          </Button>
          <Popconfirm
            title="Delete this blog?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="category-management">
      <div className="category-header">
              <Title level={2}>Quản lý bài viết</Title>
              <div className="header-buttons">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleOpenModal}
                  style={{ marginRight: 8 }}
                  className="add-button"
                >
                  Thêm bài viết mới
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={handleRefresh}
                  className="refresh-button"
                >
                  Làm mới
                </Button>
              </div>
            </div>

      <Modal
        title={isUpdate ? "Update Blog" : "Add New Blog"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input blog title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label="Image">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && (
              <img
                src={image}
                alt="Preview"
                style={{ width: "100%", marginTop: 10, borderRadius: 5 }}
              />
            )}
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                {isUpdate ? "Update" : "Add"}
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Spin spinning={loading} tip="Loading...">
        <Table
          dataSource={blogs}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 8 }}
        />
      </Spin>
    </div>
  );
};

export default BlogManagement;
