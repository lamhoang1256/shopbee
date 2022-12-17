import { Sidebar } from "layouts";
import SearchByCategory from "modules/Search/SearchByCategory";
import SearchByRating from "modules/Search/SearchByRating";
import SearchByPrice from "modules/Search/SearchByPrice";
import SearchClear from "modules/Search/SearchClear";

const SearchAside = () => {
  return (
    <Sidebar content="Bộ lọc">
      <SearchByCategory />
      <SearchByPrice />
      <SearchByRating />
      <SearchClear />
    </Sidebar>
  );
};

export default SearchAside;
