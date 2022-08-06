import { v4 as uuidv4 } from "uuid";
import { configAPI } from "apis/configAPI";
import { path } from "constants/path";
import { ICategory } from "interfaces";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeCategories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const fetchHomeCategories = async () => {
    setLoading(true);
    try {
      const { data } = await configAPI.getAllCategory();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHomeCategories();
  }, []);

  if (loading) {
    return (
      <div className='layout-container mt-7'>
        <div className='py-3 my-4 bg-white'>
          <h3 className='px-5 text-[#0000008a] text-base'>DANH MỤC</h3>
          <div className='mt-3 home-categories'>
            {Array(12)
              .fill(0)
              .map(() => (
                <div
                  key={uuidv4()}
                  className='p-1 flex items-center justify-center w-[120px] h-[130px]'
                >
                  <img src='/images/img-loading.png' alt='banner' className='w-10 h-w-10' />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='layout-container'>
      <div className='py-3 my-4 bg-white'>
        <h3 className='px-5 text-[#0000008a] text-base'>DANH MỤC</h3>
        <div className='mt-3 home-categories'>
          {categories?.map(({ _id, thumb, name }) => (
            <Link
              key={_id}
              to={`${path.search}?category=${_id}`}
              className='flex flex-col items-center p-1 transition-all duration-300 bg-white hover:text-orangeee4 hover:opacity-80'
            >
              <img src={thumb} className='w-[88px] h-[88px]' alt='category' />
              <span className='text-center'>{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCategories;
