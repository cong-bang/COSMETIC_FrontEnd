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
  Tooltip,
} from "antd";
import { toast } from "react-toastify";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import "./UserManagement.scss"; // Reusing the same styles
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  OrderStatus,
} from "../../services/orderService";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchOrders();
  }, [refreshKey]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getAllOrders();
      console.log("API Response:", response);

      if (response?.data?.data && Array.isArray(response.data.data)) {
        console.log("Đã tìm thấy dữ liệu đơn hàng:", response.data.data);
        setOrders(response.data.data);
        setLoading(false);
      } else if (response?.data && Array.isArray(response.data)) {
        console.log("Dữ liệu đơn hàng ở response.data:", response.data);
        setOrders(response.data);
        setLoading(false);
      } else {
        console.warn("API response format unexpected:", response);
        // Sử dụng dữ liệu mẫu khi không có phản hồi đúng định dạng
        const sampleData = getSampleOrders();
        setOrders(sampleData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(
        "Không thể tải danh sách đơn hàng từ server! Hiển thị dữ liệu mẫu.",
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
      // Sử dụng dữ liệu mẫu khi có lỗi
      const sampleData = getSampleOrders();
      setOrders(sampleData);
      setLoading(false);
    }
  };

  // Hàm tạo dữ liệu mẫu
  const getSampleOrders = () => {
    return [
      {
        id: 1,
        userId: 101,
        userName: "Nguyễn Văn A",
        shippingAddress: "123 Đường Lê Lợi, Quận 1, TP HCM",
        phoneNumber: "0215790373",
        orderNote: "Giao hàng giờ hành chính",
        status: 0,
        totalAmount: 1250000,
        createdAt: "2023-11-15T08:30:00Z",
      },
      {
        id: 2,
        userId: 102,
        userName: "Trần Thị B",
        shippingAddress: "456 Đường Nguyễn Huệ, Quận 3, TP HCM",
        phoneNumber: "0813419681",
        orderNote: "Gọi trước khi giao",
        status: 1,
        totalAmount: 850000,
        createdAt: "2023-11-14T10:15:00Z",
      },
      {
        id: 3,
        userId: 103,
        userName: "Lê Văn C",
        shippingAddress: "789 Đường Cách Mạng Tháng 8, Quận 10, TP HCM",
        phoneNumber: "0905123456",
        orderNote: "",
        status: 2,
        totalAmount: 2100000,
        createdAt: "2023-11-13T14:45:00Z",
      },
    ];
  };

  const handleRefresh = () => {
    setRefreshKey((oldKey) => oldKey + 1);
    toast.info("Đang làm mới dữ liệu...", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleUpdateOrder = async (order) => {
    try {
      setLoading(true);
      console.log("Updating order:", order);

      // Sử dụng id từ order hoặc sử dụng code nếu không có id
      const orderId = order.id;
      console.log("Using orderId for API call:", orderId);

      if (!orderId) {
        toast.error("Không tìm thấy ID đơn hàng", {
          position: "top-right",
          autoClose: 5000,
        });
        setLoading(false);
        return;
      }

      const orderDetails = await getOrderById(orderId);
      console.log("Order details response:", orderDetails);

      if (orderDetails && orderDetails.data) {
        const orderData = orderDetails.data;
        setCurrentOrder(orderData);

        // Đảm bảo sử dụng đúng trường id
        form.setFieldsValue({
          orderId: orderData.id, // Lưu id vào form
          shippingAddress: orderData.shippingAddress,
          phoneNumber: orderData.phoneNumber,
          orderNote: orderData.orderNote,
          status: orderData.status,
        });

        setIsUpdate(true);
        setIsModalOpen(true);
        setLoading(false);
      } else {
        toast.error("Không thể tải thông tin đơn hàng", {
          position: "top-right",
          autoClose: 5000,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Không thể tải thông tin đơn hàng", {
        position: "top-right",
        autoClose: 5000,
      });
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    form.resetFields();
    setIsUpdate(false);
    setCurrentOrder(null);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setIsUpdate(false);
    setCurrentOrder(null);
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      let response;

      if (isUpdate) {
        // Update existing order
        console.log("Updating order with values:", values);

        // Đảm bảo sử dụng đúng ID cho việc update
        const updateData = {
          orderId: values.orderId, // Sử dụng orderId thay vì id để khớp với API backend
          shippingAddress: values.shippingAddress,
          orderNote: values.orderNote,
          phoneNumber: values.phoneNumber,
          status: values.status,
        };

        console.log("Sending update data:", updateData);
        response = await updateOrder(updateData);
      } else {
        // Create new order
        console.log("Creating new order with values:", values);
        response = await createOrder({
          shippingAddress: values.shippingAddress,
          orderNote: values.orderNote,
          phoneNumber: values.phoneNumber,
        });
      }

      console.log("API response:", response);

      if (response && !response.error) {
        toast.success(
          isUpdate
            ? "Cập nhật đơn hàng thành công!"
            : "Thêm đơn hàng thành công!",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        form.resetFields();
        setIsModalOpen(false);
        setIsUpdate(false);
        setCurrentOrder(null);
        fetchOrders();
      } else {
        toast.error(response?.error || "Có lỗi xảy ra. Vui lòng thử lại sau.", {
          position: "top-right",
          autoClose: 5000,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.", {
        position: "top-right",
        autoClose: 5000,
      });
      setLoading(false);
    }
  };

  const getStatusTag = (status) => {
    switch (status) {
      case OrderStatus.Processing:
        return <Tag color="blue">Đang xử lý</Tag>;
      case OrderStatus.Shipped:
        return <Tag color="orange">Đã giao cho ĐVVC</Tag>;
      case OrderStatus.Delivered:
        return <Tag color="green">Đã giao thành công</Tag>;
      case OrderStatus.Cancelled:
        return <Tag color="red">Đã hủy</Tag>;
      case OrderStatus.Returned:
        return <Tag color="purple">Đã trả hàng</Tag>;
      default:
        return <Tag color="default">Không xác định</Tag>;
    }
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id", // Sử dụng id thay vì code
      key: "id",
      width: 120,
      render: (id, record) => record.code || id, // Hiển thị code nếu có, nếu không thì hiển thị id
    },
    {
      title: "Khách hàng",
      dataIndex: "userId",
      key: "userId",
      width: 200,
      render: (userId) => `Khách hàng #${userId}`,
    },
    {
      title: "Địa chỉ",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          <Space>
            <EnvironmentOutlined />
            {address}
          </Space>
        </Tooltip>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 150,
      render: (phone) => (
        <Space>
          <PhoneOutlined />
          {phone}
        </Space>
      ),
    },
    {
      title: "Ghi chú",
      dataIndex: "orderNote",
      key: "orderNote",
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (note) =>
        note ? (
          <Tooltip placement="topLeft" title={note}>
            <Space>
              <FileTextOutlined />
              {note}
            </Space>
          </Tooltip>
        ) : (
          <span>-</span>
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => getStatusTag(status),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      width: 150,
      render: (total) => `${(total || 0).toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleUpdateOrder(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="user-management">
      <div className="user-header">
        <Title level={2}>Quản lý đơn hàng</Title>
        <div className="header-buttons">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenModal}
            style={{ marginRight: 8 }}
            className="add-button"
          >
            Thêm đơn hàng
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

      <div className="user-management-content">
        <Spin spinning={loading} tip="Đang tải...">
          <Table
            columns={columns}
            dataSource={Array.isArray(orders) ? orders : []}
            rowKey="id" // Sử dụng id thay vì code
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1200 }}
            className="users-table"
            rowClassName="table-row-animation"
            locale={{ emptyText: "Không có dữ liệu đơn hàng" }}
          />
        </Spin>
      </div>

      <Modal
        title={isUpdate ? "Cập nhật đơn hàng" : "Thêm đơn hàng mới"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        confirmLoading={loading}
        className="user-modal"
        width={700}
      >
        <Form
          form={form}
          name="orderForm"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          className="user-form"
          layout="horizontal"
          initialValues={{ status: OrderStatus.Processing }}
        >
          {isUpdate && (
            <Form.Item name="orderId" hidden>
              <Input />
            </Form.Item>
          )}

          <div className="form-columns">
            <div className="form-column">
              <Form.Item
                name="shippingAddress"
                label="Địa chỉ giao hàng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ giao hàng!",
                  },
                ]}
              >
                <Input
                  className="input-animation"
                  placeholder="Nhập địa chỉ giao hàng"
                />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Số điện thoại phải có 10 chữ số!",
                  },
                ]}
              >
                <Input
                  className="input-animation"
                  placeholder="Nhập số điện thoại"
                />
              </Form.Item>
            </div>

            <div className="form-column">
              <Form.Item name="orderNote" label="Ghi chú đơn hàng">
                <TextArea
                  className="input-animation"
                  placeholder="Nhập ghi chú đơn hàng (nếu có)"
                  rows={3}
                />
              </Form.Item>

              {isUpdate && (
                <Form.Item
                  name="status"
                  label="Trạng thái đơn hàng"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn trạng thái đơn hàng!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn trạng thái"
                    className="input-animation"
                  >
                    <Option value={OrderStatus.Processing}>Đang xử lý</Option>
                    <Option value={OrderStatus.Shipped}>
                      Đã giao cho đơn vị vận chuyển
                    </Option>
                    <Option value={OrderStatus.Delivered}>
                      Đã giao thành công
                    </Option>
                    <Option value={OrderStatus.Cancelled}>Đã hủy</Option>
                    <Option value={OrderStatus.Returned}>Đã trả hàng</Option>
                  </Select>
                </Form.Item>
              )}
            </div>
          </div>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="submit-button"
              >
                {isUpdate ? "Cập nhật" : "Thêm mới"}
              </Button>
              <Button onClick={handleCancel}>Hủy</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderManagement;
