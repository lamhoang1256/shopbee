import LabelSale from "modules/Common/LabelSale";
import { ProductPriceOld, ProductPriceSale } from "modules/Product/ProductPrice";
import { useCallback } from "react";

interface ProductPriceProps {
  oldPrice: number;
  price: number;
}

const ProductPrice = ({ oldPrice, price }: ProductPriceProps) => {
  const calcPercentSale = useCallback(() => {
    return Math.ceil(100 - (price / oldPrice) * 100);
  }, [oldPrice, price]);
  return (
    <div className="flex flex-col-reverse section-gray md:flex-row md:items-center gap-x-3">
      <ProductPriceOld className="text-[#929292]">{oldPrice}</ProductPriceOld>
      <ProductPriceSale className="lg:text-3xl">{price}</ProductPriceSale>
      <LabelSale>-{calcPercentSale()}%</LabelSale>
    </div>
  );
};

export default ProductPrice;
