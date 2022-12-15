import ProductGrid from "modules/Product/ProductGrid";
import { v4 as uuidv4 } from "uuid";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductListSekeletonProps {
  count?: number;
}

const ProductListSekeleton = ({ count = 12 }: ProductListSekeletonProps) => {
  return (
    <ProductGrid>
      {Array(count)
        .fill(0)
        .map(() => (
          <ProductCardSkeleton key={uuidv4()} />
        ))}
    </ProductGrid>
  );
};

export default ProductListSekeleton;
