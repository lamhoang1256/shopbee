import { IOrderItem } from "@types";
import { PATH } from "constants/path";
import { ProductImage, ProductTitle } from "modules/_product";
import { ProductPriceOld, ProductPriceSale } from "modules/Product/ProductPrice";

interface OrderProductItemProps {
  order: IOrderItem;
}

const OrderProduct = ({ order }: OrderProductItemProps) => {
  return (
    <div className="flex flex-col justify-between gap-3 py-2 lg:items-center lg:flex-row">
      <div className="flex gap-3">
        <ProductImage
          src={order.product.image}
          className="w-20 h-20 object-cover border border-[#e1e1e1]"
        />
        <div>
          <ProductTitle to={`${PATH.product}/${order.product._id}`}>
            {order.product.name}
          </ProductTitle>
          <span className="block mt-1">x{order.quantity}</span>
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <ProductPriceOld>{order.product.oldPrice}</ProductPriceOld>
        <ProductPriceSale>{order.product.price}</ProductPriceSale>
      </div>
    </div>
  );
};

export default OrderProduct;
