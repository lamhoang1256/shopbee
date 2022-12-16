/* eslint-disable react/no-danger */
interface ProductDescProps {
  description: string;
}

const ProductDesc = ({ description }: ProductDescProps) => {
  return (
    <div className="mt-4 section-white">
      <div className="section-gray">CHI TIẾT SẢN PHẨM</div>
      <div
        className="mt-3 leading-6 text-[#242424] product-desc"
        dangerouslySetInnerHTML={{ __html: description || "" }}
      />
    </div>
  );
};

export default ProductDesc;
