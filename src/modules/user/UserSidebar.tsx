import { defaultUserAvatar } from "constants/global";
import { PATH } from "constants/path";
import { Sidebar } from "layouts";
import { Link } from "react-router-dom";
import { useStore } from "store/globalStore";
import { v4 as uuidv4 } from "uuid";
import UserAvatar from "./UserAvatar";

const sidebarLinks = [
  {
    icon: "/images/icon-account.png",
    path: PATH.profile,
    display: "Tài khoản của tôi",
  },
  {
    icon: "/images/icon-password.png",
    path: PATH.password,
    display: "Đổi mật khẩu",
  },
  {
    icon: "icon-order.png",
    path: PATH.order,
    display: "Đơn mua",
  },
  {
    icon: "icon-voucher-wallet.png",
    path: PATH.voucherWallet,
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
  {
    icon: "/images/icon-notification.png",
    path: PATH.notification,
    display: "Thông báo",
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
