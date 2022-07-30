import classNames from "utils/className";

interface OrderStatusIconProps {
  children: React.ReactNode;
  active: boolean;
}

const OrderStatusIcon = ({ children, active }: OrderStatusIconProps) => {
  const stylesActive = active
    ? "border-[#2dc258] text-[#2dc258]"
    : " border-[#dbdbdb] text-[#dbdbdb]";
  return (
    <div
      className={classNames(
        "relative z-20 flex items-center justify-center rounded-full md:w-14 md:h-14 w-12 h-12 border-4 bg-white",
        stylesActive,
      )}
    >
      {children}
    </div>
  );
};

export default OrderStatusIcon;
