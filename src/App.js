import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho react-toastify
import { publicRoutes } from "routes";
import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Instant from "pages/Instant";
import Admin from "./pages/Admin"; // Import Admin component

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout || Fragment;
            const Page = route.component;

            // Xử lý riêng cho trang admin
            if (route.path === "/admin/*") {
              return <Route key={index} path="/admin/*" element={<Admin />} />;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          <Route path="/instant" element={<Instant />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
