/* eslint-disable @typescript-eslint/no-shadow */
import { ICity, IDistrict, IWard } from "@types";
import { Dropdown } from "components/dropdown";
import { FormGroup, MessageError } from "components/form";
import useFetchAdministrative from "hooks/useFetchAdministrative";

interface AdministrativeProps {
  formik: any;
}

const Administrative = ({ formik }: AdministrativeProps) => {
  const { city, district, ward } = formik.values;
  const { citys, districts, wards } = useFetchAdministrative(city.id, district.id);
  const handleChangeCity = (city: ICity) => {
    formik.setFieldValue("ward", { id: "", name: "" });
    formik.setFieldValue("district", { id: "", name: "" });
    formik.setFieldValue("city", { id: city.cityId, name: city.name });
  };
  const handleChangeDistrict = (district: IDistrict) => {
    formik.setFieldValue("ward", { id: "", name: "" });
    formik.setFieldValue("district", { id: district.districtId, name: district.name });
  };
  const handleChangeWard = (ward: IWard) => {
    formik.setFieldValue("ward", { id: ward.wardId, name: ward.name });
  };

  return (
    <div className='grid gap-2 md:grid-cols-3'>
      <FormGroup>
        <Dropdown>
          <Dropdown.Select placeholder={city.name || "Chọn Tỉnh/Thành Phố"} />
          <Dropdown.List>
            {citys.length > 0 &&
              citys.map((city: ICity) => (
                <Dropdown.Option key={city.cityId} onClick={() => handleChangeCity(city)}>
                  {city.name}
                </Dropdown.Option>
              ))}
          </Dropdown.List>
        </Dropdown>
        <MessageError>{formik.touched.city?.name && formik.errors?.city?.name}</MessageError>
      </FormGroup>
      <FormGroup>
        <Dropdown>
          <Dropdown.Select placeholder={district.name || "Chọn Quận/Huyện"} />
          <Dropdown.List>
            {districts.length > 0 ? (
              districts.map((district: IDistrict) => (
                <Dropdown.Option
                  key={district.districtId}
                  onClick={() => handleChangeDistrict(district)}
                >
                  {district.name}
                </Dropdown.Option>
              ))
            ) : (
              <span className='inline-block p-2 text-sm line-clamp-1'>
                Chưa chọn Tỉnh/Thành Phố
              </span>
            )}
          </Dropdown.List>
        </Dropdown>
        <MessageError>
          {formik.touched.district?.name && formik.errors?.district?.name}
        </MessageError>
      </FormGroup>
      <FormGroup>
        <Dropdown>
          <Dropdown.Select placeholder={ward.name || "Chọn Phường/Xã"} />
          <Dropdown.List>
            {wards.length > 0 ? (
              wards.map((ward: IWard) => (
                <Dropdown.Option key={ward.wardId} onClick={() => handleChangeWard(ward)}>
                  {ward.name}
                </Dropdown.Option>
              ))
            ) : (
              <span className='inline-block p-2 text-sm line-clamp-1'>Chưa chọn Quận/Huyện</span>
            )}
          </Dropdown.List>
        </Dropdown>
        <MessageError>{formik.touched.ward?.name && formik.errors?.ward?.name}</MessageError>
      </FormGroup>
    </div>
  );
};

export default Administrative;
