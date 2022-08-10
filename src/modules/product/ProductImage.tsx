import { noProductFound } from "constants/global";
import { useState } from "react";
import classNames from "utils/className";

interface ProductImageProps {
  imageUrl: string;
  className?: string;
}

const ProductImage = ({ imageUrl, className }: ProductImageProps) => {
  const [src, setSrc] = useState(imageUrl);
  const handleImageError = () => {
    setSrc(noProductFound);
  };
  return (
    <img
      src={src}
      alt='product'
      className={classNames("aspect-square", className)}
      onError={handleImageError}
    />
  );
};

ProductImage.defaultProps = {
  className: "",
};

export default ProductImage;
