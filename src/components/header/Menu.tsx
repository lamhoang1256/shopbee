import { ICurrentUser } from "@types";
import { authAPI } from "apis";
import { Popover } from "components/_popover";
import { PATH } from "constants/path";
import usePopover from "hooks/usePopover";
import { UserAvatar } from "modules/user";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";
import classNames from "utils/classNames";
import { removeCurrentUserLocalStorage } from "utils/localStorage";

const Menu = () => {
  const { currentUser, setCurrentUser } = useStore((state) => state);
  const { activePopover, hidePopover, showPopover } = usePopover();
  const handleLogout = async () => {
    try {
      const { message } = await authAPI.logout(currentUser?.refreshToken);
      setCurrentUser({} as ICurrentUser);
      removeCurrentUserLocalStorage();
      toast.success(message);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const stylesPopoverLink =
    "text-[#000000cc] block px-5 py-2 hover:bg-[#fafafa] transition-all duration-300 hover:text-[#00bfa5]";
  return (
    <div>
      {currentUser?.email ? (
        <div
          className="relative h-full w-max max5se:max-w-[130px]"
          onMouseEnter={showPopover}
          onMouseLeave={hidePopover}
        >
          <div className="flex items-center justify-end h-full gap-x-2 transition-all duration-100 hover:text-[#ffffffb3] cursor-pointer">
            <UserAvatar
              urlAvatar={currentUser?.avatar}
              className="object-cover w-5 h-5 rounded-full"
            />
            <span className="font-medium max5se:line-clamp-1 ">
              {currentUser?.fullname || "User"}
            </span>
          </div>
          <Popover active={activePopover} className="w-max">
            {currentUser.isAdmin && (
              <Link to={PATH.dashboard} className={stylesPopoverLink}>
                Dashboard
              </Link>
            )}
            <Link to={PATH.profile} className={stylesPopoverLink}>
              Tài khoản của tôi
            </Link>
            <Link to={PATH.order} className={stylesPopoverLink}>
              Đơn mua
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className={classNames(stylesPopoverLink, "w-full text-left")}
            >
              Đăng xuất
            </button>
          </Popover>
        </div>
      ) : (
        <div className="flex gap-x-4">
          <Link to={PATH.signUp} className="transition-all duration-100 hover:opacity-70">
            Đăng kí
          </Link>
          <Link to={PATH.signIn} className="transition-all duration-100 hover:opacity-70">
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
