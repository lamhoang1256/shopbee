import { ICart, IShop, IVoucher } from "@types";
import { productAPI, shopAPI } from "apis";
import { Button, ButtonOutline } from "components/button";
import { SectionWhite } from "components/common";
import { IconGPS } from "components/icons";
import { Input } from "components/input";
import { Logo } from "components/logo";
import { ModalApplyVoucher } from "components/modal";
import { PriceSale } from "components/price";
import { PATH } from "constants/path";
import useModal from "hooks/useModal";
import { OrderPayment, OrderProduct } from "modules/order";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/configStore";
import Swal from "sweetalert2";
import { calcShippingFee, calcTotalCart, formatDateVN, formatMoney } from "utils/helper";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { currentUser, carts, setCart } = useStore((state) => state);
  const price = calcTotalCart(carts, "price");
  const [shopInfo, setShopInfo] = useState<IShop>(Object);
  const [note, setNote] = useState("");
  const [total, setTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [appliedVoucher, setAppliedVoucher] = useState<IVoucher>(Object);
  const { isShow, toggleModal } = useModal();
  const [methodPayment, setMethodPayment] = useState("money");

  const buyProducts = async (values: any) => {
    try {
      const { data, message } = await productAPI.buyProducts(values);
      toast.success(message);
      setCart([]);
      navigate(`${PATH.order}/${data?._id}`);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleBuyProducts = () => {
    const orderItems = carts.map((cart: ICart) => ({
      quantity: cart.quantity,
      product: cart.product,
    }));
    const values = {
      orderItems,
      shippingTo: currentUser?.address,
      price,
      note,
      shippingFee,
      promotion: appliedVoucher.value || 0,
      total,
      voucherCode: appliedVoucher.code,
      methodPayment,
    };
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắc muốn xác nhận thanh toán?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý!",
      cancelButtonText: "Hủy!",
    }).then((result) => {
      if (result.isConfirmed) buyProducts(values);
    });
  };

  useEffect(() => {
    const fetchShopInfo = async () => {
      try {
        const { data } = await shopAPI.getShopInfo();
        setShopInfo(data);
      } catch (err: any) {
        toast.error(err?.message);
      }
    };
    fetchShopInfo();
  }, []);

  useEffect(() => {
    if (!shopInfo.city || !currentUser.city) return;
    setShippingFee(calcShippingFee(shopInfo.city.id, currentUser.city.id));
  }, [shopInfo?.city, currentUser?.city]);

  useEffect(() => {
    const totalPrice = price + shippingFee - (appliedVoucher.value || 0);
    setTotal(totalPrice > 0 ? totalPrice : 0);
  }, [price, shippingFee, appliedVoucher.value]);

  return (
    <>
      <header className='bg-white'>
        <div className='layout-container'>
          <div className='flex items-center h-20 gap-x-4'>
            <Logo primary>Shopbee</Logo>
            <h2 className='text-xl'>Thanh toán</h2>
          </div>
        </div>
      </header>
      <main className='pt-6 pb-10 layout-container'>
        <div className='mt-3 gradient-line ' />
        <SectionWhite className='text-base font-medium rounded-tl-none rounded-tr-none'>
          <h3 className='flex items-center gap-2 mb-2 text-lg font-medium text-orangeee4'>
            <IconGPS />
            Thông tin nhận hàng
          </h3>
          <p>Họ tên: {currentUser.fullname}</p>
          <p>Số điện thoại: {currentUser.phone}</p>
          <p>Địa chỉ nhận hàng: {currentUser.address}</p>
          <Link to={PATH.profile} className='font-medium text-blue08f'>
            Thay đổi địa chỉ giao hàng
          </Link>
        </SectionWhite>
        <SectionWhite className='mt-3'>
          <h2>Sản phẩm</h2>
          <div className='mt-3'>
            {carts.map(({ _id, quantity, product }) => (
              <OrderProduct key={_id} order={{ quantity, product }} />
            ))}
          </div>
        </SectionWhite>
        <div className='bg-[#fafdff] px-4 py-6 border border-dotted border-[rgba(0,0,0,.09)] flex gap-x-8 gap-y-4 justify-between flex-col md:flex-row'>
          <div className='flex flex-col flex-1 md:items-center md:flex-row gap-x-3 gap-y-2'>
            <span>Lời nhắn: </span>
            <Input
              value={note}
              className='md:flex-1'
              placeholder='Lưu ý cho người bán'
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className='flex flex-col md:flex-row gap-x-4'>
            <span className='text-green00b'>Đơn vị vận chuyển:</span>
            <div>
              <h4>Nhanh</h4>
              <p>
                Nhận hàng vào {formatDateVN(Date.now() + 3600 * 1000 * 48)} -{" "}
                {formatDateVN(Date.now() + 3600 * 1000 * 96)}
              </p>
              <p>
                (Nhanh tay vào ngay &quot;Shopbee Voucher&quot; để săn mã Miễn phí vận chuyển nhé!)
              </p>
            </div>
            <span className='text-base'>{formatMoney(shippingFee)}</span>
          </div>
        </div>
        <div className='bg-[#fafdff] px-4 py-6 border border-dotted border-[rgba(0,0,0,.09)] flex justify-end gap-x-4 gap-y-1 flex-col md:flex-row md:items-center'>
          <span>Tổng số tiền ({carts.length} sản phẩm):</span>
          <PriceSale className='text-lg font-medium'>{price}</PriceSale>
        </div>
        <div className='flex p-4 items-center justify-between border-dotted border border-[#00000017] bg-[#fff]'>
          <h3>Voucher Shopbee</h3>
          <div className='flex gap-x-5'>
            {appliedVoucher?.code && (
              <span className='text-[#23c27f]'>Đã chọn 1 mã giảm giá: {appliedVoucher.code}</span>
            )}
            <button type='button' className='text-[#05a] text-[15px]' onClick={toggleModal}>
              Chọn Voucher
            </button>
          </div>
        </div>
        <div className='flex mt-3 p-4 lg:items-center gap-x-4 gap-y-2 border-dotted border border-[#00000017] bg-[#fff] lg:flex-row flex-col'>
          <h3 className='text-base font-medium'>Phương thức thanh toán</h3>
          <ButtonOutline
            disabled={!currentUser.creditCard.name}
            primary={methodPayment === "credit-card"}
            onClick={() => setMethodPayment("credit-card")}
          >
            Thẻ Tín Dụng/Ghi Nợ
          </ButtonOutline>
          <ButtonOutline
            primary={methodPayment === "money"}
            onClick={() => setMethodPayment("money")}
          >
            Thanh toán khi nhận hàng
          </ButtonOutline>
        </div>
        <div className='flex p-4 items-center gap-x-4 border-dotted border border-[#00000017] bg-[#fff]'>
          {methodPayment === "money" && (
            <div>
              <p>Thanh toán khi nhận hàng</p>
              <p>
                Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu hộ.
              </p>
            </div>
          )}
          {methodPayment === "credit-card" && (
            <div className='flex flex-col items-center lg:flex-row gap-x-4 gap-y-2'>
              <div className='w-14 rounded-sm border border-[#00000024]'>
                <img alt='visa' className='h-8 mx-auto w-11' src='/images/icon-visa.png' />
              </div>
              <span>Họ tên: {currentUser.creditCard.name}</span>
              <span>Số thẻ: {currentUser.creditCard.number}</span>
              <span>Hết hạn: {currentUser.creditCard.expiry}</span>
            </div>
          )}
        </div>
        <OrderPayment
          price={price}
          shippingFee={shippingFee}
          promotion={appliedVoucher.value || 0}
          total={total}
        />
        <div className='bg-[#fffcf5] border-dotted border border-[rgba(0,0,0,.09)] flex flex-wrap-reverse justify-end px-4 py-6 gap-y-3 lg:items-center lg:justify-between'>
          <span className='maxsm:hidden'>
            Nhấn Đặt hàng đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Shopbee
          </span>
          <Button primary onClick={handleBuyProducts} className='py-3 text-base px-14'>
            Đặt hàng
          </Button>
        </div>
      </main>
      <ModalApplyVoucher
        isOpen={isShow}
        closeModal={toggleModal}
        appliedVoucher={appliedVoucher}
        setAppliedVoucher={setAppliedVoucher}
      />
    </>
  );
};

export default CheckoutPage;
