import { Template } from "layouts";

const stylesPopoverLink = "text-[#000000cc] flex gap-x-3 lg:gap-x-4 p-5 hover:bg-[#f8f8f8]";
const NotificationPage = () => {
  return (
    <Template title='Thông báo mới' desc='Quản lý tất cả thông báo của bạn'>
      <div className='-mx-5'>
        <div className={stylesPopoverLink}>
          <img
            src='https://source.unsplash.com/random'
            alt=''
            className='flex-shrink-0 w-16 h-16 rounded-sm lg:w-20 lg:h-20'
          />
          <div>
            <h4 className='text-base font-medium uppercase md:mb-1'>Đã được thanh toán</h4>
            <p className='text-[#0000008a]'>
              Đơn hàng đã được thanh toán Đơn hàng đã được thanh toán
            </p>
            <span className='text-[#0000008a]'>
              Đơn hàng đã được thanh toán Đơn hàng đã được thanh toán
            </span>
          </div>
        </div>
      </div>
    </Template>
  );
};

export default NotificationPage;
