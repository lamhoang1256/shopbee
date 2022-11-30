import { useDropdown } from "./dropdown-context";

interface ListProps {
  children: React.ReactNode;
}

const List = ({ children }: ListProps) => {
  const { show } = useDropdown();
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {show && (
        <div className="absolute left-0 z-20 w-full bg-white rounded-sm shadow1 top-full max-h-[300px] overflow-y-auto">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
