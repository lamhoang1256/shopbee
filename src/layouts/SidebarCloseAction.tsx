import { IconPrev } from "components/icons";

interface SidebarCloseActionProps {
  onCloseSidebar: () => any;
}

const SidebarCloseAction = ({ onCloseSidebar }: SidebarCloseActionProps) => {
  return (
    <div
      className='flex items-center mb-5 cursor-pointer gap-x-2 lg:hidden'
      aria-hidden='true'
      onClick={() => onCloseSidebar()}
    >
      <IconPrev className='w-4 h-4' />
      <span className='text-base font-medium'>Trở lại</span>
    </div>
  );
};

export default SidebarCloseAction;
