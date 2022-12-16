import React from "react";

interface ProductGridProps {
  children: React.ReactNode;
}

const ProductGrid = ({ children }: ProductGridProps) => {
  return <div className="mt-3 product-grid">{children}</div>;
};

export default ProductGrid;
