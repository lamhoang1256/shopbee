import { configAPIAddress } from "apis/address";
import { ICommune, IDistrict, IProvince } from "interfaces";
import { useEffect, useState } from "react";

interface UserUpdateProvinceProps {
  formik: any;
}

const UserUpdateProvince = ({ formik }: UserUpdateProvinceProps) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({
    idProvince: "",
    idDistrict: "",
    idCommune: "",
  });

  const fetchAllProvince = () => {
    configAPIAddress.getAllCity().then((res) => setProvinces(res.data));
  };
  const fetchAllDistrict = () => {
    configAPIAddress
      .getAllDistrict({ idProvince: selectedAddress.idProvince })
      .then((res) => setDistricts(res.data));
  };
  const fetchAllCommune = () => {
    configAPIAddress
      .getAllCommune({ idDistrict: selectedAddress.idDistrict })
      .then((res) => setCommunes(res.data));
  };

  const handleUpdateAddress = () => {
    const province: IProvince =
      provinces.find(({ idProvince }) => idProvince === selectedAddress.idProvince) ||
      ({} as IProvince);
    const district: IDistrict =
      districts.find(({ idDistrict }) => idDistrict === selectedAddress.idDistrict) ||
      ({} as IDistrict);
    const commune: ICommune =
      communes.find(({ idCommune }) => idCommune === selectedAddress.idCommune) || ({} as ICommune);
    if (province?.name || district?.name || commune?.name) {
      formik?.setFieldValue(
        "administrative",
        `${commune?.name}, ${district?.name}, ${province?.name}`,
      );
    }
  };

  useEffect(() => {
    fetchAllProvince();
  }, []);

  useEffect(() => {
    fetchAllDistrict();
    formik?.setFieldValue("administrative", "");
  }, [selectedAddress.idProvince]);

  useEffect(() => {
    fetchAllCommune();
    formik?.setFieldValue("administrative", "");
  }, [selectedAddress.idProvince, selectedAddress.idDistrict]);

  useEffect(() => {
    if (selectedAddress.idCommune) handleUpdateAddress();
  }, [selectedAddress.idCommune]);

  return (
    <div className='grid grid-cols-3 gap-4'>
      <select
        className='w-full h-10 border border-[#00000024] px-2 outline-none'
        name='province'
        id='province'
        onChange={(e: any) =>
          setSelectedAddress({ ...selectedAddress, idProvince: e.target.value })
        }
      >
        <option value=''>Chọn Tỉnh/Thành Phố</option>
        {provinces?.map((province: any) => (
          <option value={province.idProvince} key={province.idProvince}>
            {province.name}
          </option>
        ))}
      </select>
      <select
        className='w-full h-10 border border-[#00000024] px-2 outline-none'
        name='district'
        id='district'
        onChange={(e: any) =>
          setSelectedAddress({ ...selectedAddress, idDistrict: e.target.value })
        }
      >
        <option value=''>Chọn Quận/Huyện</option>
        {districts?.map((item: any) => (
          <option value={item.idDistrict} key={item.idDistrict}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        className='w-full h-10 border border-[#00000024] px-2 outline-none'
        name='commune'
        id='commune'
        onChange={(e: any) => {
          setSelectedAddress({ ...selectedAddress, idCommune: e.target.value });
        }}
      >
        <option value=''>Chọn Phường/Xã</option>
        {communes?.map((item: any) => (
          <option value={item.idCommune} key={item.idCommune}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserUpdateProvince;
