import { Image } from "components/image";
import classNames from "utils/className";

interface ProductImageProps {
  imageUrl: string;
  className?: string;
}

const ProductImage = ({ imageUrl, className }: ProductImageProps) => {
  return <Image src={imageUrl} alt='product' className={classNames("aspect-square", className)} />;
};

ProductImage.defaultProps = {
  className: "",
};

export default ProductImage;
