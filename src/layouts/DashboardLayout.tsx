import { NavLink, Outlet } from "react-router-dom";
import { Sidebar } from "layouts";
import { path } from "constants/path";
import { DashboardHeader } from "modules/dashboard";
import { IconCube } from "components/icons";

const sidebarLinks = [
  {
    icon: <IconCube />,
    display: "Tất cả",
    path: path.orderManage,
  },
  {
    icon: <IconCube />,
    display: "Đơn hủy",
    path: path.dashboard,
  },
  {
    icon: <IconCube />,
    display: "Tất Cả Sản Phẩm",
    path: path.productManage,
  },
  {
    icon: <IconCube />,
    display: "Thêm sản phẩm",
    path: path.productAddNew,
  },
  {
    icon: <IconCube />,
    display: "Tất cả Banner",
    path: path.banner,
  },
  {
    icon: <IconCube />,
    display: "Tất cả người dùng",
    path: path.userManage,
  },
  {
    icon: <IconCube />,
    display: "Thêm người dùng mới",
    path: path.userAddNew,
  },
];

const stylesLink = "flex gap-x-2 items-center p-3";
const stylesLinkActive = "flex gap-x-2 items-center p-3 bg-orangeee4 text-white rounded-lg";
const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <main className='flex flex-col gap-6 lg:flex-row'>
        <Sidebar className='lg:w-[280px] lg:p-4 lg:bg-white shadow1'>
          <ul>
            {sidebarLinks.map((link) => (
              <li>
                <NavLink
                  end
                  to={link.path}
                  className={({ isActive }) => (isActive ? stylesLinkActive : stylesLink)}
                >
                  {link.icon}
                  {link.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </Sidebar>
        <div className='flex-1 mt-6 px-[15px] mb-10 max-w-[1140px]'>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;
