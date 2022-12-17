import { ICity } from "@types";
import { Dropdown } from "components/Dropdown";
import { IconShipping } from "components/Icons";
import useFetchAdministrative from "hooks/useFetchAdministrative";
import { useEffect, useState } from "react";
import { useStore } from "store/globalStore";
import { calcShippingFee, formatMoney } from "utils";

interface ProductShippingProps {
  shopCityId: string;
}

const ProductShipping = ({ shopCityId }: ProductShippingProps) => {
  const { citys } = useFetchAdministrative();
  const { currentUser } = useStore((state) => state);
  const [selectedCity, setSelectedCity] = useState({
    id: currentUser?.city?.id || "46",
    name: currentUser?.city?.name || "TP. Hồ Chí Minh"
  });
  const [shippingFee, setShippingFee] = useState(0);
  useEffect(() => {
    if (shopCityId) setShippingFee(calcShippingFee(shopCityId, selectedCity.id));
  }, [shopCityId, selectedCity]);
  return (
    <div className="my-6">
      <div>
        <div className="flex items-center gap-2 text-sm">
          <img alt="freeship" className="w-6 h-4" src="/icon-freeship.png" />
          <span>Miễn phí vận chuyển</span>
        </div>
        <p className="ml-8 maxsm:text-[13px] mt-1 text-[#0000008a]">
          Miễn phí vận chuyển cho đơn hàng trên ₫50.000
        </p>
      </div>
      <div className="flex flex-wrap items-center maxsm:mt-2">
        <div className="flex items-center gap-x-1">
          <IconShipping className="w-6 h-5" />
          <span>Vận chuyển tới:</span>
        </div>
        <Dropdown className="maxsm:ml-[12px] maxsm:-mb-1 maxsm:-mt-2 w-[205px] dropdown-outline">
          <Dropdown.Select placeholder={selectedCity?.name || "Vận chuyển tới"} />
          <Dropdown.List>
            {citys.length > 0 &&
              citys.map((city: ICity) => (
                <Dropdown.Option
                  key={city.cityId}
                  onClick={() => setSelectedCity({ id: city.cityId, name: city.name })}
                >
                  {city.name}
                </Dropdown.Option>
              ))}
          </Dropdown.List>
        </Dropdown>
      </div>
      <p className="-mt-1 text-sm pl-7 maxsm:text-[13px]">
        Phí vận chuyển: {formatMoney(shippingFee)}
      </p>
    </div>
  );
};

export default ProductShipping;
