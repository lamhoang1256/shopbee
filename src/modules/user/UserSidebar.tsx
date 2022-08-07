import { defaultUserAvatar } from "constants/global";
import { path } from "constants/path";
import { Sidebar } from "layouts";
import { Link } from "react-router-dom";
import { useStore } from "store/configStore";

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

const UserSidebar = () => {
  const { currentUser } = useStore((state) => state);
  return (
    <Sidebar labelOpenSidebar='Tài khoản của tôi'>
      <div className='flex items-center gap-x-2'>
        <img
          src={currentUser?.avatar || defaultUserAvatar}
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
    </Sidebar>
  );
};

export default UserSidebar;
