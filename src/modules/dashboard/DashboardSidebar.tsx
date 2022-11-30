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
  IconVoucher
} from "components/icons";
import { PATH } from "constants/path";
import { Sidebar } from "layouts";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const sidebarLinks = [
  {
    icon: <IconTemplate />,
    display: "Tổng quan",
    path: PATH.dashboard
  },
  {
    icon: <IconPicture />,
    display: "Tất cả banner",
    path: PATH.banner
  },
  {
    icon: <IconCategoryManage />,
    display: "Tất cả danh mục",
    path: PATH.categoryManage
  },
  {
    icon: <IconTag />,
    display: "Thêm danh mục mới",
    path: PATH.categoryAddNew
  },
  {
    icon: <IconCash />,
    display: "Tất cả đơn hàng",
    path: PATH.orderManage
  },
  {
    icon: <IconCube />,
    display: "Tất cả sản phẩm",
    path: PATH.productManage
  },
  {
    icon: <IconAddProduct />,
    display: "Thêm sản phẩm",
    path: PATH.productAddNew
  },
  {
    icon: <IconUserGroup />,
    display: "Tất cả người dùng",
    path: PATH.userManage
  },
  {
    icon: <IconAddUser />,
    display: "Thêm người dùng mới",
    path: PATH.userAddNew
  },
  {
    icon: <IconIdentification />,
    display: "Thông tin shop",
    path: PATH.shop
  },
  {
    icon: <IconVoucher />,
    display: "Tất cả voucher",
    path: PATH.voucherManage
  },
  {
    icon: <IconAddVoucher />,
    display: "Thêm voucher mới",
    path: PATH.voucherAddNew
  }
];

const stylesLink = "flex gap-x-2 items-center p-3";
const stylesLinkActive = "flex gap-x-2 items-center p-3 bg-orangeee4 text-white rounded-lg";
const DashboardSidebar = () => {
  return (
    <Sidebar labelOpenSidebar="Dashboard" className="lg:w-[280px] lg:p-4 lg:bg-white shadow1">
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
  );
};

export default DashboardSidebar;
