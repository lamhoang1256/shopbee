import classNames from "utils/className";

interface OrderStatusBarProps {
  widthActive: string;
}

const OrderStatusBar = ({ widthActive }: OrderStatusBarProps) => {
  return (
    <div
      className={classNames(
        "hidden md:block absolute top-[28px] w-3/4 left-1/2 -translate-x-1/2 h-1 bg-[#dbdbdb] after:absolute after:left-0 after:z-10 after:h-1 after:bg-[#2dc258]",
        widthActive,
      )}
    />
  );
};

export default OrderStatusBar;
