import { QuantityController } from "components/_quantityController";
import { ProductAddToCart } from "modules/_product";
import { useState } from "react";

interface ProductQuantityProps {
  stock: number;
}

const ProductQuantity = ({ stock }: ProductQuantityProps) => {
  const [quantityAdd, setQuantityAdd] = useState(1);
  const handleChangeQuantity = (quantity: number) => setQuantityAdd(() => quantity);
  return (
    <>
      <div className="flex flex-col gap-y-2 md:items-center md:flex-row gap-x-4">
        <span>Số lượng</span>
        <QuantityController defaultQuantity={quantityAdd} onChangeValue={handleChangeQuantity} />
        <span>{stock} sản phẩm có sẵn</span>
      </div>
      <ProductAddToCart stock={stock} quantityAdd={quantityAdd} />
    </>
  );
};

export default ProductQuantity;
