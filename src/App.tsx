import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "layouts/MainLayout";
import Home from "pages/Home";
import Login from "pages/Login";
import ProductDetail from "pages/ProductDetail";
import { path } from "constants/path";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={`${path.detail}/:id`} element={<ProductDetail />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
