import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "layouts/MainLayout";
import Home from "pages/Home";
import Login from "pages/Login";
import ProductDetail from "pages/ProductDetail";
import { path } from "constants/path";
import { PageNotFound } from "pages/PageNotFound";
import Cart from "pages/Cart";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={path.cart} element={<Cart />} />
          <Route path={`${path.detail}/:id`} element={<ProductDetail />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
