import Logo from "components/Logo";
import Notification from "components/Notification";
import { PATH } from "constants/path";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-12 text-white">
      <Link to={PATH.order} className="hidden sm:block">
        Kiểm tra đơn hàng
      </Link>
      <Logo className="!text-xl sm:hidden">Shopbee</Logo>
      <div className="flex items-center gap-x-6">
        <Notification />
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
