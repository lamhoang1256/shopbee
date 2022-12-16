import { productAPI } from "apis";
import ProductList from "modules/Product/ProductList";
import { useQuery } from "react-query";

interface ProductRelatedProps {
  categoryId: string;
}

const ProductRelated = ({ categoryId }: ProductRelatedProps) => {
  const { data: productsData } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => productAPI.getAllProduct({ category: categoryId }),
    staleTime: 5 * 60 * 1000
  });
  if (!productsData || productsData?.data?.products.length === 0) return null;
  return (
    <div>
      <h3 className="my-3 text-[#0000008a] text-base font-medium">SẢN PHẨM TƯƠNG TỰ</h3>
      <ProductList products={productsData?.data?.products} />
    </div>
  );
};

export default ProductRelated;
