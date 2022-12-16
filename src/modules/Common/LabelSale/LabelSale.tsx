import React from "react";

interface LabelSaleProps {
  children: React.ReactNode;
}

const LabelSale = ({ children }: LabelSaleProps) => {
  return (
    <span className="text-xs w-11 rounded-sm px-1 py-[2px] text-redff4 bg-[#fff0f1] border border-redff4">
      {children}
    </span>
  );
};

export default LabelSale;
