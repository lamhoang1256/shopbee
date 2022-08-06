const works = [
  {
    label: "Chờ xác nhận",
    value: 0,
  },
  {
    label: "Đang giao hàng",
    value: 0,
  },
  {
    label: "Đã giao hàng",
    value: 0,
  },
  {
    label: "Đơn hủy",
    value: 0,
  },
  {
    label: "Sản phẩm hết hàng",
    value: 0,
  },
];

const DashboardNeedWork = () => {
  return (
    <div className='p-6 bg-white shadow1'>
      <h2 className='text-lg font-bold'>Danh sách cần làm</h2>
      <span className='text-xs text-gray999'>Những việc bạn sẽ phải làm</span>
      <div className='grid grid-cols-4 gap-y-2 mt-6 max-w-[736px]'>
        {works.map((work) => (
          <div className='flex p-2 flex-col items-center justify-center hover:bg-[#0000000a] duration-100 rounded transition-all'>
            <span className='text-[#2673dd] text-lg font-medium'>{work.value}</span>
            <span className=''>{work.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardNeedWork;
