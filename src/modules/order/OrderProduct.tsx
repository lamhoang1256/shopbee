import { IOrderItem } from "@types";
import { PATH } from "constants/path";
import { ProductImage, ProductTitle } from "modules/product";
import { PriceOld, PriceSale } from "components/price";

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
            to={`${PATH.product}/${order.product._id}`}
          >
            {order.product.name}
          </ProductTitle>
          <span className='block mt-1'>x{order.quantity}</span>
        </div>
      </div>
      <div className='flex items-center gap-x-2'>
        <PriceOld>{order.product.oldPrice}</PriceOld>
        <PriceSale>{order.product.price}</PriceSale>
      </div>
    </div>
  );
};

export default OrderProduct;
