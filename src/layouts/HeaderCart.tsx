import { Button } from "components/button";
import { IconCartOutline } from "components/icons";
import { Popover } from "components/popover";
import { path } from "constants/path";
import usePopover from "hooks/usePopover";
import { ProductImage, ProductPriceSale, ProductTitle } from "modules/product";
import { Link } from "react-router-dom";
import { useStore } from "store/configStore";
import { formatMoney } from "utils/helper";

const HeaderCart = () => {
  const { carts } = useStore((state) => state);
  const { activePopover, hidePopover, showPopover } = usePopover();
  return (
    <div className='relative p-5 max5se:p-0' onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      <Link to={path.cart}>
        <IconCartOutline className='text-white' />
        <span className='absolute flex items-center justify-center w-6 h-[18px] text-xs font-medium bg-white rounded-full max5se:-top-3 max5se:-right-3 top-2 right-2 text-orangeee4'>
          {carts?.length >= 99 ? 99 : carts.length}
        </span>
      </Link>
      <Popover
        active={activePopover}
        className='w-[300px] md:w-[400px] max5se:!-right-3 max5se:top-[170%] !right-3 '
      >
        <div className='py-3 shadow2'>
          <span className='px-3'>Sản phẩm mới thêm</span>
          <div className='mt-5'>
            {carts.slice(0, 5).map((cart) => (
              <Link
                key={cart._id}
                to={`${path.product}/${cart.product._id}`}
                className='flex items-start p-3 gap-x-2 hover:bg-[#f8f8f8] transition-all duration-300'
              >
                <ProductImage
                  imageUrl={cart.product.image}
                  className='border h-11 w-11 border-[#00000017]'
                />
                <ProductTitle className='line-clamp-1'>{cart.product.name}</ProductTitle>
                <ProductPriceSale className='flex-shrink-0 ml-2'>
                  {formatMoney(cart.product.priceSale)}
                </ProductPriceSale>
              </Link>
            ))}
            <div className='flex items-center justify-between px-3 mt-7'>
              <div>{carts.length > 5 && <span>{carts.length - 5} Thêm vào giỏ hàng</span>}</div>
              <Button primary className='py-[6px]' to={path.cart}>
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