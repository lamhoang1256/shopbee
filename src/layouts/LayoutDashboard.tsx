import { Outlet } from "react-router-dom";
import { DashboardHeader, DashboardSidebar } from "modules/dashboard";

const LayoutDashboard = () => {
  return (
    <>
      <DashboardHeader />
      <main className="px-[15px] pt-6 lg:p-0">
        <div className="flex flex-col gap-6 lg:flex-row">
          <DashboardSidebar />
          <div className="flex-1 lg:mt-6 lg:mr-6">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default LayoutDashboard;
