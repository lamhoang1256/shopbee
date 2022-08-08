import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useStore } from "store/configStore";
import { configAPI } from "apis/configAPI";
import { path } from "constants/path";
import { DashboardLayout, MainLayout, UserLayout } from "layouts";
import { UserChangePassword, UserManage, UserUpdateByAdmin } from "modules/user";
import CartPage from "pages/CartPage";
import HomePage from "pages/HomePage";
import OrderDetailsPage from "pages/OrderDetailsPage";
import OrderPage from "pages/OrderPage";
import ProductDetailsPage from "pages/ProductDetailsPage";
import ProfilePage from "pages/ProfilePage";
import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";
import PageNotFound from "pages/PageNotFound";
import SearchPage from "pages/SearchPage";
import DashboardPage from "pages/DashboardPage";
import { OrderManage, OrderUpdate } from "modules/order";
import { ProductAddNew, ProductManage, ProductUpdate } from "modules/product";
import { BannerManage } from "modules/banner";

const App = () => {
  const currentUser = useStore((state: any) => state.currentUser);
  const setCart = useStore((state: any) => state.setCart);
  const fetchCart = async (userId: string) => {
    try {
      const { data, success } = await configAPI.getAllCart(userId);
      if (success) setCart(data);
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
          <Route index element={<HomePage />} />
          <Route path={path.cart} element={<CartPage />} />
          <Route path={`${path.product}/:id`} element={<ProductDetailsPage />} />
          <Route path={path.signUp} element={<SignUpPage />} />
          <Route path={path.signIn} element={<SignInPage />} />
          <Route path={path.search} element={<SearchPage />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path={path.order} element={<OrderPage />} />
          <Route path={`${path.order}/:id`} element={<OrderDetailsPage />} />
          <Route path={path.profile} element={<ProfilePage />} />
          <Route path={path.password} element={<UserChangePassword />} />
        </Route>
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path={path.orderManage} element={<OrderManage />} />
          <Route path={`${path.orderManage}/:id`} element={<OrderUpdate />} />
          <Route path={path.productManage} element={<ProductManage />} />
          <Route path={path.productAddNew} element={<ProductAddNew />} />
          <Route path={`${path.productUpdate}/:id`} element={<ProductUpdate />} />
          <Route path={path.banner} element={<BannerManage />} />
          <Route path={path.userManage} element={<UserManage />} />
          <Route path={`${path.userUpdate}/:id`} element={<UserUpdateByAdmin />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
