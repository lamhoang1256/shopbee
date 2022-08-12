import { ICommune, IDistrict, IProvince } from "@types";
import { addressAPI } from "apis";
import { FormGroup, FormMessError } from "components/form";
import { Select } from "components/select";
import { initialAddressDetail } from "constants/initialValue";
import { useEffect, useState } from "react";

interface UserUpdateAdministrativeProps {
  formik: any;
}

const UserUpdateAdministrative = ({ formik }: UserUpdateAdministrativeProps) => {
  const { addressIdProvince, addressIdDistrict, addressIdCommune } = formik.values;
  const [addressDetail, setAddressDetail] = useState(initialAddressDetail);
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [communes, setCommunes] = useState<ICommune[]>([]);

  const fetchAllProvince = () => {
    addressAPI.getAllCity().then((res) => setProvinces(res.data));
  };
  const fetchAllDistrict = () => {
    const params = { idProvince: addressIdProvince };
    addressAPI.getAllDistrict(params).then((res) => setDistricts(res.data));
  };
  const fetchAllCommune = () => {
    const params = { idDistrict: addressIdDistrict };
    addressAPI.getAllCommune(params).then((res) => setCommunes(res.data));
  };

  const handleUpdateAddress = () => {
    const { commune, district, province } = addressDetail;
    const address = `${commune}, ${district}, ${province}`;
    formik?.setFieldValue("addressAdministrative", address);
  };

  const handleChangeProvince = async (e: any) => {
    const province = e.target.options[e.target.selectedIndex].text;
    setAddressDetail({ ...addressDetail, province });
    formik?.setFieldValue("addressIdProvince", e.target.value);
    formik?.setFieldValue("addressIdDistrict", "");
    formik?.setFieldValue("addressIdCommune", "");
  };
  const handleChangeDistrict = async (e: any) => {
    const district = e.target.options[e.target.selectedIndex].text;
    setAddressDetail({ ...addressDetail, district });
    formik?.setFieldValue("addressIdDistrict", e.target.value);
    formik?.setFieldValue("addressIdCommune", "");
  };
  const handleChangeCommune = (e: any) => {
    const commune = e.target.options[e.target.selectedIndex].text;
    setAddressDetail({ ...addressDetail, commune });
    formik?.setFieldValue("addressIdCommune", e.target.value);
  };

  useEffect(() => {
    fetchAllProvince();
  }, []);
  useEffect(() => {
    fetchAllDistrict();
  }, [addressIdProvince]);
  useEffect(() => {
    fetchAllCommune();
  }, [addressIdDistrict]);
  useEffect(() => {
    handleUpdateAddress();
  }, [addressIdCommune]);

  return (
    <div className='grid grid-cols-3 gap-4'>
      <FormGroup>
        <Select name='province' value={addressIdProvince} onChange={handleChangeProvince}>
          <option value=''>Chọn Tỉnh/Thành Phố</option>
          {provinces?.map((province) => (
            <option value={province.idProvince} key={province.idProvince}>
              {province.name}
            </option>
          ))}
        </Select>
        <FormMessError>
          {formik.touched.addressIdProvince && formik.errors?.addressIdProvince}
        </FormMessError>
      </FormGroup>
      <FormGroup>
        <Select name='district' value={addressIdDistrict} onChange={handleChangeDistrict}>
          <option value=''>Chọn Quận/Huyện</option>
          {districts?.map((district) => (
            <option value={district.idDistrict} key={district.idDistrict}>
              {district.name}
            </option>
          ))}
        </Select>
        <FormMessError>
          {formik.touched.addressIdDistrict && formik.errors?.addressIdDistrict}
        </FormMessError>
      </FormGroup>
      <FormGroup>
        <Select name='commune' value={addressIdCommune} onChange={handleChangeCommune}>
          <option value=''>Chọn Phường/Xã</option>
          {communes?.map((commune) => (
            <option value={commune.idCommune} key={commune.idCommune}>
              {commune.name}
            </option>
          ))}
        </Select>
        <FormMessError>
          {formik.touched.addressIdCommune && formik.errors?.addressIdCommune}
        </FormMessError>
      </FormGroup>
    </div>
  );
};

export default UserUpdateAdministrative;
