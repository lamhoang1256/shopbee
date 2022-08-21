import { path } from "constants/path";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AuthLayout = lazy(() => import("layouts/AuthLayout"));
const MainLayout = lazy(() => import("layouts/MainLayout"));
const UserLayout = lazy(() => import("layouts/UserLayout"));
const DashboardLayout = lazy(() => import("layouts/DashboardLayout"));
const CheckLoggedIn = lazy(() => import("routes/CheckLoggedIn"));
const ProtectedRoute = lazy(() => import("routes/ProtectedRoute"));
const CheckAdmin = lazy(() => import("routes/CheckAdmin"));
const BannerManage = lazy(() => import("modules/banner/BannerManage"));
const ShopUpdate = lazy(() => import("modules/shop/ShopUpdate"));
const VoucherAddNew = lazy(() => import("modules/voucher/VoucherAddNew"));
const VoucherManage = lazy(() => import("modules/voucher/VoucherManage"));
const VoucherMe = lazy(() => import("modules/voucher/VoucherMe"));
const VoucherUpdate = lazy(() => import("modules/voucher/VoucherUpdate"));
const OrderManage = lazy(() => import("modules/order/OrderManage"));
const OrderUpdate = lazy(() => import("modules/order/OrderUpdate"));
const OrderDetailsPage = lazy(() => import("pages/OrderDetailsPage"));
const OrderPage = lazy(() => import("pages/OrderPage"));
const ProductAddNew = lazy(() => import("modules/product/ProductAddNew"));
const ProductManage = lazy(() => import("modules/product/ProductManage"));
const ProductUpdate = lazy(() => import("modules/product/ProductUpdate"));
const ProductDetailsPage = lazy(() => import("pages/ProductDetailsPage"));
const UserAddNew = lazy(() => import("modules/user/UserAddNew"));
const UserChangePassword = lazy(() => import("modules/user/UserChangePassword"));
const UserManage = lazy(() => import("modules/user/UserManage"));
const UserUpdate = lazy(() => import("modules/user/UserUpdate"));
const ProfilePage = lazy(() => import("pages/ProfilePage"));
const CartPage = lazy(() => import("pages/CartPage"));
const CheckoutPage = lazy(() => import("pages/CheckoutPage"));
const DashboardPage = lazy(() => import("pages/DashboardPage"));
const HistoryPage = lazy(() => import("pages/HistoryPage"));
const HomePage = lazy(() => import("pages/HomePage"));
const PageNotFound = lazy(() => import("pages/PageNotFound"));
const SearchPage = lazy(() => import("pages/SearchPage"));
const SignInPage = lazy(() => import("pages/SignInPage"));
const SignUpPage = lazy(() => import("pages/SignUpPage"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<>Error</>}>
      <Router>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={path.cart} element={<CartPage />} />
            <Route path={`${path.product}/:id`} element={<ProductDetailsPage />} />
            <Route path={path.search} element={<SearchPage />} />
          </Route>

          <Route element={<CheckLoggedIn />}>
            <Route path='/' element={<AuthLayout title='Đăng ký' />}>
              <Route path={path.signUp} element={<SignUpPage />} />
            </Route>
            <Route path='/' element={<AuthLayout title='Đăng nhập' />}>
              <Route path={path.signIn} element={<SignInPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            {/* User Routes */}
            <Route element={<UserLayout />}>
              <Route path={path.order} element={<OrderPage />} />
              <Route path={`${path.order}/:id`} element={<OrderDetailsPage />} />
              <Route path={path.profile} element={<ProfilePage />} />
              <Route path={path.password} element={<UserChangePassword />} />
              <Route path={path.voucher} element={<VoucherMe />} />
              <Route path={path.history} element={<HistoryPage />} />
            </Route>
            <Route path={path.payment} element={<CheckoutPage />} />
            {/* Admin Routes */}
            <Route element={<CheckAdmin />}>
              <Route path='/dashboard' element={<DashboardLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path={path.orderManage} element={<OrderManage />} />
                <Route path={`${path.orderManage}/:id`} element={<OrderUpdate />} />
                <Route path={path.productManage} element={<ProductManage />} />
                <Route path={path.productAddNew} element={<ProductAddNew />} />
                <Route path={`${path.productUpdate}/:id`} element={<ProductUpdate />} />
                <Route path={path.banner} element={<BannerManage />} />
                <Route path={path.shop} element={<ShopUpdate />} />
                <Route path={path.userManage} element={<UserManage />} />
                <Route path={`${path.userUpdate}/:id`} element={<UserUpdate />} />
                <Route path={path.userAddNew} element={<UserAddNew />} />
                <Route path={path.voucherManage} element={<VoucherManage />} />
                <Route path={path.voucherAddNew} element={<VoucherAddNew />} />
                <Route path={`${path.voucherUpdate}/:id`} element={<VoucherUpdate />} />
              </Route>
            </Route>
          </Route>

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
