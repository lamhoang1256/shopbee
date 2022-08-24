import { ICity, IDistrict, IWard } from "@types";
import { addressAPI } from "apis";
import { useEffect, useState } from "react";

export default function useFetchAdministrative(cityId?: string, districtId?: string) {
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

  useEffect(() => {
    fetchAllCity();
  }, []);
  useEffect(() => {
    fetchAllDistrict();
  }, [cityId]);
  useEffect(() => {
    fetchAllWard();
  }, [districtId]);

  return {
    citys,
    districts,
    wards,
  };
}
