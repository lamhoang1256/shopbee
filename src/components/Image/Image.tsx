import { Link } from "react-router-dom";
import { LazyLoadImage, LazyLoadImageProps } from "react-lazy-load-image-component";
import { useState } from "react";

interface ImageProps extends LazyLoadImageProps {
  to?: string;
  imageError?: string;
}

const Image = ({ to = "", src, imageError = "/no-image-avaliable.png", ...props }: ImageProps) => {
  const [fallback, setFallback] = useState("");
  const handleErrorImage = () => setFallback(imageError);
  if (to) {
    return (
      <Link to={to} style={{ display: "block" }}>
        <LazyLoadImage
          effect="opacity"
          src={fallback || src}
          onError={handleErrorImage}
          {...props}
        />
      </Link>
    );
  }
  return (
    <LazyLoadImage src={fallback || src} effect="opacity" onError={handleErrorImage} {...props} />
  );
};

export default Image;
