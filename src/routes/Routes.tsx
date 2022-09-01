import { PATH } from "constants/path";
import { UserCreditCard } from "modules/user";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const LayoutAuth = lazy(() => import("layouts/LayoutAuth"));
const LayoutHome = lazy(() => import("layouts/LayoutHome"));
const LayoutUser = lazy(() => import("layouts/LayoutUser"));
const LayoutDashboard = lazy(() => import("layouts/LayoutDashboard"));
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
const OrderMe = lazy(() => import("modules/order/OrderMe"));
const ProductAddNew = lazy(() => import("modules/product/ProductAddNew"));
const ProductManage = lazy(() => import("modules/product/ProductManage"));
const ProductUpdate = lazy(() => import("modules/product/ProductUpdate"));
const ProductDetailsPage = lazy(() => import("pages/ProductDetailsPage"));
const UserAddNew = lazy(() => import("modules/user/UserAddNew"));
const UserChangePassword = lazy(() => import("modules/user/UserChangePassword"));
const UserManage = lazy(() => import("modules/user/UserManage"));
const UserUpdate = lazy(() => import("modules/user/UserUpdate"));
const UserWishList = lazy(() => import("modules/user/UserWishList"));
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
const CategoryAddNew = lazy(() => import("modules/category/CategoryAddNew"));
const CategoryManage = lazy(() => import("modules/category/CategoryManage"));
const CategoryUpdate = lazy(() => import("modules/category/CategoryUpdate"));

const AppRoutes = () => {
  return (
    <Suspense fallback={null}>
      <Router>
        <Routes>
          <Route path='/' element={<LayoutHome />}>
            <Route index element={<HomePage />} />
            <Route path={PATH.cart} element={<CartPage />} />
            <Route path={`${PATH.product}/:id`} element={<ProductDetailsPage />} />
            <Route path={PATH.search} element={<SearchPage />} />
          </Route>

          <Route element={<CheckLoggedIn />}>
            <Route path='/' element={<LayoutAuth title='Đăng ký' />}>
              <Route path={PATH.signUp} element={<SignUpPage />} />
            </Route>
            <Route path='/' element={<LayoutAuth title='Đăng nhập' />}>
              <Route path={PATH.signIn} element={<SignInPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            {/* User Routes */}
            <Route element={<LayoutUser />}>
              <Route path={PATH.order} element={<OrderMe />} />
              <Route path={`${PATH.order}/:id`} element={<OrderDetailsPage />} />
              <Route path={PATH.profile} element={<ProfilePage />} />
              <Route path={PATH.password} element={<UserChangePassword />} />
              <Route path={PATH.voucher} element={<VoucherMe />} />
              <Route path={PATH.wishlist} element={<UserWishList />} />
              <Route path={PATH.history} element={<HistoryPage />} />
              <Route path={PATH.creditCard} element={<UserCreditCard />} />
            </Route>
            <Route path={PATH.checkout} element={<CheckoutPage />} />
            {/* Admin Routes */}
            <Route element={<CheckAdmin />}>
              <Route path='/dashboard' element={<LayoutDashboard />}>
                <Route index element={<DashboardPage />} />
                <Route path={PATH.orderManage} element={<OrderManage />} />
                <Route path={`${PATH.orderManage}/:id`} element={<OrderUpdate />} />
                <Route path={PATH.categoryManage} element={<CategoryManage />} />
                <Route path={PATH.categoryAddNew} element={<CategoryAddNew />} />
                <Route path={`${PATH.categoryUpdate}/:id`} element={<CategoryUpdate />} />
                <Route path={PATH.productManage} element={<ProductManage />} />
                <Route path={PATH.productAddNew} element={<ProductAddNew />} />
                <Route path={`${PATH.productUpdate}/:id`} element={<ProductUpdate />} />
                <Route path={PATH.banner} element={<BannerManage />} />
                <Route path={PATH.shop} element={<ShopUpdate />} />
                <Route path={PATH.userManage} element={<UserManage />} />
                <Route path={`${PATH.userUpdate}/:id`} element={<UserUpdate />} />
                <Route path={PATH.userAddNew} element={<UserAddNew />} />
                <Route path={PATH.voucherManage} element={<VoucherManage />} />
                <Route path={PATH.voucherAddNew} element={<VoucherAddNew />} />
                <Route path={`${PATH.voucherUpdate}/:id`} element={<VoucherUpdate />} />
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
