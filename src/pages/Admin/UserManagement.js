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
  DatePicker,
  InputNumber,
  Upload,
  Tooltip,
} from "antd";
import { toast } from "react-toastify";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  UploadOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "./UserManagement.scss";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserAvatar,
} from "../../services/userService";
import { getAllProvinces } from "../../services/mapApiService";

const { Title } = Typography;
const { Option } = Select;
const { Password } = Input;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
    fetchProvinces();
  }, [refreshKey]);

  const fetchProvinces = async () => {
    try {
      const data = await getAllProvinces();
      if (data && Array.isArray(data)) {
        setProvinces(data);
      } else {
        console.error("Invalid provinces data format");
      }
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      console.log("API Response:", response);

      // Kiểm tra phản hồi API và xử lý dữ liệu giống như CategoryManagement.js
      if (response?.data?.data) {
        setTimeout(() => {
          setUsers(response.data.data);
          setLoading(false);
        }, 300);
      } else {
        console.warn("API response format unexpected:", response);
        // Sử dụng dữ liệu mẫu khi không có phản hồi đúng định dạng
        const sampleData = getSampleUsers();
        setUsers(sampleData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(
        "Không thể tải danh sách người dùng từ server! Hiển thị dữ liệu mẫu.",
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
      // Sử dụng dữ liệu mẫu khi có lỗi
      const sampleData = getSampleUsers();
      setUsers(sampleData);
      setLoading(false);
    }
  };

  // Hàm tạo dữ liệu mẫu
  const getSampleUsers = () => {
    return [
      {
        id: 1,
        fullName: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phoneNumber: "0123456789",
        gender: 0,
        yob: "01/01/1990",
        role: 0,
        userName: "usera",
        address: "Hà Nội",
      },
      {
        id: 2,
        fullName: "Trần Thị B",
        email: "tranthib@example.com",
        phoneNumber: "0987654321",
        gender: 1,
        yob: "02/02/1992",
        role: 1,
        userName: "userb",
        address: "Hồ Chí Minh",
      },
      {
        id: 3,
        fullName: "Lê Văn C",
        email: "levanc@example.com",
        phoneNumber: "0369852147",
        gender: 0,
        yob: "03/03/1988",
        role: 2,
        userName: "userc",
        address: "Đà Nẵng",
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

  const handleDelete = async (user) => {
    try {
      setLoading(true);
      const response = await deleteUser(user.id);

      if (response && response.statusCode === 200) {
        toast.success(response.message || "User deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });

        // Animation khi xóa
        setUsers((prev) => prev.filter((item) => item.id !== user.id));
        setTimeout(() => {
          fetchUsers();
        }, 300);
      } else {
        toast.error(response?.message || "Failed to delete user", {
          position: "top-right",
          autoClose: 5000,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
      setLoading(false);
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      setLoading(true);
      const userDetails = await getUserById(user.id);

      if (
        userDetails &&
        userDetails.statusCode === 200 &&
        userDetails.data?.data
      ) {
        setIsUpdate(true);
        setCurrentUser(userDetails.data.data);

        // Format date for DatePicker if yob exists
        const userData = userDetails.data.data;
        const formattedData = {
          ...userData,
        };

        // Xử lý ngày sinh
        if (userData.yob) {
          try {
            // Thử nhiều định dạng ngày khác nhau
            let momentDate;
            const formats = ["DD/MM/YYYY", "YYYY-MM-DD", "MM/DD/YYYY"];

            for (const format of formats) {
              momentDate = moment(userData.yob, format);
              if (momentDate.isValid()) {
                break;
              }
            }

            if (momentDate && momentDate.isValid()) {
              formattedData.yob = momentDate;
              console.log(
                "Valid date parsed:",
                momentDate.format("DD/MM/YYYY")
              );
            } else {
              console.warn(
                "Could not parse date with any format:",
                userData.yob
              );
              formattedData.yob = null;
            }
          } catch (error) {
            console.error("Error parsing date:", error);
            formattedData.yob = null;
          }
        } else {
          formattedData.yob = null;
        }

        console.log("Setting form values:", formattedData);
        form.setFieldsValue(formattedData);
        setIsModalOpen(true);
      } else {
        toast.error("Failed to fetch user details", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsUpdate(false);
    form.resetFields();
    form.setFieldsValue({ role: 2 });
    setPasswordVisible(false);
    setAvatarFile(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsUpdate(false);
    setCurrentUser(null);
    form.resetFields();
    setPasswordVisible(false);
    setAvatarFile(null);
  };

  const onFinish = async (values) => {
    // Format yob to DD/MM/YYYY if it exists
    if (values.yob && moment.isMoment(values.yob)) {
      values.yob = values.yob.format("DD/MM/YYYY");
      console.log("Formatted date of birth:", values.yob);
    } else if (values.yob) {
      // Nếu không phải là moment object, thử chuyển đổi
      try {
        const momentDate = moment(values.yob);
        if (momentDate.isValid()) {
          values.yob = momentDate.format("DD/MM/YYYY");
        }
      } catch (error) {
        console.error("Error formatting date:", error);
      }
    }

    if (isUpdate && currentUser) {
      // Update existing user
      try {
        setLoading(true);
        const userData = {
          id: currentUser.id,
          ...values,
        };

        const response = await updateUser(userData);

        if (response && response.statusCode === 200) {
          toast.success(response.message || "User updated successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
          });

          // Upload avatar if changed
          if (avatarFile) {
            await handleAvatarUpload(currentUser.id);
          }

          // Animation khi cập nhật
          setUsers((prev) =>
            prev.map((item) =>
              item.id === currentUser.id ? { ...item, ...values } : item
            )
          );

          setTimeout(() => {
            fetchUsers();
          }, 300);
        } else {
          toast.error(response?.message || "Failed to update user", {
            position: "top-right",
            autoClose: 5000,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Failed to update user. Please try again.", {
          position: "top-right",
          autoClose: 5000,
        });
        setLoading(false);
      } finally {
        handleCancel();
      }
    } else {
      // Add new user
      try {
        setLoading(true);
        const userData = {
          ...values,
          // Role đã được chọn từ dropdown (1-Admin hoặc 2-Staff)
        };

        const response = await createUser(userData);
        console.log("Create response:", response);

        if (response && response.statusCode === 200) {
          toast.success(response.message || "User added successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
          });

          // Upload avatar if selected
          if (avatarFile && response.data?.data && response.data.data.id) {
            await handleAvatarUpload(response.data.data.id);
          }

          // Animation khi thêm mới
          if (response.data?.data) {
            setUsers((prev) => [...prev, response.data.data]);
          }

          setTimeout(() => {
            fetchUsers();
          }, 300);
        } else {
          toast.error(response?.message || "Failed to add user", {
            position: "top-right",
            autoClose: 5000,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error adding user:", error);
        toast.error("Failed to add user. Please try again.", {
          position: "top-right",
          autoClose: 5000,
        });
        setLoading(false);
      } finally {
        handleCancel();
      }
    }
  };

  const handleAvatarUpload = async (userId) => {
    if (!avatarFile) return;

    try {
      const formData = new FormData();
      formData.append("file", avatarFile);
      formData.append("userId", userId);

      const response = await updateUserAvatar(formData);

      if (response && response.statusCode === 200) {
        toast.success("Avatar uploaded successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("Failed to upload avatar", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload avatar", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleAvatarChange = (info) => {
    if (info.file) {
      setAvatarFile(info.file.originFileObj);
    }
  };

  const getRoleTag = (role) => {
    switch (role) {
      case 0:
        return <Tag color="green">User</Tag>;
      case 1:
        return <Tag color="red">Admin</Tag>;
      case 2:
        return <Tag color="blue">Staff</Tag>;
      case 3:
        return <Tag color="cyan">Customer</Tag>;
      default:
        return <Tag color="default">Unknown</Tag>;
    }
  };

  const getGenderText = (gender) => {
    switch (gender) {
      case 0:
        return "Male";
      case 1:
        return "Female";
      case 2:
        return "Other";
      default:
        return "Unknown";
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <span className="user-name">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => getGenderText(gender),
    },
    {
      title: "Date of Birth",
      dataIndex: "yob",
      key: "yob",
      render: (yob) => {
        if (!yob) return "N/A";
        try {
          // Hiển thị ngày sinh theo định dạng DD/MM/YYYY
          return moment(yob, "DD/MM/YYYY").isValid() ? yob : "N/A";
        } catch (error) {
          return "N/A";
        }
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => getRoleTag(role),
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
            onClick={() => handleUpdateUser(record)}
            className="edit-button"
          >
            Update
          </Button>
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
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

  return (
    <div className="user-management">
      <div className="user-header">
        <Title level={2}>User Management</Title>
        <div className="header-buttons">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenModal}
            style={{ marginRight: 8 }}
            className="add-button"
          >
            Add New User
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
        title={isUpdate ? "Update User" : "Add New User"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        confirmLoading={loading}
        className="user-modal"
        width={700}
      >
        <Form
          form={form}
          name="userForm"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          className="user-form"
          layout="horizontal"
        >
          <div className="form-columns">
            <div className="form-column">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input the email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input className="input-animation" />
              </Form.Item>

              <Form.Item
                label="Username"
                name="userName"
                rules={[
                  { required: true, message: "Please input the username!" },
                ]}
              >
                <Input className="input-animation" />
              </Form.Item>

              {!isUpdate && (
                <Form.Item
                  label="Password"
                  name="passWord"
                  rules={[
                    { required: true, message: "Please input the password!" },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters!",
                    },
                  ]}
                >
                  <Input.Password
                    className="input-animation"
                    visibilityToggle={{
                      visible: passwordVisible,
                      onVisibleChange: setPasswordVisible,
                    }}
                  />
                </Form.Item>
              )}

              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[
                  { required: true, message: "Please input the full name!" },
                ]}
              >
                <Input className="input-animation" />
              </Form.Item>

              <Form.Item label="Avatar" name="avatar">
                <Upload
                  beforeUpload={() => false}
                  onChange={handleAvatarChange}
                  maxCount={1}
                  listType="picture"
                  className="avatar-uploader"
                >
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
              </Form.Item>
            </div>

            <div className="form-column">
              <Form.Item label="Gender" name="gender" initialValue={0}>
                <Select className="input-animation">
                  <Option value={0}>Male</Option>
                  <Option value={1}>Female</Option>
                  <Option value={2}>Other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Date of Birth"
                name="yob"
                rules={[
                  { required: true, message: "Please select date of birth!" },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  className="input-animation"
                  style={{ width: "100%" }}
                  placeholder="Select date of birth"
                  allowClear={true}
                  disabledDate={(current) => {
                    // Chỉ vô hiệu hóa ngày trong tương lai
                    return current && current > moment().endOf("day");
                  }}
                  popupStyle={{ zIndex: 1050 }}
                  showToday={false}
                  inputReadOnly={true} // Tránh lỗi bàn phím trên mobile
                  getPopupContainer={(trigger) => trigger.parentNode} // Giữ popup trong container
                />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Please input the phone number!" },
                  {
                    pattern: /^[0-9]{10,11}$/,
                    message: "Please enter a valid phone number!",
                  },
                ]}
              >
                <Input className="input-animation" />
              </Form.Item>

              <Form.Item label="Address" name="address">
                <Select
                  className="input-animation"
                  placeholder="Select province"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {provinces.map((province) => (
                    <Option key={province.code} value={province.name}>
                      {province.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Hiển thị dropdown role với Staff và Admin khi thêm mới */}
              {!isUpdate && (
                <Form.Item
                  label="Role"
                  name="role"
                  initialValue={2}
                  rules={[{ required: true, message: "Please select a role!" }]}
                >
                  <Select className="input-animation">
                    <Option value={2}>Staff</Option>
                    <Option value={1}>Admin</Option>
                  </Select>
                </Form.Item>
              )}

              {/* Hiển thị tất cả các role khi cập nhật */}
              {isUpdate && (
                <Form.Item label="Role" name="role">
                  <Select className="input-animation">
                    <Option value={0}>User</Option>
                    <Option value={1}>Admin</Option>
                    <Option value={2}>Staff</Option>
                    <Option value={3}>Customer</Option>
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
                {isUpdate ? "Update" : "Add"}
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Spin spinning={loading} tip="Loading...">
        <Table
          dataSource={users}
          columns={columns}
          rowKey={(record) => record.id || Math.random()}
          pagination={{ pageSize: 10 }}
          className="users-table"
          rowClassName="table-row-animation"
          locale={{ emptyText: "Không có dữ liệu người dùng" }}
          expandable={{
            expandedRowRender: (record) => (
              <div className="expanded-row">
                <p>
                  <strong>Username:</strong> {record.userName || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {record.address || "N/A"}
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {record.createdAt
                    ? new Date(record.createdAt).toLocaleString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Updated:</strong>{" "}
                  {record.updatedAt
                    ? new Date(record.updatedAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            ),
            expandIconColumnIndex: 8, // Đặt nút expand sau cột Action (index 7)
          }}
        />
      </Spin>
    </div>
  );
};

export default UserManagement;
