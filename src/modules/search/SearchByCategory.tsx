import { IconMenu } from "components/Icons";
import { PATH } from "constants/path";
import useFetchCategories from "hooks/useFetchCategories";
import { Link, useSearchParams } from "react-router-dom";

const SearchByCategory = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const { categories } = useFetchCategories();
  return (
    <>
      <div className="search-catelog-header">
        <IconMenu />
        <h3>Tất cả danh mục</h3>
      </div>
      <ul className="mt-2">
        {categories.map(({ _id, name }) => (
          <li className="px-3 py-[6px] line-clamp-1" key={_id}>
            <Link
              to={`${PATH.search}?category=${_id}`}
              className={categoryId === _id ? "text-orangeee4" : "text-[#000000cc]"}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchByCategory;
