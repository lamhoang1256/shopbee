import { IconNext, IconPrev } from "components/icons";

const Pagination = () => {
  return (
    <div className='flex gap-x-3 text-[#00000066] justify-center items-center my-8'>
      <button type='button'>
        <IconPrev />
      </button>
      <button type='button' className='text-lg font-medium w-9 h-7'>
        1
      </button>
      <button
        type='button'
        className='text-lg font-medium text-white rounded-sm w-9 h-7 bg-orangeee4'
      >
        2
      </button>
      <button type='button'>
        <IconNext />
      </button>
    </div>
  );
};

export default Pagination;
