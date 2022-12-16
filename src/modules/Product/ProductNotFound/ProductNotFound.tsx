const ProductNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2 h-[400px]">
      <img src="/product-notfound.png" alt="not found product" />
      <span className="text-[#bababa]">Không tìm thấy sản phẩm</span>
    </div>
  );
};

export default ProductNotFound;
