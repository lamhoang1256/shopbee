import { categoryAPI } from "apis";
import { IconMenu } from "components/Icons";
import { PATH } from "constants/path";
import useQueryParams from "hooks/useQueryParams";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const SearchByCategory = () => {
  const { queryParams } = useQueryParams();
  const { categoryId = "" } = queryParams;
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryAPI.getAllCategory(),
    staleTime: 5 * 60 * 1000
  });
  return (
    <>
      <div className="search-category">
        <IconMenu />
        <h3>Tất cả danh mục</h3>
      </div>
      <ul className="mt-2">
        {categoriesData?.data.map((category) => {
          const styles = categoryId === category._id ? "text-orangeee4" : "text-[#000000cc]";
          return (
            <li className="px-3 py-[6px] line-clamp-1" key={category._id}>
              <Link to={`${PATH.search}?category=${category._id}`} className={styles}>
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default SearchByCategory;
