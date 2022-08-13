import { ICart } from "@types";
import { productAPI } from "apis";
import { Button } from "components/button";
import { SectionWhite } from "components/common";
import { Input } from "components/input";
import { path } from "constants/path";
import { OrderPayment, OrderProductItem } from "modules/order";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";
import { calcTotalMoneyCart } from "utils/helper";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { currentUser, carts, setCart } = useStore((state) => state);
  const totalPriceProduct = calcTotalMoneyCart(carts, "priceSale");
  const [shippingPrice] = useState(16000);
  const [totalDiscount] = useState(10000);
  const [totalPayment] = useState(totalPriceProduct + shippingPrice - totalDiscount);

  const buyProducts = async (values: any) => {
    try {
      const { data, success, message } = await productAPI.buyProducts(values);
      if (success) {
        toast.success(message);
        setCart([]);
        navigate(`${path.order}/${data?._id}`);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleBuyProducts = () => {
    const orderItems = carts.map((cart: ICart) => ({
      name: cart.product.name,
      quantity: cart.quantity,
      image: cart.product.image,
      price: cart.product.price,
      priceSale: cart.product.priceSale,
      product: cart.product._id,
    }));
    const values = {
      orderItems,
      shippingTo: `${currentUser?.street}, ${currentUser?.address}`,
      shippingPrice,
      totalPriceProduct,
      totalDiscount,
      totalPayment,
    };
    buyProducts(values);
  };
  const payments = [
    {
      label: "Tổng tiền hàng",
      value: totalPriceProduct,
    },
    {
      label: "Phí vận chuyển",
      value: shippingPrice,
    },
    {
      label: "Voucher từ Shopbee",
      value: totalDiscount,
    },
    {
      label: "Tổng thanh toán",
      value: totalPayment,
    },
  ];

  return (
    <div>
      <header className='bg-white'>
        <div className='layout-container'>
          <div className='flex items-center h-20'>
            <svg
              width='190'
              height='42'
              viewBox='0 0 252 78'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M77.875 13H18.5417H14.8333H7.41666V19.5H14.8333H15.9458L28.1166 48.8312C29.7074 52.6695 33.9127 55.25 38.5704 55.25H70.4583V48.75H38.5704C37.0166 48.75 35.6148 47.8888 35.0845 46.6115L33.2749 42.25H67.6622C70.9627 42.25 73.8922 40.3065 74.7934 37.5342L81.4424 17.1438C81.7613 16.1623 81.5351 15.1092 80.838 14.2935C80.1334 13.4777 79.0357 13 77.875 13ZM67.6622 35.75H30.5789L23.8372 19.5H72.9614L67.6622 35.75Z'
                fill='#EE4D2D'
              />
              <path
                d='M38.9375 68.25C42.0096 68.25 44.5 66.0674 44.5 63.375C44.5 60.6826 42.0096 58.5 38.9375 58.5C35.8654 58.5 33.375 60.6826 33.375 63.375C33.375 66.0674 35.8654 68.25 38.9375 68.25Z'
                fill='#EE4D2D'
              />
              <path
                d='M61.1875 68.25C64.2596 68.25 66.75 66.0674 66.75 63.375C66.75 60.6826 64.2596 58.5 61.1875 58.5C58.1154 58.5 55.625 60.6826 55.625 63.375C55.625 66.0674 58.1154 68.25 61.1875 68.25Z'
                fill='#EE4D2D'
              />
              <path
                d='M106.805 55L96.3906 27.7891H96.2227C96.4186 29.9447 96.5166 32.5062 96.5166 35.4736V55H93.2202V24.3037H98.5952L108.316 49.625H108.484L118.29 24.3037H123.623V55H120.053V35.2217C120.053 32.9541 120.151 30.4906 120.347 27.8311H120.179L109.681 55H106.805ZM127.885 31.9883H131.622L136.661 45.1108C137.767 48.1063 138.453 50.2689 138.719 51.5986H138.887C139.069 50.8848 139.447 49.667 140.021 47.9453C140.608 46.2096 142.512 40.8906 145.731 31.9883H149.469L139.58 58.1914C138.6 60.7809 137.452 62.6146 136.136 63.6924C134.834 64.7842 133.232 65.3301 131.328 65.3301C130.264 65.3301 129.215 65.2111 128.179 64.9731V62.1807C128.949 62.3486 129.809 62.4326 130.761 62.4326C133.155 62.4326 134.862 61.0889 135.884 58.4014L137.165 55.126L127.885 31.9883ZM171.053 46.8325C171.053 49.534 170.073 51.6406 168.113 53.1523C166.154 54.6641 163.494 55.4199 160.135 55.4199C156.495 55.4199 153.696 54.951 151.736 54.0132V50.5698C152.996 51.1017 154.368 51.5216 155.852 51.8296C157.335 52.1375 158.805 52.2915 160.261 52.2915C162.64 52.2915 164.432 51.8436 165.636 50.9478C166.84 50.0379 167.441 48.7782 167.441 47.1685C167.441 46.1047 167.224 45.2368 166.791 44.5649C166.371 43.8791 165.657 43.2492 164.649 42.6753C163.655 42.1014 162.136 41.4505 160.093 40.7227C157.237 39.7008 155.194 38.4901 153.962 37.0903C152.744 35.6906 152.135 33.8639 152.135 31.6104C152.135 29.2448 153.024 27.3621 154.802 25.9624C156.579 24.5627 158.931 23.8628 161.856 23.8628C164.908 23.8628 167.714 24.4227 170.276 25.5425L169.163 28.6499C166.63 27.5861 164.166 27.0542 161.772 27.0542C159.883 27.0542 158.406 27.4601 157.342 28.272C156.278 29.0838 155.747 30.2106 155.747 31.6523C155.747 32.7161 155.943 33.591 156.334 34.2769C156.726 34.9487 157.384 35.5716 158.308 36.1455C159.246 36.7054 160.674 37.3283 162.591 38.0142C165.811 39.1619 168.022 40.3937 169.226 41.7095C170.444 43.0252 171.053 44.7329 171.053 46.8325ZM192.553 55V40.1138C192.553 38.2381 192.126 36.8384 191.272 35.9146C190.418 34.9907 189.081 34.5288 187.262 34.5288C184.84 34.5288 183.069 35.1867 181.95 36.5024C180.844 37.8182 180.291 39.9738 180.291 42.9692V55H176.806V22.3301H180.291V32.2192C180.291 33.409 180.235 34.3958 180.123 35.1797H180.333C181.019 34.0739 181.992 33.2061 183.251 32.5762C184.525 31.9323 185.974 31.6104 187.598 31.6104C190.411 31.6104 192.518 32.2822 193.917 33.626C195.331 34.9557 196.038 37.0763 196.038 39.9878V55H192.553ZM223.081 43.4731C223.081 47.2244 222.136 50.1569 220.247 52.2705C218.357 54.3701 215.746 55.4199 212.415 55.4199C210.357 55.4199 208.531 54.937 206.935 53.9712C205.339 53.0054 204.108 51.6196 203.24 49.814C202.372 48.0083 201.938 45.8947 201.938 43.4731C201.938 39.7218 202.876 36.8034 204.751 34.7178C206.627 32.6182 209.231 31.5684 212.562 31.5684C215.781 31.5684 218.336 32.6392 220.226 34.7808C222.129 36.9224 223.081 39.8198 223.081 43.4731ZM205.549 43.4731C205.549 46.4126 206.137 48.6522 207.313 50.1919C208.489 51.7316 210.217 52.5015 212.499 52.5015C214.781 52.5015 216.509 51.7386 217.685 50.2129C218.875 48.6732 219.47 46.4266 219.47 43.4731C219.47 40.5477 218.875 38.3291 217.685 36.8174C216.509 35.2917 214.767 34.5288 212.457 34.5288C210.175 34.5288 208.454 35.2777 207.292 36.7754C206.13 38.2731 205.549 40.5057 205.549 43.4731ZM239.92 55.4199C238.422 55.4199 237.05 55.147 235.805 54.6011C234.573 54.0412 233.537 53.1873 232.697 52.0396H232.445C232.613 53.3833 232.697 54.6571 232.697 55.8608V65.3301H229.212V31.9883H232.046L232.529 35.1377H232.697C233.593 33.8779 234.636 32.9681 235.826 32.4082C237.015 31.8483 238.38 31.5684 239.92 31.5684C242.971 31.5684 245.323 32.6112 246.975 34.6968C248.64 36.7824 249.473 39.7078 249.473 43.4731C249.473 47.2524 248.626 50.1919 246.933 52.2915C245.253 54.3771 242.915 55.4199 239.92 55.4199ZM239.416 34.5288C237.064 34.5288 235.364 35.1797 234.314 36.4814C233.264 37.7832 232.725 39.8548 232.697 42.6963V43.4731C232.697 46.7065 233.236 49.0231 234.314 50.4229C235.392 51.8086 237.12 52.5015 239.5 52.5015C241.488 52.5015 243.041 51.6966 244.161 50.0869C245.295 48.4772 245.862 46.2586 245.862 43.4312C245.862 40.5617 245.295 38.3641 244.161 36.8384C243.041 35.2987 241.46 34.5288 239.416 34.5288Z'
                fill='#EE4D2D'
              />
            </svg>
            <h2 className='text-xl'>Thanh toán</h2>
          </div>
        </div>
      </header>
      <main className='pt-6 pb-10 layout-container'>
        <div className='mt-3 gradient-line ' />
        <SectionWhite className='text-base font-medium rounded-tl-none rounded-tr-none'>
          <h3 className='flex items-center gap-2 mb-2 text-lg font-medium text-orangeee4'>
            <svg
              height='16'
              viewBox='0 0 12 16'
              width='12'
              className='shopee-svg-icon icon-location-marker'
              fill='#ee4d2d'
            >
              <path
                d='M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z'
                fillRule='evenodd'
              />
            </svg>
            Thông tin nhận hàng
          </h3>
          <p>Họ tên: {currentUser.fullname}</p>
          <p>Số điện thoại: {currentUser.phone}</p>
          <p>Địa chỉ nhận hàng: {`${currentUser.street}, ${currentUser.address}`}</p>
          <Link to={path.profile} className='font-medium text-blue08f'>
            Thay đổi
          </Link>
        </SectionWhite>

        <SectionWhite className='mt-3'>
          <h2>Sản phẩm</h2>
          <div className='mt-3'>
            {carts.map((cart) => (
              <OrderProductItem
                order={{ ...cart.product, product: cart.product._id }}
                key={cart._id}
              />
            ))}
          </div>
        </SectionWhite>
        <SectionWhite>
          <div className='flex items-center justify-between'>
            <h2 className='maxsm:hidden'>Voucher</h2>
            <form className='flex flex-wrap items-center gap-2'>
              <Input placeholder='Mã Voucher Shopbee' className='maxsm:w-full' />
              <Button>Áp dụng</Button>
            </form>
          </div>
        </SectionWhite>
        <OrderPayment payments={payments} />
        <div className='px-4 pb-6 bg-white'>
          <div className='flex flex-wrap-reverse justify-end gap-y-3 lg:items-center lg:justify-between'>
            <span className='maxsm:hidden'>
              Nhấn Đặt hàng đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Shopbee
            </span>
            <Button primary onClick={handleBuyProducts} className='px-14'>
              Đặt hàng
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
