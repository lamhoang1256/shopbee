import { categoryAPI } from "apis";
import { PATH } from "constants/path";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const HomeCategories = () => {
  const { isLoading, data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryAPI.getAllCategory(),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000
  });
  return (
    <div className="layout-container mt-7">
      <div className="py-3 my-4 bg-white">
        <h2 className="px-5 text-[#0000008a] text-base">DANH MỤC</h2>
        <div className="mt-3 home-categories">
          {isLoading &&
            Array(10)
              .fill(0)
              .map(() => (
                <div
                  key={uuidv4()}
                  className="p-1 flex items-center justify-center w-[120px] h-[130px]"
                >
                  <img src="/logo-gray.png" alt="loading" className="w-10 h-w-10" />
                </div>
              ))}
          {!isLoading &&
            categoriesData?.data?.map(({ _id, image, name, slug }) => (
              <Link
                key={_id}
                to={`${PATH.search}?category=${_id}`}
                className="flex flex-col items-center p-1 transition-all duration-300 bg-white hover:text-orangeee4 hover:opacity-80"
              >
                <img src={image} alt={slug} className="w-[88px] h-[88px]" />
                <span className="text-center">{name}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCategories;
