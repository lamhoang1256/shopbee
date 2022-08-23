import { IPayment } from "@types";
import { PriceSale } from "components/price";
import { formatMoney } from "utils/helper";

interface OrderPaymentProps {
  payments: IPayment[];
}

const OrderPayment = ({ payments }: OrderPaymentProps) => {
  return (
    <div className='p-4 mt-3 text-right bg-[#fffcf5] rounded-md'>
      {payments?.map(({ label, value }) => (
        <div className='flex' key={label}>
          <div className='flex-1 py-2'>{label}</div>
          <div className='w-1/2 py-2 md:w-48'>
            {label === "Tổng thanh toán" && (
              <PriceSale className='text-lg font-medium'>{value}</PriceSale>
            )}
            {label !== "Tổng thanh toán" && formatMoney(value)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderPayment;
