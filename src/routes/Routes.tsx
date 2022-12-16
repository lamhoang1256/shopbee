import { PATH } from "constants/path";
import { UserCreditCard } from "modules/_user";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fallback } from "components/_fallback";
import ErrorBoundary from "components/ErrorBoundary";
import { ScrollToTop } from "components/scrollToTop";
import { ButtonGoToTop } from "components/_button";

const LayoutAuth = lazy(() => import("layouts/LayoutAuth"));
const LayoutUser = lazy(() => import("layouts/LayoutUser"));
const LayoutHome = lazy(() => import("layouts/LayoutHome"));
const LayoutDashboard = lazy(() => import("layouts/LayoutDashboard"));
const CheckLoggedIn = lazy(() => import("routes/CheckLoggedIn"));
const ProtectedRoute = lazy(() => import("routes/ProtectedRoute"));
const CheckAdmin = lazy(() => import("routes/CheckAdmin"));
const BannerManage = lazy(() => import("modules/banner/BannerManage"));
const ShopUpdate = lazy(() => import("modules/shop/ShopUpdate"));
const VoucherAddNew = lazy(() => import("modules/voucher/VoucherAddNew"));
const VoucherManage = lazy(() => import("modules/voucher/VoucherManage"));
const VoucherMe = lazy(() => import("modules/voucher/VoucherMe"));
const VoucherDiscover = lazy(() => import("modules/voucher/VoucherDiscover"));
const VoucherUpdate = lazy(() => import("modules/voucher/VoucherUpdate"));
const OrderManage = lazy(() => import("modules/order/OrderManage"));
const OrderUpdate = lazy(() => import("modules/order/OrderUpdate"));
const OrderDetailsPage = lazy(() => import("pages/OrderDetailsPage"));
const OrderMe = lazy(() => import("modules/order/OrderMe"));
const ProductAddNew = lazy(() => import("modules/Product/ProductAddNew"));
const ProductManage = lazy(() => import("modules/Product/ProductManage"));
const ProductUpdate = lazy(() => import("modules/Product/ProductUpdate"));
const ProductDetailsPage = lazy(() => import("pages/ProductDetailsPage"));
const UserAddNew = lazy(() => import("modules/_user/UserAddNew"));
const UserChangePassword = lazy(() => import("modules/_user/UserChangePassword"));
const UserManage = lazy(() => import("modules/_user/UserManage"));
const UserUpdate = lazy(() => import("modules/_user/UserUpdate"));
const UserWishList = lazy(() => import("modules/_user/UserWishList"));
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
const NotificationPage = lazy(() => import("pages/NotificationPage"));
const CategoryAddNew = lazy(() => import("modules/category/CategoryAddNew"));
const CategoryManage = lazy(() => import("modules/category/CategoryManage"));
const CategoryUpdate = lazy(() => import("modules/category/CategoryUpdate"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <LayoutHome />
              </ErrorBoundary>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<Fallback />}>
                  <ErrorBoundary>
                    <HomePage />
                  </ErrorBoundary>
                </Suspense>
              }
            />
            <Route
              path={PATH.cart}
              element={
                <Suspense fallback={<Fallback />}>
                  <ErrorBoundary>
                    <CartPage />
                  </ErrorBoundary>
                </Suspense>
              }
            />
            <Route
              path={`${PATH.product}/:id`}
              element={
                <Suspense fallback={<Fallback />}>
                  <ErrorBoundary>
                    <ProductDetailsPage />
                  </ErrorBoundary>
                </Suspense>
              }
            />
            <Route
              path={PATH.search}
              element={
                <Suspense fallback={<Fallback />}>
                  <ErrorBoundary>
                    <SearchPage />
                  </ErrorBoundary>
                </Suspense>
              }
            />
            <Route
              path={PATH.voucherDiscover}
              element={
                <Suspense fallback={<Fallback />}>
                  <ErrorBoundary>
                    <VoucherDiscover />
                  </ErrorBoundary>
                </Suspense>
              }
            />
          </Route>

          <Route
            element={
              <Suspense fallback={<Fallback />}>
                <ErrorBoundary>
                  <CheckLoggedIn />
                </ErrorBoundary>
              </Suspense>
            }
          >
            <Route
              path="/"
              element={
                <Suspense fallback={<Fallback />}>
                  <ErrorBoundary>
                    <LayoutAuth title="Đăng ký" />
                  </ErrorBoundary>
                </Suspense>
              }
            >
              <Route
                path={PATH.signUp}
                element={
                  <Suspense fallback={<Fallback />}>
                    <ErrorBoundary>
                      <SignUpPage />
                    </ErrorBoundary>
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="/"
              element={
                <Suspense fallback={<Fallback />}>
                  <ErrorBoundary>
                    <LayoutAuth title="Đăng nhập" />
                  </ErrorBoundary>
                </Suspense>
              }
            >
              <Route
                path={PATH.signIn}
                element={
                  <Suspense fallback={<Fallback />}>
                    <ErrorBoundary>
                      <SignInPage />
                    </ErrorBoundary>
                  </Suspense>
                }
              />
            </Route>
          </Route>

          <Route
            element={
              <Suspense fallback={<Fallback />}>
                <ErrorBoundary>
                  <ProtectedRoute />
                </ErrorBoundary>
              </Suspense>
            }
          >
            {/* User Routes */}
            <Route
              element={
                <Suspense fallback={<Fallback />}>
                  <ErrorBoundary>
                    <LayoutUser />
                  </ErrorBoundary>
                </Suspense>
              }
            >
              <Route
                path={PATH.order}
                element={
                  <Suspense fallback={<Fallback />}>
                    <ErrorBoundary>
                      <OrderMe />
                    </ErrorBoundary>
                  </Suspense>
                }
              />
              <Route
                path={`${PATH.order}/:id`}
                element={
                  <Suspense fallback={<Fallback />}>
                    <ErrorBoundary>
                      <OrderDetailsPage />
                    </ErrorBoundary>
                  </Suspense>
                }
              />
              <Route
                path={PATH.profile}
                element={
                  <Suspense fallback={<Fallback />}>
                    <ErrorBoundary>
                      <ProfilePage />
                    </ErrorBoundary>
                  </Suspense>
                }
              />
              <Route
                path={PATH.password}
                element={
                  <Suspense fallback={<Fallback />}>
                    <ErrorBoundary>
                      <UserChangePassword />
                    </ErrorBoundary>
                  </Suspense>
                }
              />
              <Route
                path={PATH.voucherWallet}
                element={
                  <Suspense fallback={<Fallback />}>
                    <ErrorBoundary>
                      <VoucherMe />
                    </ErrorBoundary>
                  </Suspense>
                }
              />
              <Route
                path={PATH.wishlist}
                element={
                  <Suspense fallback={<Fallback />}>
                    <ErrorBoundary>
                      <UserWishList />
                    </ErrorBoundary>
                  </Suspense>
                }
              />
              <Route
                path={PATH.notification}
                element={
                  <Suspense fallback={<Fallback />}>
                    <ErrorBoundary>
                      <NotificationPage />
                    </ErrorBoundary>
                  </Suspense>
                }
              />
              <Route
                path={PATH.history}
                element={
                  <Suspense fallback={<Fallback />}>
                    <ErrorBoundary>
                      <HistoryPage />
                    </ErrorBoundary>
                  </Suspense>
                }
              />
              <Route
                path={PATH.creditCard}
                element={
                  <Suspense fallback={<Fallback />}>
                    <ErrorBoundary>
                      <UserCreditCard />
                    </ErrorBoundary>
                  </Suspense>
                }
              />
            </Route>
            <Route
              path={PATH.checkout}
              element={
                <Suspense fallback={<Fallback />}>
                  <ErrorBoundary>
                    <CheckoutPage />
                  </ErrorBoundary>
                </Suspense>
              }
            />
            {/* Admin Routes */}
            <Route
              element={
                <Suspense fallback={<Fallback />}>
                  <ErrorBoundary>
                    <CheckAdmin />
                  </ErrorBoundary>
                </Suspense>
              }
            >
              <Route
                path="/dashboard"
                element={
                  <Suspense fallback={<Fallback />}>
                    <ErrorBoundary>
                      <LayoutDashboard />
                    </ErrorBoundary>
                  </Suspense>
                }
              >
                <Route
                  index
                  element={
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <DashboardPage />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
                <Route
                  path={PATH.orderManage}
                  element={
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <OrderManage />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
                <Route
                  path={`${PATH.orderManage}/:id`}
                  element={
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <OrderUpdate />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
                <Route
                  path={PATH.categoryManage}
                  element={
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <CategoryManage />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
                <Route
                  path={PATH.categoryAddNew}
                  element={
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <CategoryAddNew />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
                <Route
                  path={`${PATH.categoryUpdate}/:id`}
                  element={
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <CategoryUpdate />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
                <Route
                  path={PATH.productManage}
                  element={
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <ProductManage />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
                <Route
                  path={PATH.productAddNew}
                  element={
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <ProductAddNew />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
                <Route
                  path={`${PATH.productUpdate}/:id`}
                  element={
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <ProductUpdate />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
                <Route
                  path={PATH.banner}
                  element={
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <BannerManage />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
                <Route
                  path={PATH.shop}
                  element={
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <ShopUpdate />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
                <Route
                  path={PATH.userManage}
                  element={
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <UserManage />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
                <Route
                  path={`${PATH.userUpdate}/:id`}
                  element={
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <UserUpdate />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
                <Route
                  path={PATH.userAddNew}
                  element={
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <UserAddNew />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
                <Route
                  path={PATH.voucherManage}
                  element={
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <VoucherManage />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
                <Route
                  path={PATH.voucherAddNew}
                  element={
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <VoucherAddNew />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
                <Route
                  path={`${PATH.voucherUpdate}/:id`}
                  element={
                    <Suspense fallback={<Fallback />}>
                      <ErrorBoundary>
                        <VoucherUpdate />
                      </ErrorBoundary>
                    </Suspense>
                  }
                />
              </Route>
            </Route>
          </Route>

          <Route
            path="*"
            element={
              <Suspense fallback={<Fallback />}>
                <ErrorBoundary>
                  <PageNotFound />
                </ErrorBoundary>
              </Suspense>
            }
          />
        </Routes>
        <ButtonGoToTop />
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
