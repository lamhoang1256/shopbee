import { IPayloadAddToCart } from "@types";
import { cartAPI } from "apis";
import ButtonOutline from "components/ButtonOutline";
import { IconCartOutline } from "components/Icons";
import QuantityController from "components/QuantityController";
import { useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";

interface ProductQuantityProps {
  stock: number;
}

const ProductQuantity = ({ stock }: ProductQuantityProps) => {
  const { id = "" } = useParams();
  const { setCarts, carts, currentUser } = useStore((state) => state);
  const addToCartMutation = useMutation({
    mutationFn: (payload: IPayloadAddToCart) => cartAPI.addToCart(payload)
  });
  const [quantityAdd, setQuantityAdd] = useState(1);
  const handleChangeQuantity = (quantity: number) => setQuantityAdd(() => quantity);
  const handleAddToCart = async () => {
    if (quantityAdd < 1) return;
    if (!currentUser || !currentUser._id) {
      toast.error("Vui lòng đăng nhập để thêm giỏ hàng!");
      return;
    }
    let quantity = quantityAdd;
    const cartExist = carts?.find((cart) => cart.product._id === id);
    if (cartExist) {
      quantity = cartExist.quantity + quantityAdd;
      cartExist.quantity = quantity;
    }
    const payload = { productId: id, quantity };
    addToCartMutation.mutate(payload, {
      onSuccess({ message, data }) {
        if (cartExist) {
          const cartsRemoveExist = carts?.filter((cart) => cart?._id !== cartExist?._id);
          setCarts([...cartsRemoveExist, cartExist]);
        } else setCarts([...carts, data]);
        toast.success(message);
      },
      onError(error: any) {
        toast.error(error?.message);
      }
    });
  };
  return (
    <>
      <div className="flex flex-col gap-y-2 md:items-center md:flex-row gap-x-4">
        <span>Số lượng</span>
        <QuantityController defaultQuantity={quantityAdd} onChangeValue={handleChangeQuantity} />
        <span>{stock} sản phẩm có sẵn</span>
      </div>
      <div className="flex flex-col gap-2 mt-6 md:flex-row md:items-center">
        <ButtonOutline
          primary
          className="flex items-center h-10 w-max lg:h-12"
          onClick={handleAddToCart}
        >
          <IconCartOutline className="w-4 h-4 mr-2" />
          <span className="text-sm">Thêm vào giỏ hàng</span>
        </ButtonOutline>
      </div>
    </>
  );
};

export default ProductQuantity;
