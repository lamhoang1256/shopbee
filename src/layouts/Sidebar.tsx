import { Button } from "components/button";
import { useRef } from "react";
import classNames from "utils/className";
import SidebarCloseAction from "./SidebarCloseAction";

interface SidebarProps {
  children: React.ReactNode;
  labelOpenSidebar?: string;
  className?: string;
}

const SearchSidebar = ({ children, labelOpenSidebar, className }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const toggleSearchSidebar = () =>
    sidebarRef.current && sidebarRef.current.classList.toggle("!translate-x-0");
  return (
    <>
      <Button primary onClick={() => toggleSearchSidebar()} className='lg:hidden'>
        {labelOpenSidebar}
      </Button>
      <div className={classNames("search-sidebar lg:w-48", className)} ref={sidebarRef}>
        <SidebarCloseAction onCloseSidebar={toggleSearchSidebar} />
        <div>{children}</div>
      </div>
    </>
  );
};

SearchSidebar.defaultProps = {
  labelOpenSidebar: "Mở sidebar",
  className: "",
};

export default SearchSidebar;
