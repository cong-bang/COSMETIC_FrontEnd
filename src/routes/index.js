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
import HomeLayout from '../layouts/HomeLayout';
import UserProfileLayout from '../layouts/UserProfileLayout';
import MyProfile from "../components/MyProfile";
import PaymentCard from "../components/PaymentCard";
import Address from "../components/Address";
import ChangePassword from "../components/ChangePassword";
import Wishlist from "../components/Wishlist";
import Notification from "../components/Notification";
import MyVoucher from "../components/MyVoucher";
import MyOrder from "../components/MyOrder";

const publicRoutes = [
  { path: "/", component: Home, layout: HomeLayout },
  { path: "/login", component: Login, layout: HomeLayout },
  { path: "/register", component: Register, layout: HomeLayout },
  { path: "/blog", component: Blog, layout: HomeLayout},
  { path: "/blog-category", component: BlogCategory, layout: HomeLayout},
  { path: "/blog-detail", component: BlogDetail, layout: HomeLayout},
  { path: "/forgot-password", component: ForgotPassword, layout: HomeLayout},
  { path: "/confirm-password", component: ConfirmPassword, layout: HomeLayout},
  { path: "/aboutus", component: AboutUs, layout: HomeLayout},
  { path: "/success-payment", component: SuccessPayment, layout: SuccessPayment},
  { path: "/failure-payment", component: FailurePayment, layout: FailurePayment},
  { path: "/cart", component: Cart, layout: HomeLayout},
  { path: "/order", component: Order, layout: HomeLayout},

  
];

const privateRoutes = [
  // User profile routes
  { path: "/my-profile", component: MyProfile, layout: UserProfileLayout },
  { path: "/paymentcard", component: PaymentCard, layout: UserProfileLayout },
  { path: "/address", component: Address, layout: UserProfileLayout },
  { path: "/change-password", component: ChangePassword, layout: UserProfileLayout },
  { path: "/wishlist", component: Wishlist, layout: UserProfileLayout },
  { path: "/my-order", component: MyOrder, layout: UserProfileLayout },
  { path: "/notifications", component: Notification, layout: UserProfileLayout },
  { path: "/my-voucher", component: MyVoucher, layout: UserProfileLayout },

];

export { publicRoutes, privateRoutes };
