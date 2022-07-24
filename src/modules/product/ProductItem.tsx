import { IProduct } from "interfaces";
import { ProductMeta, ProductName, ProductPriceOld, ProductPriceSale } from "modules/product";
import { formatVNDCurrency } from "utils/helper";

interface ProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className='bg-white shadow-product' key={product._id}>
      <img src={product.image} className='aspect-square' alt='product' />
      <div className='p-[6px]'>
        <ProductName>{product.name}</ProductName>
        <div className='flex items-baseline my-1 gap-x-2'>
          <ProductPriceOld>{formatVNDCurrency(product.price)}</ProductPriceOld>
          <ProductPriceSale>{formatVNDCurrency(product.salePrice)}</ProductPriceSale>
        </div>
        <ProductMeta sold={product.sold} rating={product.rating} />
      </div>
    </div>
  );
};

export default ProductItem;
