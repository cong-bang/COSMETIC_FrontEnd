import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Popconfirm,
  DatePicker,
  InputNumber,
  Typography,
  Switch,
  Tooltip,
  Select,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import moment from "moment";
import voucherService from "../../services/voucherService";
import "./Admin.scss";

const { Title } = Typography;
const { Option } = Select;

// Enum cho loại voucher
const VoucherTypeEnum = {
  PERCENTAGE: 0,
  FIXED_AMOUNT: 1,
  FREE_SHIPPING: 2,
};

const VoucherManagement = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Fetch vouchers on component mount
  useEffect(() => {
    fetchVouchers();
  }, []);

  // Update filtered data when vouchers or search text changes
  useEffect(() => {
    if (searchText) {
      const filtered = vouchers.filter(
        (item) =>
          (item.voucherType !== undefined &&
            item.voucherType
              .toString()
              .toLowerCase()
              .includes(searchText.toLowerCase())) ||
          (item.voucherValue !== undefined &&
            item.voucherValue
              .toString()
              .toLowerCase()
              .includes(searchText.toLowerCase()))
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(vouchers);
    }
  }, [vouchers, searchText]);

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const response = await voucherService.getVouchers();
      if (response && response.data) {
        setVouchers(response.data.data || []);
      } else {
        setVouchers([]);
      }
    } catch (error) {
      message.error("Không thể tải danh sách voucher");
      console.error("Error fetching vouchers:", error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = (voucher = null) => {
    setEditingVoucher(voucher);
    if (voucher) {
      form.setFieldsValue({
        voucherType: voucher.voucherType,
        voucherValue: voucher.voucherValue,
        startDate: voucher.startDate
          ? moment(voucher.startDate, "DD/MM/YYYY")
          : null,
        endDate: voucher.endDate ? moment(voucher.endDate, "DD/MM/YYYY") : null,
        quantity: voucher.quantity,
        minOrderValue: voucher.minOrderValue,
        isActive: voucher.isActive !== undefined ? voucher.isActive : true,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        voucherType: VoucherTypeEnum.PERCENTAGE,
        isActive: true,
      });
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingVoucher(null);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const voucherData = {
        voucherType: values.voucherType,
        voucherValue: values.voucherValue,
        startDate: values.startDate
          ? values.startDate.format("DD/MM/YYYY")
          : null,
        endDate: values.endDate ? values.endDate.format("DD/MM/YYYY") : null,
        quantity: values.quantity,
        minOrderValue: values.minOrderValue,
        isActive: values.isActive,
        model: "VoucherModel", // Thêm trường model theo yêu cầu của API
      };

      let response;
      if (editingVoucher) {
        response = await voucherService.updateVoucher(editingVoucher.id, {
          id: editingVoucher.id,
          ...voucherData,
        });
        if (response && response.statusCode === 200) {
          message.success("Cập nhật voucher thành công");
        } else {
          message.error("Cập nhật voucher thất bại");
        }
      } else {
        response = await voucherService.createVoucher(voucherData);
        if (response && response.statusCode === 200) {
          message.success("Tạo voucher thành công");
        } else {
          message.error(
            "Tạo voucher thất bại: " +
              (response?.message || "Lỗi không xác định")
          );
        }
      }

      setIsModalVisible(false);
      fetchVouchers();
      form.resetFields();
      setEditingVoucher(null);
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await voucherService.deleteVoucher(id);
      if (response && response.statusCode === 200) {
        message.success("Xóa voucher thành công");
        fetchVouchers();
      } else {
        message.error("Xóa voucher thất bại");
      }
    } catch (error) {
      message.error("Không thể xóa voucher");
      console.error("Error deleting voucher:", error);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Chuyển đổi mã enum thành text hiển thị
  const getVoucherTypeText = (type) => {
    switch (parseInt(type)) {
      case VoucherTypeEnum.PERCENTAGE:
        return "Giảm theo phần trăm";
      case VoucherTypeEnum.FIXED_AMOUNT:
        return "Giảm số tiền cố định";
      case VoucherTypeEnum.FREE_SHIPPING:
        return "Miễn phí vận chuyển";
      default:
        return "Không xác định";
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
    },
    {
      title: "Loại voucher",
      dataIndex: "voucherType",
      key: "voucherType",
      render: (type) => getVoucherTypeText(type),
    },
    {
      title: "Giá trị",
      dataIndex: "voucherValue",
      key: "voucherValue",
      render: (text, record) => {
        if (record.voucherType === VoucherTypeEnum.PERCENTAGE) {
          return `${text}%`;
        } else if (record.voucherType === VoucherTypeEnum.FREE_SHIPPING) {
          return "Miễn phí vận chuyển";
        } else {
          return `${text.toLocaleString()} VND`;
        }
      },
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => text.toLocaleString(),
    },
    {
      title: "Giá trị đơn hàng tối thiểu",
      dataIndex: "minOrderValue",
      key: "minOrderValue",
      render: (text) => `${text.toLocaleString()} VND`,
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <span style={{ color: isActive ? "green" : "red" }}>
          {isActive ? "Đang hoạt động" : "Không hoạt động"}
        </span>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => showModal(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa voucher này?"
              onConfirm={() => handleDelete(record.id)}
              okText="Có"
              cancelText="Không"
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="voucher-management admin-content-wrapper">
      <div className="admin-content-header">
        <Title level={2}>Quản lý Voucher</Title>
        <div className="admin-content-actions">
          <Input
            placeholder="Tìm kiếm voucher..."
            prefix={<SearchOutlined />}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 250, marginRight: 16 }}
          />
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={fetchVouchers}
            style={{ marginRight: 16 }}
          >
            Làm mới
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            Thêm Voucher
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
      />

      <Modal
        title={editingVoucher ? "Sửa Voucher" : "Thêm Voucher"}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={600}
        okText={editingVoucher ? "Cập nhật" : "Tạo mới"}
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          name="voucherForm"
          initialValues={{
            voucherType: VoucherTypeEnum.PERCENTAGE,
            isActive: true,
          }}
        >
          <Form.Item
            name="voucherType"
            label="Loại voucher"
            rules={[{ required: true, message: "Vui lòng chọn loại voucher!" }]}
          >
            <Select placeholder="Chọn loại voucher">
              <Option value={VoucherTypeEnum.PERCENTAGE}>
                Giảm theo phần trăm
              </Option>
              <Option value={VoucherTypeEnum.FIXED_AMOUNT}>
                Giảm số tiền cố định
              </Option>
              <Option value={VoucherTypeEnum.FREE_SHIPPING}>
                Miễn phí vận chuyển
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="voucherValue"
            label="Giá trị"
            rules={[
              { required: true, message: "Vui lòng nhập giá trị voucher!" },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Nhập giá trị voucher"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="startDate"
            label="Ngày bắt đầu"
            rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
          >
            <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="Ngày kết thúc"
            rules={[
              { required: true, message: "Vui lòng chọn ngày kết thúc!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Số lượng"
            rules={[
              { required: true, message: "Vui lòng nhập số lượng voucher!" },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Nhập số lượng voucher"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="minOrderValue"
            label="Giá trị đơn hàng tối thiểu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá trị đơn hàng tối thiểu!",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Nhập giá trị đơn hàng tối thiểu"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item name="isActive" label="Trạng thái" valuePropName="checked">
            <Switch
              checkedChildren="Hoạt động"
              unCheckedChildren="Không hoạt động"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VoucherManagement;
