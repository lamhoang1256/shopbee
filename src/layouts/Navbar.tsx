import { ICurrentUser } from "@types";
import { authAPI } from "apis";
import { Popover } from "components/popover";
import { defaultUserAvatar } from "constants/global";
import { path } from "constants/path";
import usePopover from "hooks/usePopover";
import { UserAvatar } from "modules/user";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";
import classNames from "utils/className";
import { removeCurrentUserLocalStorage } from "utils/localStorage";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useStore((state) => state);
  const { activePopover, hidePopover, showPopover } = usePopover();

  const handleLogout = async () => {
    try {
      const { success, message } = await authAPI.logout({
        refreshToken: currentUser?.refreshToken,
      });
      setCurrentUser({} as ICurrentUser);
      removeCurrentUserLocalStorage();
      if (success) toast.success(message);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const stylesPopoverLink =
    "text-[#000000cc] block px-5 py-2 hover:bg-[#fafafa] transition-all duration-300 hover:text-[#00bfa5]";
  return (
    <div className='flex items-center justify-between h-12 text-white'>
      <Link to={path.order}>Kiểm tra đơn hàng</Link>
      {!currentUser?.email && (
        <div className='flex gap-x-4'>
          <Link to={path.signUp}>Đăng kí</Link>
          <Link to={path.signIn}>Đăng nhập</Link>
        </div>
      )}
      {currentUser?.email && (
        <div className='relative h-full' onMouseEnter={showPopover} onMouseLeave={hidePopover}>
          <div className='flex items-center h-full gap-x-2'>
            <UserAvatar
              urlAvatar={currentUser?.avatar || defaultUserAvatar}
              className='object-cover w-5 h-5 rounded-full'
            />
            <span className='font-medium max5se:line-clamp-1 max5se:max-w-[130px]'>
              {currentUser?.fullname}
            </span>
          </div>
          <Popover active={activePopover} className='min-w-[150px]'>
            <Link to={path.profile} className={stylesPopoverLink}>
              Tài khoản của tôi
            </Link>
            <Link to={path.order} className={stylesPopoverLink}>
              Đơn mua
            </Link>
            <button
              type='button'
              onClick={handleLogout}
              className={classNames(stylesPopoverLink, "w-full text-left")}
            >
              Đăng xuất
            </button>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default Navbar;
