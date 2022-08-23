import { IProduct } from "@types";
import { cartAPI } from "apis";
import { Button, ButtonOutline } from "components/button";
import { IconCartOutline } from "components/icons";
import { QuantityController } from "components/quantityController";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";

interface ProductActionProps {
  product: IProduct;
}

const ProductAction = ({ product }: ProductActionProps) => {
  const { id = "" } = useParams();
  const { setCart, carts } = useStore((state) => state);
  const [quantityAdd, setQuantityAdd] = useState(1);

  const handleChangeQuantity = (value: number) => setQuantityAdd(() => value);
  const handleAddToCart = async () => {
    let quantity = quantityAdd;
    const existItem = carts?.find((cart) => cart.product._id === id);
    if (existItem) {
      quantity = existItem.quantity + quantityAdd;
      existItem.quantity = quantity;
    }
    try {
      const { message, data } = await cartAPI.addToCart({ productId: id, quantity });
      if (existItem) {
        const cartsRemoveExist = carts?.filter((cart) => cart?._id !== existItem?._id);
        setCart([...cartsRemoveExist, existItem]);
      } else {
        setCart([...carts, data]);
      }
      toast.success(message);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <>
      <div className='flex flex-col mt-6 gap-y-2 md:items-center md:flex-row gap-x-4'>
        <span>Số lượng</span>
        <QuantityController onChangeValue={handleChangeQuantity} />
        <span>{product.stock} sản phẩm có sẵn</span>
      </div>
      {product.stock > 0 ? (
        <div className='flex flex-col gap-2 mt-4 md:flex-row md:items-center'>
          <ButtonOutline className='h-10 lg:h-12' onClick={handleAddToCart}>
            <IconCartOutline className='w-4 h-4 mr-2' />
            <span className='text-sm'>Thêm vào giỏ hàng</span>
          </ButtonOutline>
          <Button primary className='h-10 rounded-sm lg:h-12'>
            Mua ngay
          </Button>
        </div>
      ) : (
        <span className='block mt-4 text-lg text-redff4'>Sản phẩm đã hết hàng</span>
      )}
    </>
  );
};

export default ProductAction;
