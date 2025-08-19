import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import Blog from "pages/Blog";
import BlogCategory from "pages/BlogCategory";
import BlogDetail from "pages/BlogDetail";
import ForgotPassword from "pages/ForgotPassword";
import ConfirmPassword from "pages/ConfirmPassword";
import AboutUs from "pages/AboutUs";
import SuccessPayment from "pages/SuccessPayment";
import FailurePayment from "pages/FailurePayment";
import Cart from "pages/Cart";
import Order from "pages/Order";
import DetailProduct from "pages/DetailProduct";
import HomeLayout from "../layouts/HomeLayout";
import UserProfileLayout from "../layouts/UserProfileLayout";
import MyProfile from "../components/MyProfile";
import PaymentCard from "../components/PaymentCard";
import Address from "../components/Address";
import ChangePassword from "../components/ChangePassword";
import Wishlist from "../components/Wishlist";
import Notification from "../components/Notification";
import MyVoucher from "../components/MyVoucher";
import MyOrder from "../components/MyOrder";
import ChatBox from "pages/ChatBox";

import Lookup from "pages/Lookup";
import OrderTracking from "pages/Ordertracking";
import BeautyTools from "../pages/BeautyTools";
import Virtual from "../pages/Virtual";
import Products from "../pages/Products";
import Voucher from "../pages/Voucher";
import Admin from "../pages/Admin";
import { Fragment } from "react";

const publicRoutes = [
  { path: "/", component: Home, layout: HomeLayout },
  { path: "/login", component: Login, layout: Fragment },
  { path: "/register", component: Register, layout: Fragment },
  { path: "/blog", component: Blog, layout: HomeLayout },
  { path: "/chat-box", component: ChatBox, layout: HomeLayout },
  { path: "/blog-category", component: BlogCategory, layout: HomeLayout },
  { path: "/blog-detail", component: BlogDetail, layout: HomeLayout },
  { path: "/reset-password", component: ForgotPassword, layout: HomeLayout },
  { path: "/forgot-password", component: ConfirmPassword, layout: HomeLayout },
  { path: "/aboutus", component: AboutUs, layout: HomeLayout },
  {
    path: "/payment-success",
    component: SuccessPayment,
    layout: SuccessPayment,
  },
  {
    path: "/payment-cancel",
    component: FailurePayment,
    layout: FailurePayment,
  },
  { path: "/cart", component: Cart, layout: HomeLayout },
  { path: "/order", component: Order, layout: HomeLayout },
  { path: "/lookup", component: Lookup, layout: HomeLayout },
  { path: "/order-tracking", component: OrderTracking, layout: HomeLayout },
  { path: "/beauty-tools", component: BeautyTools, layout: HomeLayout },
  { path: "/virtual", component: Virtual, layout: HomeLayout },
  { path: "/products", component: Products, layout: HomeLayout },
  { path: "/detail-product/:id", component: DetailProduct, layout: HomeLayout },
  { path: "/voucher", component: Voucher, layout: HomeLayout },
  { path: "/admin/*", component: Admin, layout: Fragment },
];

const privateRoutes = [
  // User profile routes
  { path: "/my-profile", component: MyProfile, layout: UserProfileLayout },
  { path: "/paymentcard", component: PaymentCard, layout: UserProfileLayout },
  { path: "/address", component: Address, layout: UserProfileLayout },
  {
    path: "/change-password",
    component: ChangePassword,
    layout: UserProfileLayout,
  },
  { path: "/wishlist", component: Wishlist, layout: UserProfileLayout },
  { path: "/my-order", component: MyOrder, layout: UserProfileLayout },
  {
    path: "/notifications",
    component: Notification,
    layout: UserProfileLayout,
  },
  { path: "/my-voucher", component: MyVoucher, layout: UserProfileLayout },
];

export { publicRoutes, privateRoutes };
