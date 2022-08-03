import { Button } from "components/button";
import { FormMessError } from "components/form";
import { IconFilter } from "components/icons";
import { InputRangePrice } from "components/input";
import { SearchRangePriceYup } from "constants/yup";
import { useFormik } from "formik";

const SearchRangePrice = () => {
  const handleSearchByRangePrice = (values: any) => {
    console.log("values: ", values);
  };

  const formik = useFormik({
    initialValues: {
      minPrice: "",
      maxPrice: "",
    },
    validationSchema: SearchRangePriceYup,
    onSubmit: (values) => {
      handleSearchByRangePrice(values);
    },
  });

  return (
    <div className='mt-5'>
      <div className='search-catelog-header'>
        <IconFilter />
        <h3>Bộ lọc tìm kiếm</h3>
      </div>
      <form
        className='flex flex-col mt-3 gap-y-2'
        onSubmit={formik.handleSubmit}
        autoComplete='off'
      >
        <span className='text-[#000000cc]'>Khoản giá</span>
        <div className='flex items-center justify-between'>
          <InputRangePrice
            type='number'
            name='minPrice'
            placeholder='Từ'
            value={formik.values.minPrice}
            onChange={formik.handleChange}
          />
          <span>-</span>
          <InputRangePrice
            type='number'
            name='maxPrice'
            placeholder='Đến'
            value={formik.values.maxPrice}
            onChange={formik.handleChange}
          />
        </div>
        <FormMessError className='block text-xs'>
          {formik.touched.maxPrice && formik.errors?.maxPrice}
        </FormMessError>
        <Button type='submit' primary className='w-full py-[6px] rounded-sm'>
          ÁP DỤNG
        </Button>
      </form>
    </div>
  );
};

export default SearchRangePrice;
