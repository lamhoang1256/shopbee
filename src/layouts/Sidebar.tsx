import { Button } from "components/button";
import { IconMenu } from "components/icons";
import useOnClickOutside from "hooks/useClickOutside";
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleSearchSidebar = () => {
    if (sidebarRef.current) sidebarRef.current.classList.toggle("!translate-x-0");
    if (overlayRef.current) overlayRef.current.classList.toggle("fixed");
  };
  const closeSearchSidebar = () => {
    if (sidebarRef.current) sidebarRef.current.classList.remove("!translate-x-0");
    if (overlayRef.current) overlayRef.current.classList.remove("fixed");
  };
  useOnClickOutside(sidebarRef, () => closeSearchSidebar());
  return (
    <>
      <Button
        primary
        onClick={() => toggleSearchSidebar()}
        className='flex items-center lg:hidden gap-x-2 max-w-fit'
      >
        <IconMenu />
        <span>{labelOpenSidebar}</span>
      </Button>
      <aside className={classNames("layout-sidebar", className)} ref={sidebarRef}>
        <SidebarCloseAction onCloseSidebar={toggleSearchSidebar} />
        <div>{children}</div>
      </aside>
      <div
        aria-hidden
        ref={overlayRef}
        onClick={closeSearchSidebar}
        className='inset-0 -m-3 overlay bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] z-[200]'
      />
    </>
  );
};

SearchSidebar.defaultProps = {
  labelOpenSidebar: "Mở sidebar",
  className: "lg:w-48",
};

export default SearchSidebar;
