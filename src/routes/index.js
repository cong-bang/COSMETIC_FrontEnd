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

const publicRoutes = [
  { path: "/", component: Home, layout: Home },
  { path: "/login", component: Login, layout: Login },
  { path: "/register", component: Register, layout: Register },
  { path: "/blog", component: Blog, layout: Blog},
  { path: "/blog-category", component: BlogCategory, layout: BlogCategory},
  { path: "/blog-detail", component: BlogDetail, layout: BlogDetail},
  { path: "/forgot-password", component: ForgotPassword, layout: ForgotPassword},
  { path: "/confirm-password", component: ConfirmPassword, layout: ConfirmPassword},
  { path: "/aboutus", component: AboutUs, layout: AboutUs},
  { path: "/success-payment", component: SuccessPayment, layout: SuccessPayment},
  { path: "/failure-payment", component: FailurePayment, layout: FailurePayment},
  { path: "/cart", component: Cart, layout: Cart},
  { path: "/order", component: Order, layout: Order},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
