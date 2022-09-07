import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const LayoutHome = () => {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer className='mt-[50px]' />
    </div>
  );
};

export default LayoutHome;
