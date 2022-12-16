import { useState } from "react";
import classNames from "utils/classNames";

interface ProductImageSliderProps {
  images: string[];
  productName: string;
}

const ProductImageSlider = ({ images, productName }: ProductImageSliderProps) => {
  const [indexActive, setIndexActive] = useState(0);
  const handleChooseActive = (index: number) => setIndexActive(index);
  return (
    <div className="flex-shrink-0 lg:w-[400px]">
      <img src={images[indexActive]} alt="product-active" />
      <div className="relative flex my-1 -mx-1 overflow-hidden">
        {images.map((image, index) => (
          <img
            src={image}
            key={image}
            alt={`${productName}-${index}`}
            className={classNames(
              "inline-block object-cover w-1/5 border-2 aspect-square transition-all duration-200 cursor-pointer p-1",
              indexActive === index ? " border-orangeee4" : "border-transparent"
            )}
            onMouseEnter={() => handleChooseActive(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageSlider;
