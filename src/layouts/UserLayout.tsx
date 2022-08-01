import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const UserLayout = () => {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <Header />
      <main className='flex-1'>
        <div className='layout-container'>
          <div className='flex flex-col mt-8 lg:flex-row gap-x-6'>
            <div className='hidden lg:block w-44'>Sidebar</div>
            <div className='flex-1'>
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
