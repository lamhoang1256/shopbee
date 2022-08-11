import { useNavigate } from "react-router-dom";
import { Button } from "components/button";
import { path } from "constants/path";

const SearchRemoveAll = () => {
  const navigate = useNavigate();
  return (
    <div className='border-t-2 pb-3 mt-6 border-[#0000000d]'>
      <Button
        primary
        className='w-full py-[6px] mt-4 rounded-sm'
        onClick={() => navigate(path.search)}
      >
        XÓA TẤT CẢ
      </Button>
    </div>
  );
};

export default SearchRemoveAll;
