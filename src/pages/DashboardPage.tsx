import { Dropdown } from "components/dropdown";
import { path } from "constants/path";
import { Sidebar } from "layouts";
import { DashboardHeader, DashboardNeedWork } from "modules/dashboard";

const orderManage = [
  {
    display: "Tất cả",
    path: path.dashboard,
  },
  {
    display: "Đơn hủy",
    path: path.dashboard,
  },
];

const productManage = [
  {
    display: "Tất Cả Sản Phẩm",
    path: path.dashboard,
  },
  {
    display: "Thêm sản phẩm",
    path: path.dashboard,
  },
];
const DashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <main className='flex flex-col gap-6 lg:flex-row'>
        <Sidebar className='lg:w-[220px] lg:p-4 lg:bg-white shadow1'>
          <Dropdown dropdownData={orderManage}>
            <div className='flex items-center gap-x-2'>
              <img
                src='https://cf.shopee.vn/file/f82f8ccb649afcdf4f07f1dd9c41bcb0'
                alt='icon'
                className='w-4 h-4'
              />
              <span className='font-semibold'>Quản lý đơn hàng</span>
            </div>
          </Dropdown>
          <Dropdown dropdownData={productManage} className='mt-6'>
            <div className='flex items-center gap-x-2'>
              <img
                src='https://cf.shopee.vn/file/f82f8ccb649afcdf4f07f1dd9c41bcb0'
                alt='icon'
                className='w-4 h-4'
              />
              <span className='font-semibold'>Quản lý sản phẩm</span>
            </div>
          </Dropdown>
        </Sidebar>
        <div className='flex-1 mt-6 max-w-[1140px]'>
          <DashboardNeedWork />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
