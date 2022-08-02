import { defaultAvatar } from "constants/global";
import { path } from "constants/path";
import { Link, Outlet } from "react-router-dom";
import { useStore } from "store/configStore";
import Footer from "./Footer";
import Header from "./Header";

const sidebarLinks = [
  {
    id: 1,
    icon: "https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4",
    path: path.profile,
    display: "Tài khoản của tôi",
  },
  {
    id: 2,
    icon: "https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4",
    path: path.password,
    display: "Đổi mật khẩu",
  },
  {
    id: 3,
    icon: "https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078",
    path: path.order,
    display: "Đơn mua",
  },
];

const UserLayout = () => {
  const currentUser = useStore((state: any) => state.currentUser);

  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <Header />
      <main className='flex-1'>
        <div className='layout-container'>
          <div className='flex flex-col gap-6 mt-8 lg:flex-row'>
            <div className='w-44'>
              <div className='flex items-center gap-x-2'>
                <img
                  src={currentUser?.avatar || defaultAvatar}
                  alt='avatar'
                  className='w-12 h-12 rounded-full'
                />
                <div>
                  <h3 className='font-semibold'>User</h3>
                  <Link to={path.profile}>Sửa hồ sơ</Link>
                </div>
              </div>
              <ul className='mt-7'>
                {sidebarLinks.map((link: any) => (
                  <li key={link.id} className='mb-4'>
                    <Link to={link.path} className='flex gap-x-3'>
                      <img src={link.icon} alt='' className='w-5 h-5' />
                      <span>{link.display}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex-1'>
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
