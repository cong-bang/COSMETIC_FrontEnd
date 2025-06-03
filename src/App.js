import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { publicRoutes, privateRoutes } from './routes';
import HomeLayout from './layouts/HomeLayout';
import UserProfileLayout from './layouts/UserProfileLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          {/* Public routes with HomeLayout */}
          <Route element={<HomeLayout />}>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Route>
          {/* Private routes with UserProfileLayout */}
          <Route element={<UserProfileLayout />}>
            {privateRoutes.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;