import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useStore } from "store/configStore";
import { configAPI } from "apis/configAPI";
import { path } from "constants/path";
import { MainLayout, UserLayout } from "layouts";
import { UserChangePassword } from "modules/user";
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
        <Route path={path.dashboard} element={<DashboardPage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
