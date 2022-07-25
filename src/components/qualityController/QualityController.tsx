import { IconMinus, IconPlus } from "components/icons";
import classNames from "utils/className";
import QualityButton from "./QualityButton";
import QualityInput from "./QualityInput";

interface QualityControllerProps {
  className?: string;
}

const QualityController = ({ className }: QualityControllerProps) => {
  return (
    <div className={classNames("flex", className)}>
      <QualityButton>
        <IconMinus />
      </QualityButton>
      <QualityInput />
      <QualityButton>
        <IconPlus />
      </QualityButton>
    </div>
  );
};

QualityController.defaultProps = {
  className: "",
};

export default QualityController;
