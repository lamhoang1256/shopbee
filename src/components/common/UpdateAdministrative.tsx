/* eslint-disable @typescript-eslint/no-shadow */
import { Dropdown } from "components/dropdown";
import { FormGroup, MessageError } from "components/form";
import useFetchAdministrative from "hooks/useFetchAdministrative";
import { useEffect } from "react";

interface UpdateAdministrativeProps {
  formik: any;
}

const UpdateAdministrative = ({ formik }: UpdateAdministrativeProps) => {
  const { city, district, ward } = formik.values;
  console.log("ward formik: ", ward);
  const { citys, districts, wards } = useFetchAdministrative(city.id, district.id);

  const handleChangeCity = async (city: any) => {
    formik?.setFieldValue("city", { id: city.cityId, name: city.name });
    formik?.setFieldValue("district", { id: "", name: "" });
    formik?.setFieldValue("ward", { id: "", name: "" });
  };
  const handleChangeDistrict = async (district: any) => {
    formik?.setFieldValue("district", { id: district.districtId, name: district.name });
    formik?.setFieldValue("ward", { id: "", name: "" });
  };
  const handleChangeWard = (ward: any) => {
    console.log("ward: ", ward);
    formik?.setFieldValue("ward", { id: ward.wardId, name: ward.name });
  };

  const handleUpdateAddress = () => {
    console.log("address");
  };

  useEffect(() => {
    handleUpdateAddress();
  }, [ward.id]);

  return (
    <div className='w-full'>
      <FormGroup>
        {/* <Select name='city' value={cityId} onChange={handleChangeCity}>
          <option value=''>Chọn Tỉnh/Thành Phố</option>
          {citys?.map((city) => (
            <option value={city.cityId} key={city.cityId}>
              {city.name}
            </option>
          ))}
        </Select> */}
        <Dropdown>
          <Dropdown.Select placeholder={city.name || "Chọn Tỉnh/Thành Phố"} />
          <Dropdown.List>
            {citys.length > 0 &&
              citys.map((city: any) => (
                <Dropdown.Option key={city.cityId} onClick={() => handleChangeCity(city)}>
                  {city.name}
                </Dropdown.Option>
              ))}
          </Dropdown.List>
        </Dropdown>
        <MessageError>{formik.touched.city && formik.errors?.city}</MessageError>
      </FormGroup>
      <FormGroup>
        <Dropdown>
          <Dropdown.Select placeholder={district.name || "Chọn Quận/Huyện"} />
          <Dropdown.List>
            {districts.length > 0 &&
              districts.map((district: any) => (
                <Dropdown.Option
                  key={district.districtId}
                  onClick={() => handleChangeDistrict(district)}
                >
                  {district.name}
                </Dropdown.Option>
              ))}
          </Dropdown.List>
        </Dropdown>
        <MessageError>{formik.touched.district && formik.errors?.district}</MessageError>
      </FormGroup>
      <FormGroup>
        <Dropdown>
          <Dropdown.Select placeholder={ward.name || "Chọn Phường/Xã"} />
          <Dropdown.List>
            {wards.length > 0
              ? wards.map((ward: any) => (
                  <Dropdown.Option key={ward.wardId} onClick={() => handleChangeWard(ward)}>
                    {ward.name}
                  </Dropdown.Option>
                ))
              : "not"}
          </Dropdown.List>
        </Dropdown>
        <MessageError>{formik.touched.ward && formik.errors?.ward}</MessageError>
      </FormGroup>
    </div>
  );
};

export default UpdateAdministrative;
