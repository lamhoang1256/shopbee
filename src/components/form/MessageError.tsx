import { HTMLAttributes } from "react";
import classNames from "utils/className";

interface MessageErrorProps extends HTMLAttributes<HTMLSpanElement> {}

const MessageError = ({ children, className }: MessageErrorProps) => {
  return (
    <span className={classNames("text-redff4 text-xs font-medium", className)}>{children}</span>
  );
};

export default MessageError;
