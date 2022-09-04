import { defaultUserAvatar } from "constants/global";
import { PATH } from "constants/path";
import { Sidebar } from "layouts";
import { Link } from "react-router-dom";
import { useStore } from "store/globalStore";
import { v4 as uuidv4 } from "uuid";
import UserAvatar from "./UserAvatar";

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
    icon: "https://cf.shopee.vn/file/e10a43b53ec8605f4829da5618e0717c",
    path: PATH.notification,
    display: "Thông báo",
  },
  {
    icon: "/images/icon-heart.png",
    path: PATH.wishlist,
    display: "Đã thích",
  },
  {
    icon: "/images/icon-credit-card.png",
    path: PATH.creditCard,
    display: "Ngân hàng",
  },
];

const UserSidebar = () => {
  const { currentUser } = useStore((state) => state);
  return (
    <Sidebar labelOpenSidebar='Tài khoản của tôi'>
      <div className='flex items-center gap-x-2'>
        <UserAvatar
          className='w-10 h-10 rounded-full'
          urlAvatar={currentUser?.avatar || defaultUserAvatar}
        />
        <div>
          <h3 className='font-semibold line-clamp-1'>{currentUser?.fullname || "User"}</h3>
          <Link to={PATH.profile}>Sửa hồ sơ</Link>
        </div>
      </div>
      <ul className='mt-7'>
        {sidebarLinks.map((link) => (
          <li key={uuidv4()} className='mb-4'>
            <Link to={link.path} className='flex items-center gap-x-3'>
              <img src={link.icon} alt={link.display} className='w-5 h-5' />
              <span>{link.display}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Sidebar>
  );
};

export default UserSidebar;
