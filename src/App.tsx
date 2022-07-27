import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "layouts/MainLayout";
import Home from "pages/Home";
import Login from "pages/Login";
import ProductDetail from "pages/ProductDetail";
import { path } from "constants/path";
import { PageNotFound } from "pages/PageNotFound";
import Cart from "pages/Cart";
import SignUpPage from "pages/SignUpPage";
import SignInPage from "pages/SignInPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={path.cart} element={<Cart />} />
          <Route path={`${path.detail}/:id`} element={<ProductDetail />} />
          <Route path={path.signUp} element={<SignUpPage />} />
          <Route path={path.signIn} element={<SignInPage />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
