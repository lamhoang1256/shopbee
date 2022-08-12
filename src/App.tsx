import { cartAPI } from "apis";
import { path } from "constants/path";
import { AuthLayout, DashboardLayout, MainLayout, UserLayout } from "layouts";
import { BannerManage } from "modules/banner";
import { OrderManage, OrderUpdate } from "modules/order";
import { ProductAddNew, ProductManage, ProductUpdate } from "modules/product";
import { ShopAddressManage, ShopAddressUpdate } from "modules/shop";
import { UserAddNew, UserChangePassword, UserManage, UserUpdate } from "modules/user";
import CartPage from "pages/CartPage";
import DashboardPage from "pages/DashboardPage";
import HomePage from "pages/HomePage";
import OrderDetailsPage from "pages/OrderDetailsPage";
import OrderPage from "pages/OrderPage";
import PageNotFound from "pages/PageNotFound";
import PaymentPage from "pages/PaymentPage";
import ProductDetailsPage from "pages/ProductDetailsPage";
import ProfilePage from "pages/ProfilePage";
import SearchPage from "pages/SearchPage";
import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useStore } from "store/configStore";

const App = () => {
  const { currentUser, setCart } = useStore((state) => state);
  const fetchCart = async () => {
    try {
      const { data, success } = await cartAPI.getAllCart();
      if (success) setCart(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (currentUser?.email) {
      fetchCart();
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={path.cart} element={<CartPage />} />
          <Route path={`${path.product}/:id`} element={<ProductDetailsPage />} />
          <Route path={path.search} element={<SearchPage />} />
        </Route>
        <Route path={path.payment} element={<PaymentPage />} />
        <Route path='/' element={<AuthLayout title='Đăng ký' />}>
          <Route path={path.signUp} element={<SignUpPage />} />
        </Route>
        <Route path='/' element={<AuthLayout title='Đăng nhập' />}>
          <Route path={path.signIn} element={<SignInPage />} />
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
          <Route path={path.address} element={<ShopAddressManage />} />
          <Route path={`${path.address}/:id`} element={<ShopAddressUpdate />} />
          <Route path={path.userManage} element={<UserManage />} />
          <Route path={`${path.userUpdate}/:id`} element={<UserUpdate />} />
          <Route path={path.userAddNew} element={<UserAddNew />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
