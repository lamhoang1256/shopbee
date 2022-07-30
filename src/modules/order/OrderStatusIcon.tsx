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
        "mx-auto flex items-center justify-center rounded-full w-14 h-14 border-4 bg-white",
        stylesActive,
      )}
    >
      {children}
    </div>
  );
};

export default OrderStatusIcon;
