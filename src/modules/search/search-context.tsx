import { IPagination, ISearchParams } from "interfaces";
import { createContext, useContext } from "react";

interface ISearchContext {
  searchPageParams: ISearchParams;
  pagination: IPagination;
  handleSearch: (params: any) => void;
}
interface SearchProviderProps {
  value: ISearchContext;
  children: React.ReactNode;
}

const initialValueSearchContext = {} as ISearchContext;
const SearchContext = createContext<ISearchContext>(initialValueSearchContext);
const SearchProvider = ({ value, children, ...props }: SearchProviderProps) => (
  <SearchContext.Provider value={value} {...props}>
    {children}
  </SearchContext.Provider>
);
const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (typeof context === "undefined")
    throw new Error("useSearchContext must be used within SearchProvider");
  return context;
};

export { SearchProvider, useSearchContext };
