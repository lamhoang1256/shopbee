import { defaultUserAvatar } from "constants/global";
import { PATH } from "constants/path";
import { Sidebar } from "layouts";
import { Link } from "react-router-dom";
import { useStore } from "store/configStore";
import { v4 as uuidv4 } from "uuid";

const sidebarLinks = [
  {
    icon: "https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4",
    path: PATH.profile,
    display: "Tài khoản của tôi",
  },
  {
    icon: "/images/icon-password.png",
    path: PATH.password,
    display: "Đổi mật khẩu",
  },
  {
    icon: "https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078",
    path: PATH.order,
    display: "Đơn mua",
  },
  {
    icon: "https://cf.shopee.vn/file/84feaa363ce325071c0a66d3c9a88748",
    path: PATH.voucher,
    display: "Ví voucher",
  },
  {
    icon: "/images/icon-history.png",
    path: PATH.history,
    display: "Đã xem gần đây",
  },
  {
    icon: "/images/icon-heart.png",
    path: PATH.wishlist,
    display: "Đã thích",
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
          <Link to={PATH.profile}>Sửa hồ sơ</Link>
        </div>
      </div>
      <ul className='mt-7'>
        {sidebarLinks.map((link: any) => (
          <li key={uuidv4()} className='mb-4'>
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
