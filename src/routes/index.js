import Home from "pages/Home";
import Login from "pages/Login";

const publicRoutes = [
  { path: "/", component: Home, layout: Home },
  { path: "/login", component: Login, layout: Login },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
