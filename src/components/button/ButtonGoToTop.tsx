import { IconUp } from "components/icons";
import { useEffect, useState } from "react";
import classNames from "utils/className";
import { scrollTo } from "utils/helper";

const ButtonGoToTop = () => {
  const [isShow, setIsShow] = useState(false);
  const handleGoToTop = () => scrollTo();
  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <button
      type='button'
      onClick={() => handleGoToTop()}
      className={classNames(
        `fixed bottom-10 right-5 z-50 w-10 h-10 bg-orangeee4 text-white flex items-center justify-center rounded-full`,
        !isShow && "hidden",
      )}
    >
      <IconUp />
    </button>
  );
};

export default ButtonGoToTop;
