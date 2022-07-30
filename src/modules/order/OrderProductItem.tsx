import { path } from "constants/path";
import { IOrderProductItem } from "interfaces/order";
import { ProductImage, ProductPriceOld, ProductPriceSale, ProductTitle } from "modules/product";
import { formatMoney } from "utils/helper";

interface OrderProductItemProps {
  order: IOrderProductItem;
}

const OrderProductItem = ({ order }: OrderProductItemProps) => {
  return (
    <div className='flex items-center justify-between py-2'>
      <div className='flex gap-3'>
        <ProductImage
          imageUrl={order?.image}
          className='w-20 h-20 object-cover border border-[#e1e1e1]'
        />
        <div>
          <ProductTitle className='text-sm' to={`${path.detail}/${order?._id}`}>
            {order?.name}
          </ProductTitle>
          <span className='block mt-1'>x{order?.quantity}</span>
        </div>
      </div>
      <div className='flex items-center gap-x-2'>
        <ProductPriceOld>{formatMoney(order?.price)}</ProductPriceOld>
        <ProductPriceSale>{formatMoney(order?.priceSale)}</ProductPriceSale>
      </div>
    </div>
  );
};

export default OrderProductItem;
