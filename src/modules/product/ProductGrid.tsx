import { IProduct } from "@types";
import { v4 as uuidv4 } from "uuid";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductGridProps {
  products: IProduct[];
  loading?: boolean;
}

const ProductGrid = ({ products, loading }: ProductGridProps) => {
  return (
    <div className="mt-3 product-grid">
      {loading
        ? Array(12)
            .fill(0)
            .map(() => <ProductCardSkeleton key={uuidv4()} />)
        : products.map((product) => <ProductCard product={product} key={product._id} />)}
    </div>
  );
};

ProductGrid.defaultProps = {
  loading: false
};

export default ProductGrid;
