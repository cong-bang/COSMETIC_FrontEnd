import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import Blog from "pages/Blog";
import BlogCategory from "pages/BlogCategory";
import BlogDetail from "pages/BlogDetail";

const publicRoutes = [
  { path: "/", component: Home, layout: Home },
  { path: "/login", component: Login, layout: Login },
  { path: "/register", component: Register, layout: Register },
  { path: "/blog", component: Blog, layout: Blog},
  { path: "/blog-category", component: BlogCategory, layout: BlogCategory},
  { path: "/blog-detail", component: BlogDetail, layout: BlogDetail},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
