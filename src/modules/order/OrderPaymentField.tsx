interface OrderPaymentFieldProps {
  label: string;
  children: React.ReactNode;
}

const OrderPaymentField = ({ label, children }: OrderPaymentFieldProps) => {
  return (
    <div className='flex text-right'>
      <div className='flex-1 py-2'>{label}</div>
      <div className='w-1/2 py-2 md:w-48'>{children}</div>
    </div>
  );
};

export default OrderPaymentField;
