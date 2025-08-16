import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRoutes, privateRoutes } from "./routes";
import { Fragment } from "react";
import HomeLayout from "./layouts/HomeLayout";
import UserProfileLayout from "./layouts/UserProfileLayout";
import Instant from "pages/Instant";
import Admin from "./pages/Admin";
import ConfirmEmail from "./components/AuthForm/ConfirmEmail";
import ScrollToTop from "./utils/scrollToTop";
import RequireAdmin from "./components/RequireAdmin";
import ChatBox from "pages/ChatBox";
import NotFoundPage from "./components/NotFoundPage";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Analytics />

      <Router>
        <div className="App">
          <ToastContainer />
          <ScrollToTop />
          <ChatBox />
          <Routes>
            {/* Public routes with HomeLayout */}
            <Route element={<HomeLayout />}>
              {publicRoutes
                .filter((route) => route.path !== "/admin/*")
                .map((route, index) => {
                  const Page = route.component;
                  return (
                    <Route key={index} path={route.path} element={<Page />} />
                  );
                })}
              <Route path="/instant" element={<Instant />} />
            </Route>
            {/* Private routes with UserProfileLayout (which includes HomeLayout) */}
            <Route element={<UserProfileLayout />}>
              {privateRoutes.map((route, index) => {
                const Page = route.component;
                return (
                  <Route key={index} path={route.path} element={<Page />} />
                );
              })}
            </Route>
            {/* Admin route */}
            <Route
              path="/admin/*"
              element={
                <RequireAdmin>
                  <Admin />
                </RequireAdmin>
              }
            />
            <Route path="/confirm-token/:id" element={<ConfirmEmail />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
