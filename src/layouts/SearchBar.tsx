import { IconSearch } from "components/icons";
import { path } from "constants/path";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const handleSearchWithKeyword = (e: any) => {
    e.preventDefault();
    navigate(`${path.search}?name=${keyword}`);
  };

  return (
    <form
      onSubmit={handleSearchWithKeyword}
      className='flex items-center justify-between max-w-[860px] flex-1 px-2 lg:px-3 bg-white rounded'
    >
      <input
        type='text'
        className='flex-1 text-sm outline-none h-11'
        placeholder='Tìm kiếm sản phẩm'
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type='submit' className='bg-[#fb6445] h-9 px-3 lg:px-5 text-white rounded'>
        <IconSearch />
      </button>
    </form>
  );
};

export default SearchBar;
