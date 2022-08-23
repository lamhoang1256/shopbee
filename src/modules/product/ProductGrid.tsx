import { IProduct } from "@types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: IProduct[];
  title?: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  return (
    <div className='mt-3'>
      {title && <h3 className='mb-3 text-[#0000008a] text-base font-medium'>{title}</h3>}
      <div className='product-grid'>
        {products?.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

ProductGrid.defaultProps = {
  title: "",
};

export default ProductGrid;
