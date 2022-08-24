import { DashboardHeader } from "modules/dashboard";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <main className='flex flex-col gap-6 lg:flex-row'>
        <DashboardSidebar />
        <div className='flex-1 mt-6 px-[15px] mb-10 max-w-[1140px]'>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;
