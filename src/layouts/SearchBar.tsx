import { IconSearch } from "components/icons";

const SearchBar = () => {
  return (
    <form className='flex items-center justify-between max-w-[860px] flex-1 px-3 bg-white rounded'>
      <input
        type='text'
        className='flex-1 text-sm outline-none h-11'
        placeholder='Nhập để tìm kiếm sản phẩm'
      />
      <button type='submit' className='bg-[#fb6445] h-9 px-5 text-white rounded'>
        <IconSearch />
      </button>
    </form>
  );
};

export default SearchBar;
