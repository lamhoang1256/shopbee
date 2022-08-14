import { IPayment } from "@types";
import { ProductPriceSale } from "modules/product";
import { formatMoney } from "utils/helper";

interface OrderPaymentProps {
  payments: IPayment[];
}

const OrderPayment = ({ payments }: OrderPaymentProps) => {
  return (
    <div className='p-4 mt-3 text-right bg-white rounded-md'>
      {payments?.map(({ label, value }) => (
        <div className='flex' key={value}>
          <div className='flex-1 py-2'>{label}</div>
          <div className='w-1/2 py-2 md:w-48'>
            {label === "Tổng thanh toán" && (
              <ProductPriceSale>{formatMoney(value)}</ProductPriceSale>
            )}
            {label !== "Tổng thanh toán" && formatMoney(value)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderPayment;
