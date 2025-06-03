import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Progress,
  Space,
  Select,
} from "antd";
import {
  ShoppingOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { Area, Column, Pie } from "@ant-design/plots";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("month");

  // Mock data
  const stats = {
    totalProducts: 394,
    totalCustomers: 3256,
    totalRevenue: 52536000,
    totalOrders: 38,
  };

  // Mock chart data
  const monthlyRevenueData = [
    { month: "T1", value: 1800000 },
    { month: "T2", value: 1950000 },
    { month: "T3", value: 2100000 },
    { month: "T4", value: 1750000 },
    { month: "T5", value: 2300000 },
    { month: "T6", value: 2450000 },
  ];

  // Mock data for bar chart
  const categoryData = [
    { month: "T1", category: "Skincare", value: 1500000 },
    { month: "T1", category: "Makeup", value: 900000 },
    { month: "T2", category: "Skincare", value: 1700000 },
    { month: "T2", category: "Makeup", value: 1200000 },
    { month: "T3", category: "Skincare", value: 1900000 },
    { month: "T3", category: "Makeup", value: 1400000 },
    { month: "T4", category: "Skincare", value: 1600000 },
    { month: "T4", category: "Makeup", value: 1100000 },
    { month: "T5", category: "Skincare", value: 2000000 },
    { month: "T5", category: "Makeup", value: 1500000 },
    { month: "T6", category: "Skincare", value: 2200000 },
    { month: "T6", category: "Makeup", value: 1700000 },
  ];

  // Mock data for top products
  const topProducts = [
    {
      id: 1,
      name: "Kem Dưỡng Ẩm PURE Hydration",
      sales: 247,
      category: "Skincare",
    },
    { id: 2, name: "Sữa Rửa Mặt PURE Clean", sales: 164, category: "Skincare" },
    { id: 3, name: "Son Môi PURE Lips", sales: 136, category: "Makeup" },
    { id: 4, name: "Phấn Mắt PURE Colors", sales: 98, category: "Makeup" },
    { id: 5, name: "Serum Vitamin C PURE", sales: 86, category: "Skincare" },
  ];

  // Mock data for pie chart
  const customerData = [
    { type: "Nữ", value: 72 },
    { type: "Nam", value: 28 },
  ];

  // Configuration for area chart
  const areaConfig = {
    data: monthlyRevenueData,
    xField: "month",
    yField: "value",
    smooth: true,
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#7B42F6 1:#7B42F6",
      };
    },
    line: {
      color: "#7B42F6",
    },
  };

  // Configuration for bar chart
  const barConfig = {
    data: categoryData,
    isGroup: true,
    xField: "month",
    yField: "value",
    seriesField: "category",
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    color: ["#7B42F6", "#00D8B6"],
    label: {
      position: "top",
      style: {
        opacity: 0.8,
      },
      formatter: (datum) => `${(datum.value / 1000000).toFixed(1)}M`,
    },
  };

  // Configuration for pie chart
  const pieConfig = {
    data: customerData,
    angleField: "value",
    colorField: "type",
    radius: 0.7,
    innerRadius: 0.6,
    color: ["#7B42F6", "#FF7D51"],
    label: false,
    legend: {
      position: "bottom",
    },
    interactions: [{ type: "element-active" }],
    statistic: {
      title: {
        style: {
          fontWeight: "bold",
          fontSize: "16px",
        },
        formatter: () => "Khách hàng",
      },
      content: {
        style: {
          fontSize: "24px",
        },
        formatter: () => `${customerData.reduce((a, b) => a + b.value, 0)}`,
      },
    },
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Số lượng bán",
      dataIndex: "sales",
      key: "sales",
      sorter: (a, b) => a.sales - b.sales,
    },
  ];

  return (
    <div className="dashboard">
      <div
        className="dashboard-header"
        style={{
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        <Space>
          <span>Hiển thị theo: </span>
          <Select
            value={timeRange}
            onChange={setTimeRange}
            options={[
              { value: "week", label: "Tuần này" },
              { value: "month", label: "Tháng này" },
              { value: "quarter", label: "Quý này" },
              { value: "year", label: "Năm nay" },
            ]}
            style={{ width: 120 }}
          />
        </Space>
      </div>

      {/* Stats cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="bordered" style={{ borderRadius: 8 }}>
            <Statistic
              title="Tổng khách hàng"
              value={stats.totalCustomers}
              prefix={<UserOutlined style={{ color: "#7B42F6" }} />}
              valueStyle={{ color: "#333" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="bordered" style={{ borderRadius: 8 }}>
            <Statistic
              title="Tổng sản phẩm"
              value={stats.totalProducts}
              prefix={<ShoppingOutlined style={{ color: "#00D8B6" }} />}
              valueStyle={{ color: "#333" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="bordered" style={{ borderRadius: 8 }}>
            <Statistic
              title="Doanh thu"
              value={(stats.totalRevenue / 1000000).toFixed(1)}
              prefix={<DollarOutlined style={{ color: "#FF7D51" }} />}
              suffix="triệu ₫"
              valueStyle={{ color: "#333" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="bordered" style={{ borderRadius: 8 }}>
            <Statistic
              title="Đơn hàng mới"
              value={stats.totalOrders}
              prefix={<ShoppingCartOutlined style={{ color: "#FF4D94" }} />}
              valueStyle={{ color: "#333" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts section */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card
            title="Danh mục vs Doanh thu"
            variant="bordered"
            style={{ borderRadius: 8 }}
            extra={
              <Select
                defaultValue="6month"
                style={{ width: 120 }}
                options={[
                  { value: "6month", label: "Hiển thị 6 tháng" },
                  { value: "12month", label: "Hiển thị 12 tháng" },
                ]}
              />
            }
          >
            <Column {...barConfig} height={300} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title="Phân loại khách hàng"
            variant="bordered"
            style={{ borderRadius: 8 }}
          >
            <Pie {...pieConfig} height={240} />
            <div
              style={{
                marginTop: 16,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 24,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "#7B42F6",
                    marginRight: 8,
                  }}
                ></span>
                <span>Nữ: {customerData[0].value}%</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "#FF7D51",
                    marginRight: 8,
                  }}
                ></span>
                <span>Nam: {customerData[1].value}%</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card
            title="Doanh thu theo thời gian"
            variant="bordered"
            style={{ borderRadius: 8 }}
            extra={
              <span style={{ color: "#7B42F6", fontWeight: "bold" }}>
                <RiseOutlined /> +28%
              </span>
            }
          >
            <Area {...areaConfig} height={220} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title="Sản phẩm bán chạy"
            variant="bordered"
            style={{ borderRadius: 8 }}
          >
            <Table
              dataSource={topProducts}
              columns={columns}
              pagination={false}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card
            title="Hiệu suất doanh thu theo mục tiêu"
            variant="bordered"
            style={{ borderRadius: 8 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Statistic title="Skincare" value="78%" />
                <Progress percent={78} strokeColor="#7B42F6" />
              </Col>
              <Col span={8}>
                <Statistic title="Makeup" value="62%" />
                <Progress percent={62} strokeColor="#00D8B6" />
              </Col>
              <Col span={8}>
                <Statistic title="Fragrance" value="45%" />
                <Progress percent={45} strokeColor="#FF7D51" />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
