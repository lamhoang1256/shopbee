import { Sidebar } from "layouts";
import SearchByCategory from "./SearchByCategory";
import SearchByRating from "./SearchByRating";
import SearchRangePrice from "./SearchRangePrice";
import SearchRemoveAll from "./SearchRemoveAll";

const SearchAside = () => {
  return (
    <Sidebar labelOpenSidebar="Bộ lọc">
      <SearchByCategory />
      <SearchRangePrice />
      <SearchByRating />
      <SearchRemoveAll />
    </Sidebar>
  );
};

export default SearchAside;
