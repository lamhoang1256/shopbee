import { shopAPI } from "apis";
import { Option, Select } from "components/select";
import useFetchAdministrative from "hooks/useFetchAdministrative";
import { useEffect, useState } from "react";
import { useStore } from "store/configStore";
import { calcShippingFee, formatMoney } from "utils/helper";

const ProductShipping = () => {
  const { citys } = useFetchAdministrative();
  const { currentUser } = useStore((state) => state);
  const [cityId, setCityId] = useState(currentUser.cityId);
  const [shippingFee, setShippingFee] = useState(0);
  useEffect(() => {
    const fetchShopInfo = () => {
      shopAPI.getShopInfo().then((res) => {
        setShippingFee(calcShippingFee(res.data.cityId, cityId));
      });
    };
    fetchShopInfo();
  }, [cityId]);
  return (
    <div className='mt-3'>
      <div className='my-1'>
        <span>Vận chuyển tới:</span>
        <Select
          value={cityId}
          className='px-1 ml-1 h-7'
          onChange={(e) => setCityId(e.target.value)}
        >
          <Option value='01'>Chọn Tỉnh/Thành Phố</Option>
          {citys?.map((city) => (
            <Option value={city.cityId} key={city.cityId}>
              {city.name}
            </Option>
          ))}
        </Select>
      </div>
      <span>Phí vận chuyển: {formatMoney(shippingFee)}</span>
    </div>
  );
};

export default ProductShipping;
