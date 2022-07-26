import classNames from "utils/className";

interface ProductImageProps {
  imageUrl: string;
  className?: string;
}

const ProductImage = ({ imageUrl, className }: ProductImageProps) => {
  return <img src={imageUrl} className={classNames("aspect-square", className)} alt='product' />;
};

ProductImage.defaultProps = {
  className: "",
};

export default ProductImage;
