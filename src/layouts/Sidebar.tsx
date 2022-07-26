import Button from "components/Button";
import { IconMenu } from "components/Icons";
import useOnClickOutside from "hooks/useClickOutside";
import { useRef } from "react";
import classNames from "utils/classNames";
import SidebarCloseAction from "./SidebarCloseAction";

interface SidebarProps {
  children: React.ReactNode;
  content?: string;
  className?: string;
}

const SearchAside = ({ children, content, className }: SidebarProps) => {
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
        className="flex items-center lg:hidden gap-x-2 max-w-fit"
      >
        <IconMenu />
        <span>{content}</span>
      </Button>
      <aside className={classNames("layout-sidebar", className)} ref={sidebarRef}>
        <SidebarCloseAction onCloseSidebar={toggleSearchSidebar} />
        <div>{children}</div>
      </aside>
      <div
        aria-hidden
        ref={overlayRef}
        onClick={closeSearchSidebar}
        className="inset-0 -m-3 overlay bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] z-[200]"
      />
    </>
  );
};

SearchAside.defaultProps = {
  content: "Mở sidebar",
  className: "lg:w-48"
};

export default SearchAside;
