import { Logo } from "components/_logo";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

interface LayoutAuthProps {
  title: string;
}

const LayoutAuth = ({ title }: LayoutAuthProps) => {
  return (
    <div className="flex flex-col justify-between">
      <header className="bg-white">
        <div className="layout-container">
          <div className="flex items-center h-20 gap-x-4">
            <Logo primary>Shopbee</Logo>
            <h2 className="text-xl">{title}</h2>
          </div>
        </div>
      </header>
      <main className="flex-1 py-16 bg-orangeee4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutAuth;
