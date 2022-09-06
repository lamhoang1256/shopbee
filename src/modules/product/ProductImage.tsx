import { Image } from "components/image";
import classNames from "utils/className";

interface ProductImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const ProductImage = ({ src, className = "", alt = "product" }: ProductImageProps) => {
  return (
    <Image
      alt={alt}
      src={src}
      placeholderSrc='/images/shopbee-loading.png'
      className={classNames("aspect-square h-auto max-w-full w-[500px] bg-[#fafafa]", className)}
    />
  );
};

export default ProductImage;
