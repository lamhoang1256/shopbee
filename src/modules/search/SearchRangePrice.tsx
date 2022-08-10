import { Button } from "components/button";
import { FormMessError } from "components/form";
import { IconFilter } from "components/icons";
import { InputRangePrice } from "components/input";
import { path } from "constants/path";
import { SearchRangePriceYup } from "constants/yup";
import { useFormik } from "formik";
import { ISearchParams } from "@types";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "./search-context";

const SearchRangePrice = () => {
  const { searchPageParams } = useSearchContext();
  const navigate = useNavigate();
  const handleSearchByRangePrice = (values: any) => {
    const newParams: ISearchParams = {
      ...searchPageParams,
      ...values,
    };
    navigate(`${path.search}?${queryString.stringify(newParams)}`);
  };

  const formik = useFormik({
    initialValues: {
      price_min: "",
      price_max: "",
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
            name='price_min'
            placeholder='Từ'
            value={formik.values.price_min}
            onChange={formik.handleChange}
          />
          <span>-</span>
          <InputRangePrice
            type='number'
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
