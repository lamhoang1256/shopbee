import { ICity, IDistrict, IWard } from "@types";
import { addressAPI } from "apis";
import { FormGroup, MessageError } from "components/form";
import { Select } from "components/select";
import { initAdministrative } from "constants/initialValue";
import { useEffect, useState } from "react";

interface UpdateAdministrativeProps {
  formik: any;
}

const UpdateAdministrative = ({ formik }: UpdateAdministrativeProps) => {
  const { cityId, districtId, wardId } = formik.values;
  const [administrative, setAdministrative] = useState(initAdministrative);
  const [citys, setCitys] = useState<ICity[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [wards, setWards] = useState<IWard[]>([]);

  const fetchAllCity = () => {
    addressAPI.getAllCity().then((res) => setCitys(res.data));
  };
  const fetchAllDistrict = () => {
    addressAPI.getAllDistrict({ cityId }).then((res) => setDistricts(res.data));
  };
  const fetchAllWard = () => {
    addressAPI.getAllWard({ districtId }).then((res) => setWards(res.data));
  };

  const handleChangeCity = async (e: any) => {
    console.log("e: ", e.target.options);
    const city = e.target.options[e.target.selectedIndex].text;
    setAdministrative({ ...administrative, city });
    formik?.setFieldValue("cityId", e.target.value);
    formik?.setFieldValue("districtId", "");
    formik?.setFieldValue("wardId", "");
  };
  const handleChangeDistrict = async (e: any) => {
    const district = e.target.options[e.target.selectedIndex].text;
    setAdministrative({ ...administrative, district });
    formik?.setFieldValue("districtId", e.target.value);
    formik?.setFieldValue("wardId", "");
  };
  const handleChangeWard = (e: any) => {
    const ward = e.target.options[e.target.selectedIndex].text;
    setAdministrative({ ...administrative, ward });
    formik?.setFieldValue("wardId", e.target.value);
  };

  const handleUpdateAddress = () => {
    const { ward, district, city } = administrative;
    const address = `${ward}, ${district}, ${city}`;
    formik?.setFieldValue("address", address);
  };

  useEffect(() => {
    fetchAllCity();
  }, []);
  useEffect(() => {
    fetchAllDistrict();
  }, [cityId]);
  useEffect(() => {
    fetchAllWard();
  }, [districtId]);
  useEffect(() => {
    handleUpdateAddress();
  }, [wardId]);

  return (
    <div className='grid grid-cols-3 gap-4'>
      <FormGroup>
        <Select name='city' value={cityId} onChange={handleChangeCity}>
          <option value=''>Chọn Tỉnh/Thành Phố</option>
          {citys?.map((city) => (
            <option value={city.cityId} key={city.cityId}>
              {city.name}
            </option>
          ))}
        </Select>
        <MessageError>{formik.touched.cityId && formik.errors?.cityId}</MessageError>
      </FormGroup>
      <FormGroup>
        <Select name='district' value={districtId} onChange={handleChangeDistrict}>
          <option value=''>Chọn Quận/Huyện</option>
          {districts?.map((district) => (
            <option value={district.districtId} key={district.districtId}>
              {district.name}
            </option>
          ))}
        </Select>
        <MessageError>{formik.touched.districtId && formik.errors?.districtId}</MessageError>
      </FormGroup>
      <FormGroup>
        <Select name='ward' value={wardId} onChange={handleChangeWard}>
          <option value=''>Chọn Phường/Xã</option>
          {wards?.map((ward) => (
            <option value={ward.wardId} key={ward.wardId}>
              {ward.name}
            </option>
          ))}
        </Select>
        <MessageError>{formik.touched.wardId && formik.errors?.wardId}</MessageError>
      </FormGroup>
    </div>
  );
};

export default UpdateAdministrative;
