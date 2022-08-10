import { addressAPI } from "apis";
import { Select } from "components/select";
import { ICommune, IDistrict, IProvince } from "interfaces";
import { useEffect, useState } from "react";

interface UserUpdateAdministrativeProps {
  formik: any;
}

const initAdministrative = {
  province: {} as IProvince,
  district: {} as IDistrict,
  commune: {} as ICommune,
};

const UserUpdateAdministrative = ({ formik }: UserUpdateAdministrativeProps) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [administrative, setAdministrative] = useState({
    idProvince: "",
    idDistrict: "",
    idCommune: "",
  });

  const fetchAllProvince = () => {
    addressAPI.getAllCity().then((res) => setProvinces(res.data));
  };
  const fetchAllDistrict = () => {
    addressAPI
      .getAllDistrict({ idProvince: administrative.idProvince })
      .then((res) => setDistricts(res.data));
  };
  const fetchAllCommune = () => {
    addressAPI
      .getAllCommune({ idDistrict: administrative.idDistrict })
      .then((res) => setCommunes(res.data));
  };

  const handleUpdateAddress = () => {
    const province: IProvince =
      provinces.find(({ idProvince }) => idProvince === administrative.idProvince) ||
      initAdministrative.province;
    const district: IDistrict =
      districts.find(({ idDistrict }) => idDistrict === administrative.idDistrict) ||
      initAdministrative.district;
    const commune: ICommune =
      communes.find(({ idCommune }) => idCommune === administrative.idCommune) ||
      initAdministrative.commune;
    if (province?.name || district?.name || commune?.name) {
      formik?.setFieldValue(
        "addressAdministrative",
        `${commune?.name}, ${district?.name}, ${province?.name}`,
      );
    }
  };

  useEffect(() => {
    fetchAllProvince();
  }, []);
  useEffect(() => {
    fetchAllDistrict();
  }, [administrative.idProvince]);
  useEffect(() => {
    fetchAllCommune();
  }, [administrative.idProvince, administrative.idDistrict]);
  useEffect(() => {
    if (administrative.idCommune) handleUpdateAddress();
  }, [administrative.idCommune]);

  return (
    <div className='grid grid-cols-3 gap-4'>
      <Select
        name='province'
        onChange={(e: any) => setAdministrative({ ...administrative, idProvince: e.target.value })}
      >
        <option value=''>Chọn Tỉnh/Thành Phố</option>
        {provinces?.map((province: any) => (
          <option value={province.idProvince} key={province.idProvince}>
            {province.name}
          </option>
        ))}
      </Select>
      <Select
        name='district'
        onChange={(e: any) => setAdministrative({ ...administrative, idDistrict: e.target.value })}
      >
        <option value=''>Chọn Quận/Huyện</option>
        {districts?.map((item: any) => (
          <option value={item.idDistrict} key={item.idDistrict}>
            {item.name}
          </option>
        ))}
      </Select>
      <Select
        name='commune'
        onChange={(e: any) => {
          setAdministrative({ ...administrative, idCommune: e.target.value });
        }}
      >
        <option value=''>Chọn Phường/Xã</option>
        {communes?.map((item: any) => (
          <option value={item.idCommune} key={item.idCommune}>
            {item.name}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default UserUpdateAdministrative;
