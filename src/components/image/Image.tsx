import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";

interface ImageProps {
  src: string;
  to?: string;
  alt?: string;
  className?: string;
  imageError?: string;
}

const Image = ({
  to,
  src,
  imageError = "/images/no-image-avaliable.png",
  ...props
}: ImageProps) => {
  const [fallback, setFallback] = useState("");
  const handleErrorImage = () => setFallback(imageError);
  if (to) {
    return (
      <Link to={to} style={{ display: "block" }}>
        <LazyLoadImage
          effect='opacity'
          src={fallback || src}
          onError={handleErrorImage}
          {...props}
        />
      </Link>
    );
  }
  return (
    <LazyLoadImage src={fallback || src} effect='opacity' onError={handleErrorImage} {...props} />
  );
};

Image.defaultProps = {
  to: "",
  alt: "",
  className: "",
  imageError: "/images/no-image-avaliable.png",
};

export default Image;
