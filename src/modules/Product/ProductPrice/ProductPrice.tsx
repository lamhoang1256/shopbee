import { PriceOld } from "components/price";
import LabelSale from "modules/Common/LabelSale";
import { useCallback } from "react";
import ProductPriceSale from "modules/Product/ProductPriceSale";

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
      <PriceOld className="text-[#929292]">{oldPrice}</PriceOld>
      <ProductPriceSale className="lg:text-3xl">{price}</ProductPriceSale>
      <LabelSale>-{calcPercentSale()}%</LabelSale>
    </div>
  );
};

export default ProductPrice;
