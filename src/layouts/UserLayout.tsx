import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import SettingsSidebar from "./SettingsSidebar";

const UserLayout = () => {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <Header />
      <main className='flex-1'>
        <div className='layout-container'>
          <div className='flex flex-col gap-6 mt-8 lg:flex-row'>
            <SettingsSidebar />
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
