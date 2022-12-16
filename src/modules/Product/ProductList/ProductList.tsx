import { IProduct } from "@types";
import ProductGrid from "modules/Product/ProductGrid";
import ProductCard from "modules/Product/ProductCard";

interface ProductListProps {
  products: IProduct[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </ProductGrid>
  );
};

export default ProductList;
