import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface IDropdownContext {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
}
interface IDropdownProviderProps {
  children: React.ReactNode;
}

const DropdownContext = createContext<IDropdownContext>({} as IDropdownContext);
const DropdownProvider = ({ children, ...props }: IDropdownProviderProps) => {
  const [show, setShow] = useState(false);
  const toggle = useCallback(() => {
    setShow(!show);
  }, [show]);
  const values = useMemo(() => ({ show, setShow, toggle }), [show, setShow, toggle]);
  return (
    <DropdownContext.Provider value={values} {...props}>
      {children}
    </DropdownContext.Provider>
  );
};
function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined")
    throw new Error("useDropdown must be used within DropdownProvider");
  return context;
}
export { useDropdown, DropdownProvider };
