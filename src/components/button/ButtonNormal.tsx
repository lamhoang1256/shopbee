import classNames from "utils/className";

interface ButtonNormalProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonNormal = ({ children, className }: ButtonNormalProps) => {
  return (
    <button type='button' className={classNames("py-2 px-4 border border-[#00000017]", className)}>
      {children}
    </button>
  );
};

ButtonNormal.defaultProps = {
  className: "",
};

export default ButtonNormal;
