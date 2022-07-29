import { path } from "constants/path";
import { ICart } from "interfaces/cart";
import { ProductImage, ProductPriceOld, ProductPriceSale, ProductTitle } from "modules/product";
import { formatVNDCurrency } from "utils/helper";

const PurchaseItem = ({ purchaseInfo }: { purchaseInfo: ICart }) => {
  return (
    <div className='p-5 mt-3 bg-white'>
      <div>Đang chờ xác nhận</div>
      <div className='flex my-3 py-5 border-b border-t border-[#ebebf0] items-center justify-between'>
        <div className='flex gap-3'>
          <ProductImage imageUrl={purchaseInfo?.product?.image} className='w-20 h-20' />
          <div>
            <ProductTitle className='text-sm' to={`${path.detail}/${purchaseInfo?.product?._id}`}>
              {purchaseInfo?.product?.name}
            </ProductTitle>
            <span>x{purchaseInfo?.quantity}</span>
          </div>
        </div>
        <div className='flex items-center gap-x-2'>
          <ProductPriceOld>{formatVNDCurrency(purchaseInfo?.product?.price)}</ProductPriceOld>
          <ProductPriceSale>{formatVNDCurrency(purchaseInfo?.product?.priceSale)}</ProductPriceSale>
        </div>
      </div>
      <div className='flex items-center justify-between mt-5'>
        <button type='button' className='p-2 border border-slate-200'>
          Xem chi tiết đơn
        </button>
        <h3>
          Tổng số tiền:{" "}
          <ProductPriceSale className='pl-1 text-2xl'>{formatVNDCurrency(100000)}</ProductPriceSale>
        </h3>
      </div>
    </div>
  );
};

export default PurchaseItem;
