interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <textarea
      rows={5}
      className={`border-[#00000024] focus:border-[#0000008a] border mt-6 p-3 w-full outline-none resize-none rounded ${className}`}
      {...props}
    />
  );
};

export default Textarea;
