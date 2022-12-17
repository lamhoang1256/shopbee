import Button from "components/Button";
import FormError from "components/FormError";
import { IconFilter } from "components/Icons";
import InputNumber from "components/InputNumber";
import { useFormik } from "formik";
import useQueryParams from "hooks/useQueryParams";
import { priceRules, removeEmptyStringValueObj } from "utils";

const SearchByPrice = () => {
  const { queryParams, setSearchParams } = useQueryParams();
  const formik = useFormik({
    initialValues: { price_min: "", price_max: "" },
    validationSchema: priceRules,
    onSubmit: (values: { price_min: string; price_max: string }) => {
      const params = removeEmptyStringValueObj({ ...queryParams, ...values });
      setSearchParams(params);
    }
  });
  const { values, handleChange, touched, errors, handleSubmit } = formik;
  return (
    <div className="mt-5">
      <div className="search-category">
        <IconFilter />
        <h3>Bộ lọc tìm kiếm</h3>
      </div>
      <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col mt-3 gap-y-2">
        <span className="text-[#000000cc]">Khoản giá</span>
        <div className="flex items-center justify-between">
          <InputNumber
            name="price_min"
            placeholder="Từ"
            className="!h-8 py-0 w-[85px] px-1 bg-white"
            value={values.price_min}
            onChange={handleChange}
          />
          <span>-</span>
          <InputNumber
            name="price_max"
            placeholder="Đến"
            className="!h-8 py-0 w-[85px] px-1 bg-white"
            value={values.price_max}
            onChange={handleChange}
          />
        </div>
        <FormError className="block">{touched.price_max && errors?.price_max}</FormError>
        <Button primary type="submit" className="w-full py-[6px] rounded-sm">
          ÁP DỤNG
        </Button>
      </form>
    </div>
  );
};

export default SearchByPrice;
