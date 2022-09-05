import { IconBell } from "components/icons";
import { Popover } from "components/popover";
import { PATH } from "constants/path";
import usePopover from "hooks/usePopover";
import { Link } from "react-router-dom";
import { useStore } from "store/globalStore";

const stylesPopoverLink = "text-[#000000cc] flex gap-x-2 p-3 hover:bg-[#f8f8f8]";
const Notification = () => {
  const { notifications } = useStore((state) => state);
  const { activePopover, hidePopover, showPopover } = usePopover();
  return (
    <div
      className='relative h-full !min-w-[160px] max5se:max-w-[130px]'
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
    >
      <div className='flex items-center justify-end h-full gap-x-[6px] transition-all duration-100 hover:text-[#ffffffb3]'>
        <IconBell />
        <span>Thông báo</span>
      </div>
      <Popover active={activePopover} className='min-w-[400px]'>
        <h3 className='px-3 py-2 text-[#000000cc]'>Thông báo mới nhận</h3>
        <>
          {notifications.slice(0, 5).map((notify) => (
            <div className={stylesPopoverLink} key={notify._id}>
              <img
                alt='notification'
                src={notify.image}
                className='flex-shrink-0 rounded-sm w-11 h-11'
              />
              <div>
                <h4 className='text-[13px] font-medium uppercase'>{notify.title}</h4>
                <div
                  className='text-[13px] line-clamp-3 leading-4 text-[#0000008a]'
                  dangerouslySetInnerHTML={{ __html: notify.desc || "" }}
                />
              </div>
            </div>
          ))}

          <Link
            to={PATH.notification}
            className='p-3 py-2 text-center text-[#000000cc] hover:bg-[#f8f8f8] block'
          >
            Xem tất cả
          </Link>
        </>
        {/* <div className='flex flex-col items-center justify-center gap-y-1 h-[200px]'>
          <img src='/images/bell.png' alt='empty notification' className='w-24 h-24' />
          <h3 className='font-medium text-base text-[#00000066]'>Chưa có thông tin mới</h3>
        </div> */}
      </Popover>
    </div>
  );
};

export default Notification;
