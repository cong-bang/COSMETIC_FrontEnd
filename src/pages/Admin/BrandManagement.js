import React, { useState, useEffect, useMemo } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  Popconfirm,
  Spin,
  Typography,
  Space,
  Upload,
  Select,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  UploadOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import "./CategoryManagement.scss";
import {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../../services/brandService";
import { getCountries } from "../../services/countryService";

const { Title } = Typography;
const { Option } = Select;

// Hình ảnh mặc định dạng base64 để tránh request liên tục
const DEFAULT_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABtklEQVRoge2ZMU7DMBSGvxYYGJAQA0tHGBASQmJiYIWFGYkBiYkTcAiOwAFgY+QAnIGdE7CwMICEEANDQTwGkqZuWjt2nMaO9UlW5Lz4+f3tPD87Bgf9ZgpsgDJnbICpqcADYEtxbIEHE0H7wJri6BvqJzDQDT4CNgYSCGMDjHQSGAJrCwkEWQNDVQJj4NNiAmGWwDhNAjNg5UASY1ZkfJoZcOtQEmNuUyVx70ESQe5TJDHzKIkgM5MEHjxMIshlkiQKNmePxzGJzONYEjlbxJJIksQJjz8XjxMSBbvTRJQkCnZ/kVGSKNj9VQYlUbA7mwySKNidXQaSKNidj3pJFOzOmL0kCnbnZC+Jgt2ZPEiiYHe29ZIo2J3xvSQKdtcTXhIFu2sqL4mC3XVVkETB7trWSaJgd33rJVGwu8YPkijY3aaESRTsblTDJAp2N+thEgW7GwYniYLdLYuTRMHuxsxJomB3c+kkUbC7wXaSKNjdJDxJFOxuVJ4kCnY3a08SBbvb1ieJgt0PA08SBbs/P54kCnY/1DxJFOx+8nqSKNj99PckUbD7DaNgd+tqx+4XoU7d/wDhV5qB0XgFyAAAAABJRU5ErkJggg==";

// Cờ mặc định khi không tải được
const DEFAULT_FLAG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5AYUBwwXIHBN6QAABKhJREFUeNrtmF1oHFUUx//nzuxukt3sbpJNUmtSk7YmJfWDtDVKQayiIohV+qCCpRXywAcFoaCID0UffBF98cEHC1J9qA9+UKiCIKJorS+tWrRprDUmbVKTbHY32exmdmfm+JCdbWaz2WR3J0Xw/+DOuXfOvb97zj33zB1ijOG/LNTuAHK5XC+AJwE8ACADoA9AD4AuABEAJoAigBsAZgFcAvADgG8AXGx3XNQOgLlcbgDAcwCeAXAfgI4mtlEA8DOAT5RSHxPRQrsCbRlgLpd7HMCrAB5t1UcNuQTgDaXUZ60u/ZYA5nK5BwG8DWC01b9oIOcBvKSU+nErk28KMJfLJQC8AeBlAKKVoBqIAvC+EOJlIrq+2aSGAHO5XBrAFwDGthpcE/IrgCeIaKqRc12AuVxuEMAPAHa0I7IG8ieAB4jo93qOdZ+DuVzuLgDfok1wALATwDd2rDWlJqDd7b4GkGxnZA3kBoBRIrrsNjaxW8j+HAAkLRjr5IqgLlc7iCAZ9sdVRPyrB2DQ6oCZm9aWqLDTshOyU7QTtROuKKLnZCdcEWXqoSI6Ao8YiKaIqJrRDRDRNeIaJqIFohoiYiKRGQSkcFEVCIi5fhYliUty5Jaa8u2NWzb1ratDdu2Rtu2Rtu2Ztm2Ztu2Ztm2Vr5iW2nbtgZjTDPGDMZYiTFWZIwVGGPzjLFZxtifAK4CuEJEfxDRLBEtEVGRiEwiYo7vEkIwIYQWQmghhBFCGEIIQwihpJRKSqmklFJKKaWUUlmWpbIsS1mWpSzLUlprpbVWWmtla621UkrZWmtba21prS2ttWlZlmFZlmFZlmFZVskwjJJhGEXDMIqGYRSKxeJyoVBYLhQKy/l8Pj8/P5+fn5+/mc/nF/P5/GI+n18oFAoLxWJxoVgsLhSLxYVisThfLBbnisXiXKlUmi2VSrOlUmmmVCrNlEqlm6VSaapUKk0Vi8XJUqk0WSqVJkul0mShUJgoFAoThUJholAoTOTz+Rv5fP56Pp+/ns/nr+fz+WulUunq8vLy1eXl5StLS0uXl5aWLi8tLV1aXFy8tLi4eHFxcfHi4uLihYWFhfPz8/Pn5+fnz83NnZubmzs7Ozs7MzMzMz09PT09PT09NTU1NTk5OTk5OTl5/fr1yWvXrk1eu3bt6pUrV65euXLl8uXLly9dunTp4sWLFy9cuHDh/Pnz58+dO3fu7NmzZ8+cOXPm9OnTp0+dOnXq5MmTJ0+cOHHi+PHjx48dO3bs6NGjR48cOXLk8OHDhw8dOnTo4MGDB8fHx8fHx8fH9+/fv3/fvn379u7du3fPnj179uzZs3v37t27du3atWvXrl07d+7cuXPnzh07duzYsWPHjvT09I7h4eHh4eHh4aGhoaGhoaGhwcHBwcHBwcH+/v7+/v7+/r6+vr6+vr6+3t7e3t7e3t6enp6enp6ent7e3t7e3t7e7u7u7u7u7u7u7u7u7u7u7q6urq6urq6urq6urq5IJBKJRCKRSCQSCYVC4VAoFAqFQqFQKBQKBoNBJ2AwGAwGg8FgIBAIBAKBQCAQCAQCfr/f7/f7/X6/3+/z+Xw+n8/n8/l8Pp/P5/V6vV6v1+v1er0ej8fj8Xg8Ho/H4/F4PG63233bX7H/AZMpxgc+4K7jAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA2LTIwVDA3OjEyOjIzKzAwOjAwBnDRYgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wNi0yMFQwNzoxMjoyMyswMDowMHctad4AAAAASUVORK5CYII=";

// Danh sách quốc gia mẫu để sử dụng khi API không hoạt động
const SAMPLE_COUNTRIES = [
  { name: "Vietnam", flag: DEFAULT_FLAG },
  { name: "United States", flag: DEFAULT_FLAG },
  { name: "Japan", flag: DEFAULT_FLAG },
  { name: "South Korea", flag: DEFAULT_FLAG },
  { name: "China", flag: DEFAULT_FLAG },
  { name: "Thailand", flag: DEFAULT_FLAG },
  { name: "Singapore", flag: DEFAULT_FLAG },
  { name: "Malaysia", flag: DEFAULT_FLAG },
  { name: "Indonesia", flag: DEFAULT_FLAG },
  { name: "Philippines", flag: DEFAULT_FLAG },
  { name: "Australia", flag: DEFAULT_FLAG },
  { name: "Canada", flag: DEFAULT_FLAG },
  { name: "Brazil", flag: DEFAULT_FLAG },
  { name: "India", flag: DEFAULT_FLAG },
  { name: "Russia", flag: DEFAULT_FLAG },
];

const BrandManagement = () => {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [logoFile, setLogoFile] = useState(null);
  const [countries, setCountries] = useState(SAMPLE_COUNTRIES); // Khởi tạo với dữ liệu mẫu
  const [form] = Form.useForm();
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingCountries, setIsFetchingCountries] = useState(false);

  useEffect(() => {
    fetchBrands();
  }, [refreshKey]);

  // Gọi fetchCountries riêng một lần khi component mount
  useEffect(() => {
    fetchCountries();
  }, []);

  // Gọi API để lấy danh sách nhãn hiệu
  const fetchBrands = async () => {
    if (isFetching) return;

    setIsFetching(true);
    setLoading(true);

    try {
      const response = await getBrands();
      console.log("Brand API Response:", response);

      if (response && response.statusCode === 200) {
        let brandsData = response.data;
        console.log("Brands Data:", brandsData);

        // Đảm bảo brandsData là một mảng
        if (!Array.isArray(brandsData)) {
          if (brandsData && typeof brandsData === "object") {
            // Nếu data là một object, thử lấy data từ các thuộc tính phổ biến
            brandsData =
              brandsData.data || brandsData.items || brandsData.content || [];
            console.log("Extracted brands data:", brandsData);
          } else {
            brandsData = [];
          }
        }

        setTimeout(() => {
          setBrands(brandsData);
          setLoading(false);
          setIsFetching(false);
        }, 300);
      } else {
        console.warn("API response format unexpected:", response);
        setBrands([]);
        setLoading(false);
        setIsFetching(false);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Không thể tải danh sách nhãn hiệu từ server!", {
        position: "top-right",
        autoClose: 5000,
      });
      setBrands([]);
      setLoading(false);
      setIsFetching(false);
    }
  };

  // Lấy danh sách quốc gia
  const fetchCountries = async () => {
    if (isFetchingCountries) return;

    setIsFetchingCountries(true);

    try {
      const countriesData = await getCountries();
      console.log("Fetched countries:", countriesData.length);

      if (Array.isArray(countriesData) && countriesData.length > 0) {
        setCountries(countriesData);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      toast.error("Không thể tải danh sách quốc gia, sử dụng dữ liệu mẫu!", {
        position: "top-right",
        autoClose: 5000,
      });
      // Đã khởi tạo với SAMPLE_COUNTRIES nên không cần set lại
    } finally {
      setIsFetchingCountries(false);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((oldKey) => oldKey + 1);
    toast.info("Đang làm mới dữ liệu...", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleDelete = async (brand) => {
    try {
      setLoading(true);
      const response = await deleteBrand(brand.id);

      if (response && response.statusCode === 200) {
        toast.success(response.message || "Xóa nhãn hiệu thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });

        // Animation khi xóa
        setBrands((prev) =>
          Array.isArray(prev) ? prev.filter((item) => item.id !== brand.id) : []
        );
        setTimeout(() => {
          fetchBrands();
        }, 300);
      } else {
        toast.error(response?.message || "Không thể xóa nhãn hiệu", {
          position: "top-right",
          autoClose: 5000,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
      toast.error("Không thể xóa nhãn hiệu. Vui lòng thử lại.", {
        position: "top-right",
        autoClose: 5000,
      });
      setLoading(false);
    }
  };

  const handleUpdateBrand = async (brand) => {
    try {
      setLoading(true);
      const response = await getBrandById(brand.id);
      console.log("Get brand by ID response:", response);

      if (response && response.statusCode === 200) {
        const brandData = response.data;
        setIsUpdate(true);
        setCurrentBrand(brandData);

        // Đặt giá trị cho form
        form.setFieldsValue({
          name: brandData.name,
          description: brandData.description,
          country: brandData.country,
        });

        setIsModalOpen(true);
      } else {
        toast.error("Không thể lấy thông tin nhãn hiệu", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error fetching brand details:", error);
      toast.error("Không thể lấy thông tin nhãn hiệu. Vui lòng thử lại.", {
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
    setCurrentBrand(null);
    setLogoFile(null);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsUpdate(false);
    setCurrentBrand(null);
    setLogoFile(null);
    form.resetFields();
  };

  const handleLogoChange = (info) => {
    if (info.file) {
      setLogoFile(info.file.originFileObj);
    }
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("country", values.country);

    if (logoFile) {
      formData.append("logoImg", logoFile);
    }

    if (isUpdate && currentBrand) {
      // Update existing brand
      try {
        setLoading(true);
        formData.append("id", currentBrand.id);

        const response = await updateBrand(formData);
        console.log("Update brand response:", response);

        if (response && response.statusCode === 200) {
          toast.success(response.message || "Cập nhật nhãn hiệu thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
          });

          // Animation khi cập nhật
          setBrands((prev) =>
            Array.isArray(prev)
              ? prev.map((item) =>
                  item.id === currentBrand.id ? { ...item, ...values } : item
                )
              : []
          );

          setTimeout(() => {
            fetchBrands();
          }, 300);
        } else {
          toast.error(response?.message || "Không thể cập nhật nhãn hiệu", {
            position: "top-right",
            autoClose: 5000,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error updating brand:", error);
        toast.error("Không thể cập nhật nhãn hiệu. Vui lòng thử lại.", {
          position: "top-right",
          autoClose: 5000,
        });
        setLoading(false);
      } finally {
        handleCancel();
      }
    } else {
      // Add new brand
      try {
        setLoading(true);

        const response = await createBrand(formData);
        console.log("Create brand response:", response);

        if (response && response.statusCode === 200) {
          toast.success(response.message || "Thêm nhãn hiệu thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
          });

          // Animation khi thêm mới
          if (response.data) {
            setBrands((prev) =>
              Array.isArray(prev) ? [...prev, response.data] : [response.data]
            );
          }

          setTimeout(() => {
            fetchBrands();
          }, 300);
        } else {
          toast.error(response?.message || "Không thể thêm nhãn hiệu", {
            position: "top-right",
            autoClose: 5000,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error adding brand:", error);
        toast.error("Không thể thêm nhãn hiệu. Vui lòng thử lại.", {
          position: "top-right",
          autoClose: 5000,
        });
        setLoading(false);
      } finally {
        handleCancel();
      }
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
      title: "Logo",
      dataIndex: "logoImg",
      key: "logoImg",
      render: (logoImg) => {
        // Kiểm tra URL hình ảnh và sử dụng URL thực nếu hợp lệ
        const imgUrl =
          logoImg && typeof logoImg === "string" && logoImg.startsWith("http")
            ? logoImg
            : DEFAULT_IMAGE;

        return (
          <img
            src={imgUrl}
            alt="Logo"
            style={{ width: 50, height: 50, objectFit: "contain" }}
            onError={(e) => {
              e.target.onerror = null; // Ngăn lỗi lặp vô hạn
              e.target.src = DEFAULT_IMAGE; // Sử dụng hình ảnh mặc định khi lỗi
            }}
          />
        );
      },
    },
    {
      title: "Tên nhãn hiệu",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="brand-name">{text}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text) => <span className="brand-description">{text}</span>,
    },
    {
      title: "Quốc gia",
      dataIndex: "country",
      key: "country",
      render: (country) => {
        const foundCountry = countries.find((c) => c.name === country);
        const flagUrl = foundCountry?.flag || DEFAULT_FLAG;

        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={flagUrl}
              alt={country}
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
            {country || "N/A"}
          </div>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <div className="action-buttons">
          <Button
            type="primary"
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
            onClick={() => handleUpdateBrand(record)}
            className="edit-button"
          >
            Cập nhật
          </Button>
          <Popconfirm
            title="Xóa nhãn hiệu"
            description="Bạn có chắc chắn muốn xóa nhãn hiệu này?"
            onConfirm={() => handleDelete(record)}
            okText="Có"
            cancelText="Không"
            placement="topRight"
          >
            <Button danger icon={<DeleteOutlined />} className="delete-button">
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="category-management">
      <div className="category-header">
        <Title level={2}>Quản lý nhãn hiệu</Title>
        <div className="header-buttons">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenModal}
            style={{ marginRight: 8 }}
            className="add-button"
          >
            Thêm nhãn hiệu mới
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
        title={isUpdate ? "Cập nhật nhãn hiệu" : "Thêm nhãn hiệu mới"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        confirmLoading={loading}
        className="category-modal"
      >
        <Form
          form={form}
          name="brandForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          className="category-form"
        >
          <Form.Item
            label="Tên nhãn hiệu"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên nhãn hiệu!" },
            ]}
          >
            <Input className="input-animation" />
          </Form.Item>

          <Form.Item label="Logo" name="logoImg">
            <Upload
              beforeUpload={() => false}
              onChange={handleLogoChange}
              maxCount={1}
              listType="picture"
              className="logo-uploader"
            >
              <Button icon={<UploadOutlined />}>Chọn tệp</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input.TextArea className="input-animation" />
          </Form.Item>

          <Form.Item
            label="Quốc gia"
            name="country"
            rules={[{ required: true, message: "Vui lòng chọn quốc gia!" }]}
          >
            <Select
              className="input-animation"
              placeholder="Chọn quốc gia"
              showSearch
              filterOption={(input, option) => {
                // Lấy giá trị từ option.value thay vì option.children
                return (
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
              loading={!countries.length}
            >
              {countries.map((country) => {
                return (
                  <Option key={country.name} value={country.name}>
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
                  </Option>
                );
              })}
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
                {isUpdate ? "Cập nhật" : "Thêm"}
              </Button>
              <Button onClick={handleCancel}>Hủy</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Spin spinning={loading} tip="Loading...">
        <Table
          dataSource={brands || []}
          columns={columns}
          rowKey={(record) => record.id || Math.random()}
          pagination={{ pageSize: 10 }}
          className="categories-table"
          rowClassName="table-row-animation"
          locale={{ emptyText: "Không có dữ liệu nhãn hiệu" }}
          expandable={{
            expandedRowRender: (record) => (
              <div className="expanded-row">
                <p>
                  <strong>ID:</strong> {record.id || "N/A"} |
                  <strong> Created:</strong>{" "}
                  {record.createdAt
                    ? new Date(record.createdAt).toLocaleString()
                    : "N/A"}{" "}
                  |<strong> Updated:</strong>{" "}
                  {record.updatedAt
                    ? new Date(record.updatedAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            ),
            expandIconColumnIndex: 6,
          }}
        />
      </Spin>
    </div>
  );
};

export default BrandManagement;
