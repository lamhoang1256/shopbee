import Image from "components/Image";

const ProductCardSkeleton = () => {
  return (
    <div className="transition-all rounded overflow-hidden duration-300 border bg-white shadow-product-card hover:-translate-y-[3px] border-transparent hover:shadow-product-card-hover">
      <Image
        alt="product-loading"
        src="/card-loading.png"
        placeholderSrc="/card-loading.png"
        className="aspect-square h-auto max-w-full w-[500px] bg-[#fafafa]"
      />
      <div className="p-2 pb-4">
        <div className="bg-[#fafafa] h-8 w-full" />
        <div className="bg-[#fafafa] h-5 mt-2 w-full" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
