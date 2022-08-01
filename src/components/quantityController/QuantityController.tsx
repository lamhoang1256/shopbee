import { IconMinus, IconPlus } from "components/icons";
import { useState } from "react";
import classNames from "utils/className";
import QuantityButton from "./QuantityButton";
import QuantityInput from "./QuantityInput";

interface QuantityControllerProps {
  className?: string;
  defaultQuantity?: number;
  onChangeValue?: (quantity: number) => void;
}

const QuantityController = ({
  className,
  defaultQuantity = 1,
  onChangeValue,
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
  const handleChangeQuantity = (value: string) => {
    setQuantity(() => Number(value));
    if (onChangeValue) onChangeValue(Number(value));
  };
  return (
    <div className={classNames("flex", className)}>
      <QuantityButton onClick={handleDecreaseQuantity}>
        <IconMinus />
      </QuantityButton>
      <QuantityInput value={quantity} onChange={handleChangeQuantity} />
      <QuantityButton onClick={handleIncreaseQuantity}>
        <IconPlus />
      </QuantityButton>
    </div>
  );
};

QuantityController.defaultProps = {
  className: "",
  defaultQuantity: 1,
  onChangeValue: () => {},
};

export default QuantityController;