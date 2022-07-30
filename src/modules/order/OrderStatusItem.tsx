interface OrderStatusItemProps {
  label: string;
  children: React.ReactNode;
}

const OrderStatusItem = ({ label, children }: OrderStatusItemProps) => {
  return (
    <div>
      <h3>{label}</h3>
      <span className='text-[#00000042] text-xs'>{children}</span>
    </div>
  );
};

export default OrderStatusItem;
