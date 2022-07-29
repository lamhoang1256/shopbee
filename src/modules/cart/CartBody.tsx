interface CartBodyProps {
  children: React.ReactNode;
}

const CartBody = ({ children }: CartBodyProps) => {
  return <div className='mt-4 bg-white lg:p-5'>{children}</div>;
};

export default CartBody;
