import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ICategory } from "@types";
import { categoryAPI } from "apis";
import { path } from "constants/path";
import { IconMenu } from "components/icons";

const SearchByCategory = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchAllCategory = async () => {
    try {
      const { data } = await categoryAPI.getAllCategory();
      setCategories(data);
    } catch (error) {
      console.log(`Failed to fetch categories:`, error);
    }
  };
  useEffect(() => {
    fetchAllCategory();
  }, []);

  return (
    <>
      <div className='search-catelog-header'>
        <IconMenu />
        <h3>Tất cả danh mục</h3>
      </div>
      <ul className='mt-2'>
        {categories.map(({ _id, name }) => (
          <li className='px-3 py-[6px]' key={_id}>
            <Link
              to={`${path.search}?category=${_id}`}
              className={categoryId === _id ? "text-orangeee4" : "text-[#000000cc] line-clamp-1"}
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
