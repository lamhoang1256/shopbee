import { useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { Button } from "components/button";
import { FormMessError } from "components/form";
import { IconFilter } from "components/icons";
import { InputRangePrice } from "components/input";
import { SearchRangePriceYup } from "constants/yup";

interface IParamsSearchByPrice {
  price_min: string;
  price_max: string;
}

const SearchRangePrice = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = Object.fromEntries(searchParams);
  const formik = useFormik({
    initialValues: {
      price_min: "",
      price_max: "",
    },
    validationSchema: SearchRangePriceYup,
    onSubmit: (params: IParamsSearchByPrice) => {
      setSearchParams({ ...currentParams, ...params });
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
            name='price_min'
            placeholder='Từ'
            value={formik.values.price_min}
            onChange={formik.handleChange}
          />
          <span>-</span>
          <InputRangePrice
            name='price_max'
            placeholder='Đến'
            value={formik.values.price_max}
            onChange={formik.handleChange}
          />
        </div>
        <FormMessError className='block text-xs'>
          {formik.touched.price_max && formik.errors?.price_max}
        </FormMessError>
        <Button type='submit' primary className='w-full py-[6px] rounded-sm'>
          ÁP DỤNG
        </Button>
      </form>
    </div>
  );
};

export default SearchRangePrice;
