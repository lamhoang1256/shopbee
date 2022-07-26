import { IconMinus, IconPlus } from "components/Icons";
import { useState } from "react";
import classNames from "utils/classNames";
import QuantityButton from "./QuantityButton";
import QuantityInput from "./QuantityInput";

interface QuantityControllerProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultQuantity?: number;
  onChangeValue?: (quantity: number) => void;
}

const QuantityController = ({
  className,
  defaultQuantity = 1,
  onChangeValue = () => {}
}: QuantityControllerProps) => {
  const [quantity, setQuantity] = useState<number>(defaultQuantity);
  const handleIncreaseQuantity = () => {
    setQuantity((prevState) => prevState + 1);
    if (onChangeValue) onChangeValue(quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity((prevState) => prevState - 1);
    if (onChangeValue) onChangeValue(quantity - 1);
  };
  const handleChangeQuantity = (countQuantity: number) => {
    setQuantity(() => countQuantity);
    if (onChangeValue) onChangeValue(countQuantity);
  };
  return (
    <div className={classNames("flex", className)}>
      <QuantityButton onClick={handleDecreaseQuantity}>
        <IconMinus />
      </QuantityButton>
      <QuantityInput value={quantity} handleChange={handleChangeQuantity} />
      <QuantityButton onClick={handleIncreaseQuantity}>
        <IconPlus />
      </QuantityButton>
    </div>
  );
};

export default QuantityController;
