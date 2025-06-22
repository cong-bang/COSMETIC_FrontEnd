import React, { useState } from "react";
import { Layout, Menu, Image } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  TagOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  TrademarkOutlined,
} from "@ant-design/icons";
import { Link, Routes, Route } from "react-router-dom";
import "./Admin.scss";
import Dashboard from "./Dashboard";
import ProductManagement from "./ProductManagement";
import CategoryManagement from "./CategoryManagement";
import UserManagement from "./UserManagement";
import BrandManagement from "./BrandManagement";
import pureLogo from "../../assets/images/PURE_logo.png";
import pureLogo2 from "../../assets/images/pure_logo_2.png";
import BlogManagement from "./BlogManagement";

const { Header, Content, Footer, Sider } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: "2",
      icon: <ShoppingOutlined />,
      label: <Link to="/admin/products">Sản phẩm</Link>,
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: <Link to="/admin/users">Người dùng</Link>,
    },
    {
      key: "4",
      icon: <ShoppingCartOutlined />,
      label: <Link to="/admin/orders">Đơn hàng</Link>,
    },
    {
      key: "5",
      icon: <TagOutlined />,
      label: <Link to="/admin/categories">Danh mục</Link>,
    },
    {
      key: "6",
      icon: <TrademarkOutlined />,
      label: <Link to="/admin/brands">Nhãn hiệu</Link>,
    },
    {
      key: "7",
      icon: <FileTextOutlined />,
      label: <Link to="/admin/blog">Blog</Link>,
    },
    {
      key: "8",
      icon: <SettingOutlined />,
      label: <Link to="/admin/settings">Cài đặt</Link>,
    },
    {
      key: "9",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="admin-sider"
      >
        <div className="admin-logo">
          {!collapsed ? (
            <div
              style={{
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "24px",
                background: "linear-gradient(90deg, #7B42F6 0%, #B01EFF 100%)",
                borderRadius: "4px",
                padding: "0 12px",
                width: "100%",
              }}
            >
              <Image src={pureLogo} preview={false} height={30} />
            </div>
          ) : (
            <div className="logo-small">P</div>
          )}
        </div>
        <Menu
          theme="dark"
          selectedKeys={[selectedKey]}
          mode="inline"
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key)}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="admin-header">
          <div className="admin-header-title">Admin Dashboard</div>
          <div className="admin-header-user">
            <span className="admin-username">Admin</span>
            <div className="admin-avatar">A</div>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div className="admin-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="orders" element={<div>Quản lý đơn hàng</div>} />
              <Route path="categories" element={<CategoryManagement />} />
              <Route path="blog" element={<BlogManagement />} />
              <Route path="settings" element={<div>Cài đặt hệ thống</div>} />
              <Route path="brands" element={<BrandManagement />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Pure Cosmetics ©{new Date().getFullYear()} - Admin Panel
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
