interface OrderHeaderProps {
  id: string;
  children: React.ReactNode;
}

const OrderHeader = ({ id, children }: OrderHeaderProps) => {
  return (
    <div className='flex flex-col justify-between md:items-center md:flex-row'>
      <h3 className='text-lg font-medium'>Quản lí đơn hàng</h3>
      <span>
        ID ĐƠN HÀNG: {id} | <span className='uppercase text-orangeee4'>{children}</span>
      </span>
    </div>
  );
};

export default OrderHeader;
