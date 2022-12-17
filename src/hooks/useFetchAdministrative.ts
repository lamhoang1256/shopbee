import { ICity, IDistrict, IWard } from "@types";
import { countryAPI } from "apis";
import { useEffect, useState } from "react";

export default function useFetchAdministrative(cityId?: string, districtId?: string) {
  const [citys, setCitys] = useState<ICity[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [wards, setWards] = useState<IWard[]>([]);
  const fetchAllCity = () => {
    countryAPI.getAllCity().then((res) => setCitys(res.data));
  };
  const fetchAllDistrict = () => {
    countryAPI.getAllDistrict({ cityId }).then((res) => setDistricts(res.data));
  };
  const fetchAllWard = () => {
    countryAPI.getAllWard({ districtId }).then((res) => setWards(res.data));
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
    wards
  };
}
