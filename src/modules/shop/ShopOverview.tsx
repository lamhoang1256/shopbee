import { IShop } from "@types";
import { Button } from "components/button";
import { path } from "constants/path";

interface ShopOverviewProps {
  shopInfo: IShop;
}

const overview = [
  {
    key: "Đánh giá",
    value: "2k",
  },
  {
    key: "Tỉ lệ phản hồi",
    value: "93%",
  },
  {
    key: "Tham gia",
    value: "1 năm trước",
  },
  {
    key: "Sản phẩm",
    value: "1k+",
  },
  {
    key: "Người Theo Dõi",
    value: "435",
  },
  {
    key: "Thời Gian Phản Hồi",
    value: "trong vài giờ",
  },
];

const ShopOverview = ({ shopInfo }: ShopOverviewProps) => {
  return (
    <div className='flex flex-col lg:flex-row gap-y-4 md:gap-x-20 lg:items-center'>
      <div className='flex items-center gap-x-4'>
        <img src={shopInfo.avatar} alt='shop avatar' className='w-20 h-20 rounded-full' />
        <div>
          <h3 className='text-base font-medium'>{shopInfo.name}</h3>
          <p className='-mt-1'>Online 2 giờ trước</p>
          <Button to={path.search} className='py-0 mt-1 h-[34px] border-orangeee4 !text-orangeee4'>
            Xem shop
          </Button>
        </div>
      </div>
      <div className='grid gap-y-1 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6'>
        {overview.map((item) => (
          <div key={item.key}>
            <span className='text-[#00000066] mr-2'>{item.key}</span>
            <span className='text-orangeee4'>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopOverview;
