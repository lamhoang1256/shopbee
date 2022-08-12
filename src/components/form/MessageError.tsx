import classNames from "utils/className";

interface MessageErrorProps {
  children: React.ReactNode;
  className?: string;
}

const MessageError = ({ children, className }: MessageErrorProps) => {
  return (
    <span className={classNames("text-redff4 text-xs font-medium", className)}>{children}</span>
  );
};

MessageError.defaultProps = {
  className: "",
};

export default MessageError;
