interface ProductDescProps {
  description: string;
}

const ProductDesc = ({ description }: ProductDescProps) => {
  return (
    <div
      className='mt-3 leading-6 text-[#242424]'
      dangerouslySetInnerHTML={{
        __html: description || "",
      }}
    />
  );
};

export default ProductDesc;
