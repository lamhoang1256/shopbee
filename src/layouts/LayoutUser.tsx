import { Outlet } from "react-router-dom";
import { UserSidebar } from "modules/user";
import Footer from "./Footer";
import Header from "./Header";

const LayoutUser = () => {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <Header />
      <main className='flex-1'>
        <div className='layout-container'>
          <div className='flex flex-col gap-6 mt-8 lg:flex-row'>
            <UserSidebar />
            <div className='flex-1'>
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <Footer className='mt-[50px]' />
    </div>
  );
};

export default LayoutUser;
