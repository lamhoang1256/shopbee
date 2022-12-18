import { ICart, IPayloadAddToCart } from "@types";
import { cartAPI } from "apis";
import Button from "components/Button";
import QuantityController from "components/QuantityController";
import { PATH } from "constants/path";
import { ProductPriceOld, ProductPriceSale } from "modules/Product/ProductPrice";
import CartEmpty from "modules/Cart/CartEmpty";
import { Helmet } from "react-helmet-async";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";

const CartPage = () => {
  const { carts, cartsOutOfStock, setCarts } = useStore((state) => state);
  const addToCartMutation = useMutation({
    mutationFn: (payload: IPayloadAddToCart) => cartAPI.addToCart(payload),
    onSuccess: ({ data }, payload) => {
      const foundProductIndex = carts.findIndex((cart) => data._id === cart._id);
      carts[foundProductIndex].quantity = payload.quantity;
      setCarts([...carts]);
    },
    onError(error: any) {
      toast.error(error?.message);
    }
  });
  const removeCartMutation = useMutation({
    mutationFn: (cartId: string) => cartAPI.deleteSingleCart(cartId),
    onSuccess: ({ message }, cartId) => {
      const newCarts = carts.filter((item) => item._id !== cartId);
      setCarts(newCarts);
      toast.success(message);
    },
    onError(error: any) {
      toast.error(error?.message);
    }
  });
  const removeAllCartMutation = useMutation({
    mutationFn: () => cartAPI.deleteAllCart(),
    onSuccess: ({ message }) => {
      setCarts([]);
      toast.success(message);
    },
    onError(error: any) {
      toast.error(error?.message);
    }
  });
  const onChangeQuantity = (productId: string, quantity: number) => {
    addToCartMutation.mutate({ productId, quantity });
  };
  const totalBuyPrice = carts.reduce((prevTotal: number, currentTotal: ICart) => {
    return prevTotal + currentTotal.product.price * currentTotal.quantity;
  }, 0);
  const totalBuyPriceNotSale = carts.reduce((prevTotal: number, currentTotal: ICart) => {
    return prevTotal + currentTotal.product.oldPrice * currentTotal.quantity;
  }, 0);
  if (carts?.length === 0 && cartsOutOfStock?.length === 0) return <CartEmpty />;
  return (
    <div className="layout-container">
      <Helmet>
        <title>Giỏ hàng</title>
      </Helmet>
      <div className="hidden py-3 mt-8 bg-white lg:block px-9">
        <div className="flex text-center">
          <span className="w-20">Hình ảnh</span>
          <span className="w-[40%]">Sản phẩm</span>
          <span className="w-[25%]">Đơn giá</span>
          <span className="w-[25%]">Thao tác</span>
        </div>
      </div>
      {carts.length > 0 && (
        <div className="mt-4 bg-white lg:p-5">
          {carts.map(({ _id, product, quantity }) => (
            <div key={_id} className="flex items-center gap-3 p-4 my-3 border border-black017">
              <img alt={product.name} className="w-24 lg:w-20" src={product.image} />
              <div className="flex flex-col flex-1 md:flex-row">
                <Link className="md:w-[40%]" to={`${PATH.product}/${product._id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <div className="flex flex-col justify-between flex-1 gap-y-2 md:flex-row">
                  <div className="flex flex-wrap items-center flex-1 text-sm md:justify-center md:gap-x-4 gap-x-2">
                    <ProductPriceOld>{product.oldPrice}</ProductPriceOld>
                    <ProductPriceSale>{product.price}</ProductPriceSale>
                  </div>
                  <div className="flex flex-wrap items-center flex-1 text-sm md:justify-center md:gap-x-7 gap-x-2">
                    {product.stock ? (
                      <QuantityController
                        className="quantity-controller"
                        defaultQuantity={quantity}
                        onChangeValue={(value) => onChangeQuantity(product._id, value)}
                      />
                    ) : (
                      <span className="text-base text-redff4">Hết hàng</span>
                    )}
                    <button type="button" onClick={() => removeCartMutation.mutate(_id)}>
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* {cartsOutOfStock.length > 0 && (
        <div className="mt-4 bg-white lg:p-5">
          <h3>Danh Sách Sản Phẩm Hết Hàng</h3>
          {cartsOutOfStock?.map((cart: ICart) => (
            <CartOutOfStock key={cart._id} cartItem={cart} />
          ))}
        </div>
      )} */}
      <div className="flex flex-col justify-between px-5 py-6 mt-6 bg-white gap-y-4 lg:items-center lg:flex-row">
        <div>
          <div>
            Tổng ({carts?.length} sản phẩm):
            <ProductPriceSale className="ml-1 text-xl font-medium">
              {totalBuyPrice}
            </ProductPriceSale>
          </div>
          <div>
            Tiết kiệm:
            <ProductPriceSale className="ml-1">
              {totalBuyPriceNotSale - totalBuyPrice}
            </ProductPriceSale>
          </div>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => removeAllCartMutation.mutate()}>Xóa tất cả</Button>
          <Button primary to={PATH.checkout}>
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
