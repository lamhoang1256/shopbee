import { path } from "constants/path";
import { IOrderProductItem } from "@types";
import { ProductImage, ProductPriceOld, ProductPriceSale, ProductTitle } from "modules/product";
import { formatMoney } from "utils/helper";

interface OrderProductItemProps {
  order: IOrderProductItem;
}

const OrderProductItem = ({ order }: OrderProductItemProps) => {
  console.log("order: ", order);
  return (
    <div className='flex flex-col justify-between gap-3 py-2 lg:items-center lg:flex-row'>
      <div className='flex gap-3'>
        <ProductImage
          imageUrl={order?.image}
          className='w-20 h-20 object-cover border border-[#e1e1e1]'
        />
        <div>
          <ProductTitle className='text-sm line-clamp-2' to={`${path.product}/${order?.product}`}>
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
