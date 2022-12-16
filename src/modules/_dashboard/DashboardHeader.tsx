import Logo from "components/Logo";
import { defaultUserAvatar } from "constants/global";
import { PATH } from "constants/path";
import { UserAvatar } from "modules/_user";
import { Link } from "react-router-dom";
import { useStore } from "store/globalStore";

const DashboardHeader = () => {
  const { currentUser } = useStore((state) => state);
  return (
    <header className="flex items-center justify-between px-4 bg-white h-14 showdow2">
      <Logo primary>Shopbee</Logo>
      <Link to={PATH.profile} className="flex items-center justify-end h-full gap-x-2">
        <UserAvatar
          urlAvatar={currentUser?.avatar || defaultUserAvatar}
          className="object-cover rounded-full w-7 h-7"
        />
        <span className="font-medium max5se:line-clamp-1 ">{currentUser?.fullname || "User"}</span>
      </Link>
    </header>
  );
};

export default DashboardHeader;
