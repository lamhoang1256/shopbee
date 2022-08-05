import { Button } from "components/button";
import { useRef } from "react";
import SidebarCloseAction from "./SidebarCloseAction";

interface SidebarProps {
  children: React.ReactNode;
  labelOpenSidebar?: string;
}

const SearchSidebar = ({ children, labelOpenSidebar }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const toggleSearchSidebar = () =>
    sidebarRef.current && sidebarRef.current.classList.toggle("!translate-x-0");
  return (
    <>
      <Button primary onClick={() => toggleSearchSidebar()} className='lg:hidden'>
        {labelOpenSidebar}
      </Button>
      <div className='search-sidebar' ref={sidebarRef}>
        <SidebarCloseAction onCloseSidebar={toggleSearchSidebar} />
        <div className='max-w-[192px]'>{children}</div>
      </div>
    </>
  );
};

SearchSidebar.defaultProps = {
  labelOpenSidebar: "Mở sidebar",
};

export default SearchSidebar;
