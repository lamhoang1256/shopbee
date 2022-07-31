import { configAPI } from "apis/configAPI";
import { path } from "constants/path";
import { UserLayout } from "layouts";
import MainLayout from "layouts/MainLayout";
import Cart from "pages/Cart";
import Home from "pages/Home";
import Login from "pages/Login";
import OrderDetailsPage from "pages/OrderDetailsPage";
import OrderPage from "pages/OrderPage";
import { PageNotFound } from "pages/PageNotFound";
import ProductDetail from "pages/ProductDetail";
import ProfilePage from "pages/ProfilePage";
import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useStore } from "store/configStore";

const App = () => {
  const currentUser = useStore((state: any) => state.currentUser);
  const updateCart = useStore((state: any) => state.updateCart);
  const fetchCart = async (userId: string) => {
    try {
      const response: any = await configAPI.getPurchase(userId);
      if (response?.success) updateCart(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser?.email) {
      fetchCart(currentUser?._id);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={path.cart} element={<Cart />} />
          <Route path={`${path.product}/:id`} element={<ProductDetail />} />
          <Route path={path.signUp} element={<SignUpPage />} />
          <Route path={path.signIn} element={<SignInPage />} />
        </Route>
        <Route path='/' element={<UserLayout />}>
          <Route path={path.order} element={<OrderPage />} />
          <Route path={`${path.order}/:id`} element={<OrderDetailsPage />} />
          <Route path={path.profile} element={<ProfilePage />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
