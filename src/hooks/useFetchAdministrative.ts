import { countryAPI } from "apis";
import { useQuery } from "react-query";

export default function useFetchAdministrative(cityId?: string, districtId?: string) {
  const { data: citysData } = useQuery({
    queryKey: ["citys"],
    queryFn: () => countryAPI.getAllCity(),
    staleTime: 5 * 60 * 1000
  });
  const { data: districtsData } = useQuery({
    queryKey: ["districts", cityId],
    queryFn: () => countryAPI.getAllDistrict({ cityId }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000
  });
  const { data: wardsData } = useQuery({
    queryKey: ["wards", districtId],
    queryFn: () => countryAPI.getAllWard({ districtId }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000
  });
  return {
    citys: citysData?.data || [],
    districts: districtsData?.data || [],
    wards: wardsData?.data || []
  };
}
