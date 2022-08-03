import { configAPI } from "apis/configAPI";
import { IconMenu } from "components/icons";
import { path } from "constants/path";
import { ICategory } from "interfaces";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchByCategory = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const fetchAllCategory = async () => {
    try {
      const { data } = await configAPI.getAllCategory();
      setCategories(data);
    } catch (error) {
      console.log(error);
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
            <Link to={`${path.search}?category=${_id}`} className='text-[#000000cc] line-clamp-1'>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchByCategory;
