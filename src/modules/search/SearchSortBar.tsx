import { Button } from "components/button";
import ButtonPagination from "components/button/ButtonPagination";
import { IconNext, IconPrev } from "components/icons";

const SearchSortBar = () => {
  return (
    <div className='bg-[#00000008] flex items-center justify-between whitespace-nowrap p-3 overflow-auto gap-x-8'>
      <div className='flex items-center gap-x-3 '>
        <span>Sắp xếp theo</span>
        <Button primary className='py-0 rounded-sm h-9'>
          Phổ biến
        </Button>
        <Button className='py-0 bg-white rounded-sm h-9'>Mới nhất</Button>
        <Button className='py-0 bg-white rounded-sm h-9'>Bán chạy</Button>
        <select
          name='sortPrice'
          id='sortPrice'
          className='h-9 py-0 px-2 border border-[#00000017] outline-none'
        >
          <option>Giá</option>
          <option value='low'>Giá: Thấp đến Cao</option>
          <option value='hight'>Giá: Cao đến Thấp</option>
        </select>
      </div>
      <div className='flex items-center'>
        <div className='mr-3'>
          <span className='text-orangeee4'>1</span>
          <span>/2</span>
        </div>
        <ButtonPagination primary>
          <IconPrev className='w-3 h-3' />
        </ButtonPagination>
        <ButtonPagination>
          <IconNext className='w-3 h-3' />
        </ButtonPagination>
      </div>
    </div>
  );
};

export default SearchSortBar;
