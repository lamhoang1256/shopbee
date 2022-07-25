interface ProductImageProps {
  imageUrl: string;
}

const ProductImage = ({ imageUrl }: ProductImageProps) => {
  return <img src={imageUrl} className='aspect-square' alt='product' />;
};

export default ProductImage;
