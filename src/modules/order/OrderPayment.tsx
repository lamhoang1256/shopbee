import { IPayment } from "interfaces";
import { ProductPriceSale } from "modules/product";
import { formatMoney } from "utils/helper";

interface OrderPaymentProps {
  payments: IPayment[];
}

const OrderPayment = ({ payments }: OrderPaymentProps) => {
  return (
    <div className='p-4 mt-2 text-right bg-white rounded-md'>
      {payments?.map(({ label, value }) => {
        if (label === "Tổng thanh toán") {
          return (
            <div className='flex' key={value}>
              <div className='flex-1 py-2'>{label}</div>
              <div className='w-1/2 py-2 md:w-48'>
                <ProductPriceSale>{formatMoney(value)}</ProductPriceSale>
              </div>
            </div>
          );
        }
        return (
          <div className='flex' key={value}>
            <div className='flex-1 py-2'>{label}</div>
            <div className='w-1/2 py-2 md:w-48'>{formatMoney(value)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderPayment;
