import { NavLink, Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Sidebar } from "layouts";
import { PATH } from "constants/path";
import { DashboardHeader } from "modules/dashboard";
import {
  IconAddProduct,
  IconAddUser,
  IconAddVoucher,
  IconCash,
  IconCategoryManage,
  IconCube,
  IconIdentification,
  IconPicture,
  IconTag,
  IconTemplate,
  IconUserGroup,
  IconVoucher,
} from "components/icons";

const sidebarLinks = [
  {
    icon: <IconTemplate />,
    display: "Tổng quan",
    path: PATH.dashboard,
  },
  {
    icon: <IconPicture />,
    display: "Tất cả banner",
    path: PATH.banner,
  },
  {
    icon: <IconCategoryManage />,
    display: "Tất cả danh mục",
    path: PATH.categoryManage,
  },
  {
    icon: <IconTag />,
    display: "Thêm danh mục mới",
    path: PATH.categoryAddNew,
  },
  {
    icon: <IconCash />,
    display: "Tất cả đơn hàng",
    path: PATH.orderManage,
  },
  {
    icon: <IconCube />,
    display: "Tất cả sản phẩm",
    path: PATH.productManage,
  },
  {
    icon: <IconAddProduct />,
    display: "Thêm sản phẩm",
    path: PATH.productAddNew,
  },
  {
    icon: <IconUserGroup />,
    display: "Tất cả người dùng",
    path: PATH.userManage,
  },
  {
    icon: <IconAddUser />,
    display: "Thêm người dùng mới",
    path: PATH.userAddNew,
  },
  {
    icon: <IconIdentification />,
    display: "Thông tin shop",
    path: PATH.shop,
  },
  {
    icon: <IconVoucher />,
    display: "Tất cả voucher",
    path: PATH.voucherManage,
  },
  {
    icon: <IconAddVoucher />,
    display: "Thêm voucher mới",
    path: PATH.voucherAddNew,
  },
];

const stylesLink = "flex gap-x-2 items-center p-3";
const stylesLinkActive = "flex gap-x-2 items-center p-3 bg-orangeee4 text-white rounded-lg";
const LayoutDashboard = () => {
  return (
    <>
      <DashboardHeader />
      <main className='flex flex-col gap-6 lg:flex-row'>
        <Sidebar className='lg:w-[280px] lg:p-4 lg:bg-white shadow1'>
          <ul>
            {sidebarLinks.map((link) => (
              <li key={uuidv4()}>
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

export default LayoutDashboard;
