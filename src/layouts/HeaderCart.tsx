import Button from "components/Button";
import { IconCartOutline } from "components/Icons";
import Popover from "components/Popover";
import { PATH } from "constants/path";
import usePopover from "hooks/usePopover";
import { ProductPriceSale } from "modules/Product/ProductPrice";
import { Link } from "react-router-dom";
import { useStore } from "store/globalStore";

const HeaderCart = () => {
  const { carts } = useStore((state) => state);
  const { activePopover, hidePopover, showPopover } = usePopover();
  return (
    <div
      className="relative flex-shrink-0 p-5 max5se:p-0"
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
    >
      <Link to={PATH.cart}>
        <IconCartOutline className="text-white" />
        <span className="absolute flex items-center justify-center w-6 h-[18px] text-xs font-medium bg-white rounded-full max5se:-top-3 max5se:-right-3 top-2 right-2 text-orangeee4">
          {carts.length >= 99 ? 99 : carts.length}
        </span>
      </Link>
      <Popover
        active={activePopover}
        className="w-[300px] md:w-[400px] max5se:!-right-3 max5se:top-[170%] !right-3 "
      >
        <div className="py-3 shadow2">
          <span className="px-3">Sản phẩm mới thêm</span>
          <div className="mt-5">
            {carts.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-y-1">
                <img src="/cart-empty.png" alt="cart" className="w-20 h-20" />
                <h3 className="text-[#00000066]">Giỏ hàng của bạn còn trống</h3>
              </div>
            )}
            {carts.length > 0 &&
              carts.slice(0, 5).map((cart) => (
                <Link
                  key={cart._id}
                  to={`${PATH.product}/${cart.product._id}`}
                  className="flex items-start p-3 gap-x-2 hover:bg-[#f8f8f8] transition-all duration-300"
                >
                  <img
                    alt={cart.product.name}
                    src={cart.product.image}
                    className="border h-11 w-11 border-black017"
                  />
                  <h3 className="flex-1 product-title line-clamp-1">{cart.product.name}</h3>
                  <ProductPriceSale className="flex-shrink-0 ml-2">
                    {cart.product.price}
                  </ProductPriceSale>
                </Link>
              ))}
            <div className="flex items-center justify-between px-3 mt-7">
              <div>{carts.length > 5 && <span>{carts.length - 5} Thêm vào giỏ hàng</span>}</div>
              <Button primary className="py-[6px]" to={PATH.cart}>
                Xem giỏ hàng
              </Button>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default HeaderCart;
