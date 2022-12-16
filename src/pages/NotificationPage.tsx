import Template from "layouts/Template";
import { Helmet } from "react-helmet-async";
import { useStore } from "store/globalStore";
import { formatDateVNFull } from "utils/helper";

const stylesPopoverLink = "text-[#000000cc] flex gap-x-3 lg:gap-x-4 p-5 hover:bg-[#f8f8f8]";
const NotificationPage = () => {
  const { notifications } = useStore((state) => state);
  return (
    <Template title="Thông báo mới" desc="Quản lý tất cả thông báo của bạn">
      <Helmet>
        <title>Thông báo</title>
      </Helmet>
      {notifications.length > 0 && (
        <div className="-mx-5 cursor-pointer">
          {notifications.map((notify) => (
            <div className={stylesPopoverLink} key={notify._id}>
              <img
                alt="notification"
                src={notify.image}
                className="flex-shrink-0 w-16 h-16 rounded lg:w-20 lg:h-20 border border-[#e1e1e1]"
              />
              <div>
                <h4 className="text-base font-medium uppercase md:mb-1">{notify.title}</h4>
                <div
                  className="text-[#0000008a]"
                  dangerouslySetInnerHTML={{ __html: notify.desc || "" }}
                />
                <span className="text-[#0000008a]">{formatDateVNFull(notify.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {notifications.length <= 0 && (
        <div className="flex flex-col items-center justify-center gap-y-1 h-[200px]">
          <img src="/images/bell.png" alt="notification" className="w-24 h-24" />
          <h3 className="font-medium text-base text-[#00000066]">Chưa có thông tin mới</h3>
        </div>
      )}
    </Template>
  );
};

export default NotificationPage;
