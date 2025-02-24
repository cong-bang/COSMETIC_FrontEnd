import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";

const publicRoutes = [
  { path: "/", component: Home, layout: Home },
  { path: "/login", component: Login, layout: Login },
  { path: "/register", component: Register, layout: Register },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
