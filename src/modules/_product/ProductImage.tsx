import Image from "components/Image";
import classNames from "utils/classNames";

interface ProductImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const ProductImage = ({
  src,
  className = "w-[500px] h-auto ",
  alt = "product"
}: ProductImageProps) => {
  return (
    <Image
      alt={alt}
      src={src}
      placeholderSrc="/card-loading.png"
      className={classNames("aspect-square max-w-full bg-[#fafafa]", className)}
    />
  );
};

export default ProductImage;
