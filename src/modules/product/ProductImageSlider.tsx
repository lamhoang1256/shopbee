import { useState } from "react";
import classNames from "utils/className";

const ProductImageSlider = () => {
  const [images] = useState([
    "https://api-ecom.duthanhduoc.com/images/a7fb7a18-743a-42bb-bead-36370c1d1aba.jpg",
    "https://api-ecom.duthanhduoc.com/images/b09ff60d-c6bd-4d3a-b778-0fc2708a65fb.jpg",
    "https://api-ecom.duthanhduoc.com/images/a7fb7a18-743a-42bb-bead-36370c1d1aba.jpg",
    "https://api-ecom.duthanhduoc.com/images/b09ff60d-c6bd-4d3a-b778-0fc2708a65fb.jpg",
  ]);
  const [indexActive, setIndexActive] = useState(0);
  const handleChooseActive = (index: number) => setIndexActive(index);
  return (
    <>
      <img src={images[indexActive]} alt='product-active' />
      <div className='relative flex my-1 -mx-1 overflow-hidden'>
        {images.map((image, index) => (
          <img
            src={image}
            alt='product'
            className={classNames(
              "inline-block object-cover w-1/5 border-2 aspect-square transition-all duration-200 cursor-pointer p-1",
              indexActive === index ? " border-orangeee4" : "border-transparent",
            )}
            onMouseEnter={() => handleChooseActive(index)}
          />
        ))}
      </div>
    </>
  );
};

export default ProductImageSlider;
