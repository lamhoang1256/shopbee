import { IconUp } from "components/icons";
import { useEffect, useState } from "react";
import classNames from "utils/className";

const ButtonGoToTop = () => {
  const [isShow, setIsShow] = useState(false);
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
  const handleGoToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
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
