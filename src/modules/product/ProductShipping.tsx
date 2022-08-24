import { ICity } from "@types";
import { Dropdown } from "components/dropdown";
import { IconShipping } from "components/icons";
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
    id: currentUser.city.id,
    name: currentUser.city.name,
  });
  const [shippingFee, setShippingFee] = useState(0);
  useEffect(() => {
    if (shopCityId) setShippingFee(calcShippingFee(shopCityId, selectedCity.id));
  }, [shopCityId, selectedCity]);
  return (
    <div className='my-6'>
      <div>
        <div className='flex items-center gap-x-2'>
          <img
            alt='freeship'
            className='w-6 h-4'
            src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/1cdd37339544d858f4d0ade5723cd477.png'
          />
          <span>Miễn phí vận chuyển</span>
        </div>
        <p className='pl-8 mt-1 text-[#0000008a]'>Miễn phí vận chuyển cho đơn hàng trên ₫50.000</p>
      </div>
      <div className='flex items-center'>
        <div className='flex items-center gap-x-1'>
          <IconShipping className='w-6 h-5' />
          <span>Vận chuyển tới:</span>
        </div>
        <Dropdown className='w-[205px] dropdown-outline'>
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
      <p className='pl-8 -mt-1'>
        Phí vận chuyển:
        <span className='pl-[10px]'>{formatMoney(shippingFee)}</span>
      </p>
    </div>
  );
};

export default ProductShipping;
