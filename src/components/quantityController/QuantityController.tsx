import { IconMinus, IconPlus } from "components/icons";
import { useState } from "react";
import classNames from "utils/className";
import QuantityButton from "./QuantityButton";
import QuantityInput from "./QuantityInput";

interface QuantityControllerProps {
  className?: string;
}

const QuantityController = ({ className }: QuantityControllerProps) => {
  const [quantity, setQuantity] = useState(1);
  const handleIncreaseQuantity = () => {
    setQuantity((prevState) => prevState + 1);
  };
  const handleDecreaseQuantity = () => {
    setQuantity((prevState) => prevState - 1);
  };
  const handleChangeQuantity = (value: string) => {
    setQuantity(() => Number(value));
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
};

export default QuantityController;
