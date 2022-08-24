import { Dropdown } from "components/dropdown";
import useFetchAdministrative from "hooks/useFetchAdministrative";
import { useEffect, useState } from "react";
import { useStore } from "store/configStore";
import { calcShippingFee, formatMoney } from "utils/helper";

interface ProductShippingProps {
  shopCityId: string;
}

const ProductShipping = ({ shopCityId }: ProductShippingProps) => {
  const { citys } = useFetchAdministrative();
  const { currentUser } = useStore((state) => state);
  const [selectedCity, setSelectedCity] = useState({
    cityId: currentUser.city.id,
    cityName: currentUser.city.name,
  });
  const [shippingFee, setShippingFee] = useState(0);
  useEffect(() => {
    if (shopCityId) setShippingFee(calcShippingFee(shopCityId, selectedCity.cityId));
  }, [shopCityId, selectedCity]);
  return (
    <div className='mt-3'>
      <div className='my-1'>
        <span>Vận chuyển tới:</span>
        <Dropdown>
          <Dropdown.Select placeholder={selectedCity?.cityName || "Vận chuyển tới"} />
          <Dropdown.List>
            {citys.length > 0 &&
              citys.map((city: any) => (
                <Dropdown.Option key={city.id} onClick={() => setSelectedCity(city)}>
                  {city.name}
                </Dropdown.Option>
              ))}
          </Dropdown.List>
        </Dropdown>
      </div>
      <span>Phí vận chuyển: {formatMoney(shippingFee)}</span>
    </div>
  );
};

export default ProductShipping;
