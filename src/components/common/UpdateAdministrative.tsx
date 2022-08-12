import { ICommune, IDistrict, IProvince } from "@types";
import { addressAPI } from "apis";
import { FormGroup, MessageError } from "components/form";
import { Select } from "components/select";
import { initialAddressDetail } from "constants/initialValue";
import { useEffect, useState } from "react";

interface UpdateAdministrativeProps {
  formik: any;
}

const UpdateAdministrative = ({ formik }: UpdateAdministrativeProps) => {
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

  const handleUpdateAddress = () => {
    const { commune, district, province } = addressDetail;
    const address = `${commune}, ${district}, ${province}`;
    formik?.setFieldValue("addressAdministrative", address);
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
          {provinces?.map(({ idProvince, name }) => (
            <option value={idProvince} key={idProvince}>
              {name}
            </option>
          ))}
        </Select>
        <MessageError>
          {formik.touched.addressIdProvince && formik.errors?.addressIdProvince}
        </MessageError>
      </FormGroup>
      <FormGroup>
        <Select name='district' value={addressIdDistrict} onChange={handleChangeDistrict}>
          <option value=''>Chọn Quận/Huyện</option>
          {districts?.map(({ idDistrict, name }) => (
            <option value={idDistrict} key={idDistrict}>
              {name}
            </option>
          ))}
        </Select>
        <MessageError>
          {formik.touched.addressIdDistrict && formik.errors?.addressIdDistrict}
        </MessageError>
      </FormGroup>
      <FormGroup>
        <Select name='commune' value={addressIdCommune} onChange={handleChangeCommune}>
          <option value=''>Chọn Phường/Xã</option>
          {communes?.map(({ idCommune, name }) => (
            <option value={idCommune} key={idCommune}>
              {name}
            </option>
          ))}
        </Select>
        <MessageError>
          {formik.touched.addressIdCommune && formik.errors?.addressIdCommune}
        </MessageError>
      </FormGroup>
    </div>
  );
};

export default UpdateAdministrative;
