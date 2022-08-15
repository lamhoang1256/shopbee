import { IOrderItem } from "@types";
import { path } from "constants/path";
import { ProductImage, ProductPriceOld, ProductPriceSale, ProductTitle } from "modules/product";
import { formatMoney } from "utils/helper";

interface OrderProductItemProps {
  order: IOrderItem;
}

const OrderProduct = ({ order }: OrderProductItemProps) => {
  return (
    <div className='flex flex-col justify-between gap-3 py-2 lg:items-center lg:flex-row'>
      <div className='flex gap-3'>
        <ProductImage
          imageUrl={order.product.image}
          className='w-20 h-20 object-cover border border-[#e1e1e1]'
        />
        <div>
          <ProductTitle
            className='text-sm line-clamp-2'
            to={`${path.product}/${order?.product._id}`}
          >
            {order.product.name}
          </ProductTitle>
          <span className='block mt-1'>x{order?.quantity}</span>
        </div>
      </div>
      <div className='flex items-center gap-x-2'>
        <ProductPriceOld>{formatMoney(order.product.oldPrice)}</ProductPriceOld>
        <ProductPriceSale>{formatMoney(order.product.price)}</ProductPriceSale>
      </div>
    </div>
  );
};

export default OrderProduct;
