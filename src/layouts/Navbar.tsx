import { Menu } from "components/header";
import { Notification } from "components/notification";
import { PATH } from "constants/path";
import { Link } from "react-router-dom";
import { useStore } from "store/globalStore";

const Navbar = () => {
  const { currentUser } = useStore((state) => state);
  return (
    <div className='flex items-center justify-between h-12 text-white'>
      <Link to={PATH.order}>Kiểm tra đơn hàng</Link>
      {!currentUser?.email && (
        <div className='flex gap-x-4'>
          <Link to={PATH.signUp}>Đăng kí</Link>
          <Link to={PATH.signIn}>Đăng nhập</Link>
        </div>
      )}
      <div className='flex items-center gap-x-6'>
        <Notification />
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
