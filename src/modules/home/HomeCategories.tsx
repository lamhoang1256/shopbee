import { PATH } from "constants/path";
import useFetchCategories from "hooks/useFetchCategories";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const HomeCategories = () => {
  const { categories, loading } = useFetchCategories();
  return (
    <div className='layout-container mt-7'>
      <div className='py-3 my-4 bg-white'>
        <h3 className='px-5 text-[#0000008a] text-base'>DANH MỤC</h3>
        <div className='mt-3 home-categories'>
          {loading &&
            Array(10)
              .fill(0)
              .map(() => (
                <div
                  key={uuidv4()}
                  className='p-1 flex items-center justify-center w-[120px] h-[130px]'
                >
                  <img src='/images/logo-gray.png' alt='banner' className='w-10 h-w-10' />
                </div>
              ))}
          {!loading &&
            categories?.map(({ _id, image, name, slug }) => (
              <Link
                key={_id}
                to={`${PATH.search}?category=${_id}`}
                className='flex flex-col items-center p-1 transition-all duration-300 bg-white hover:text-orangeee4 hover:opacity-80'
              >
                <img src={image} alt={slug} className='w-[88px] h-[88px]' />
                <span className='text-center'>{name}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCategories;
