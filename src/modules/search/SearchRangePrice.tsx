import Button from "components/Button";
import FormError from "components/FormError";
import { IconFilter } from "components/Icons";
import InputNumber from "components/InputNumber";
import { useFormik } from "formik";
import usePagination from "hooks/usePagination";
import * as Yup from "yup";

interface IParamsSearchByPrice {
  price_min: string;
  price_max: string;
}

const SearchRangePrice = () => {
  const { handleFilter } = usePagination();
  const formik = useFormik({
    initialValues: {
      price_min: "",
      price_max: ""
    },
    validationSchema: Yup.object({
      price_min: Yup.number().min(0).default(0),
      price_max: Yup.number().min(Yup.ref("price_min"), "Vui lòng điền khoảng giá phù hợp")
    }),
    onSubmit: (params: IParamsSearchByPrice) => {
      handleFilter(params);
    }
  });

  return (
    <div className="mt-5">
      <div className="search-catelog-header">
        <IconFilter />
        <h3>Bộ lọc tìm kiếm</h3>
      </div>
      <form
        className="flex flex-col mt-3 gap-y-2"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <span className="text-[#000000cc]">Khoản giá</span>
        <div className="flex items-center justify-between">
          <InputNumber
            name="price_min"
            placeholder="Từ"
            className="outline-none !h-8 py-0 w-[85px] px-1 bg-white border border-[#00000024]"
            value={formik.values.price_min}
            onChange={formik.handleChange}
          />
          <span>-</span>
          <InputNumber
            name="price_max"
            placeholder="Đến"
            className="outline-none !h-8 py-0 w-[85px] px-1 bg-white border border-[#00000024]"
            value={formik.values.price_max}
            onChange={formik.handleChange}
          />
        </div>
        <FormError className="block text-xs">
          {formik.touched.price_max && formik.errors?.price_max}
        </FormError>
        <Button type="submit" primary className="w-full py-[6px] rounded-sm">
          ÁP DỤNG
        </Button>
      </form>
    </div>
  );
};

export default SearchRangePrice;
