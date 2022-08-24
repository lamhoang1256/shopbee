import { Logo } from "components/logo";
import { Outlet } from "react-router-dom";

interface LayoutAuthProps {
  title: string;
}

const LayoutAuth = ({ title }: LayoutAuthProps) => {
  return (
    <div className='flex flex-col justify-between'>
      <header className='bg-white'>
        <div className='layout-container'>
          <div className='flex items-center h-20 gap-x-4'>
            <Logo primary>Shopbee</Logo>
            <h2 className='text-xl'>{title}</h2>
          </div>
        </div>
      </header>
      <main className='flex-1 py-16 bg-orangeee4'>
        <Outlet />
      </main>
      <footer className='text-[#000000a6] p-10'>
        <div className='layout-container'>
          <div className='flex flex-col items-center justify-between md:flex-row'>
            <span>©2022 Shopbee. Tất cả các quyền được bảo lưu.</span>
            <span>Ngôn ngữ: Tiếng Anh Tiếng Việt</span>
          </div>
          <div className='mt-8 text-xs text-center'>
            <p className='mb-4'> Công ty TNHH Shoppee</p>
            <p>
              Địa chỉ: Tầng 22, Tòa nhà Inter Lotte Hà Nội, 54 Liễu Giai, phường Cống Vị, Quận Ba
              Đình, Hà Nội. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.myshop.vn
            </p>
            <p>
              Mã số doanh nghiệp: 01067111173786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày
              10/02/2016
            </p>
            <p>©2015 - Bản quyền thuộc về Công ty TNHH MyShop</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutAuth;
