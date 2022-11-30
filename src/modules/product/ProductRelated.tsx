import { IProduct } from "@types";
import { productAPI } from "apis";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductGrid from "./ProductGrid";

interface ProductRelatedProps {
  categoryId: string;
}

const ProductRelated = ({ categoryId }: ProductRelatedProps) => {
  const [relatedProduct, setRelatedProduct] = useState<IProduct[]>([]);
  useEffect(() => {
    const fetchRelatedProduct = async (params: { category: string }) => {
      try {
        const { data } = await productAPI.getAllProduct(params);
        setRelatedProduct(data.products);
      } catch (error) {
        toast.error(error?.message);
      }
    };
    fetchRelatedProduct({ category: categoryId });
  }, [categoryId]);

  if (relatedProduct.length === 0) return null;
  return (
    <>
      <h3 className="my-3 text-[#0000008a] text-base font-medium">SẢN PHẨM TƯƠNG TỰ</h3>
      <ProductGrid products={relatedProduct} />
    </>
  );
};

export default ProductRelated;
