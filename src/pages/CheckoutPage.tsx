import { ICart, IPayloadBuyProduct, IVoucher } from "@types";
import { productAPI } from "apis";
import { Button, ButtonOutline } from "components/_button";
import { SectionWhite } from "components/_section";
import { IconGPS } from "components/Icons";
import Input from "components/Input";
import Logo from "components/Logo";
import { ModalApplyVoucher } from "components/Modal";
import { ProductPriceSale } from "modules/Product/ProductPrice";
import { PATH } from "constants/path";
import useFetchShopInfo from "hooks/useFetchShopInfo";
import useModal from "hooks/useModal";
import { OrderPayment, OrderProduct } from "modules/order";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";
import { calcShippingFee, calcTotalCart, formatDateVN, formatMoney } from "utils/helper";
import { swalInfo, swalQuestion } from "utils/sweetalert2";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { currentUser, carts, setCarts } = useStore((state) => state);
  const { isShow, toggleModal } = useModal();
  const { shopInfo } = useFetchShopInfo();
  const price = calcTotalCart(carts, "price");
  const [note, setNote] = useState("");
  const [total, setTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [appliedVoucher, setAppliedVoucher] = useState<IVoucher>(Object);
  const [methodPayment, setMethodPayment] = useState("money");

  const buyProducts = async (payload: IPayloadBuyProduct) => {
    try {
      const { data, message } = await productAPI.buyProducts(payload);
      toast.success(message);
      setCarts([]);
      navigate(`${PATH.order}/${data?._id}`);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleCheckout = () => {
    if (carts?.length <= 0) {
      swalInfo("Giỏ hàng của bạn đang trống", "Vui lòng kiểm tra giỏ hàng và thử lại", () =>
        navigate(PATH.cart)
      );
      return;
    }
    if (!currentUser.fullname || !currentUser.phone || !currentUser.address) {
      swalInfo("Thông tin nhận hàng đang trống", "Vui lòng kiểm tra thông tin và thử lại", () =>
        navigate(PATH.profile)
      );
      return;
    }
    const orderItems = carts.map((cart: ICart) => ({
      quantity: cart.quantity,
      product: cart.product._id
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
      methodPayment
    };
    swalQuestion("Xác nhận", "Bạn có chắc chắc muốn thanh toán?", () => buyProducts(values));
  };

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
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>
      <header className="bg-white">
        <div className="layout-container">
          <div className="flex items-center h-20 gap-x-4">
            <Logo primary>Shopbee</Logo>
            <h2 className="text-xl">Thanh toán</h2>
          </div>
        </div>
      </header>
      <main className="pt-6 pb-10 layout-container">
        <div className="mt-3 gradient-line " />
        <SectionWhite className="text-base font-medium rounded-tl-none rounded-tr-none">
          <h3 className="flex items-center gap-2 mb-2 text-lg font-medium text-orangeee4">
            <IconGPS />
            <span>Thông tin nhận hàng</span>
          </h3>
          <p>Họ tên: {currentUser.fullname || "Trống"}</p>
          <p>Số điện thoại: {currentUser.phone || "Trống"}</p>
          <p>Địa chỉ nhận hàng: {currentUser.address || "Trống"}</p>
          <Link to={PATH.profile} className="font-medium text-blue08f">
            Thay đổi địa chỉ giao hàng
          </Link>
        </SectionWhite>
        <SectionWhite className="mt-3">
          <h2>Sản phẩm</h2>
          <div className="mt-3">
            {carts.length > 0 &&
              carts.map(({ _id, quantity, product }) => (
                <OrderProduct key={_id} order={{ quantity, product }} />
              ))}
            {carts.length === 0 && (
              <h3 className="text-base font-medium">Giỏ hàng của bạn đang trống</h3>
            )}
          </div>
        </SectionWhite>
        <div className="bg-[#fafdff] px-4 py-6 border border-dotted border-[rgba(0,0,0,.09)] flex gap-x-8 gap-y-4 justify-between flex-col md:flex-row">
          <div className="flex flex-col flex-1 md:items-center md:flex-row gap-x-3 gap-y-2">
            <span>Lời nhắn: </span>
            <Input
              value={note}
              className="md:flex-1"
              placeholder="Lưu ý cho người bán"
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-x-4">
            <span className="text-green00b">Đơn vị vận chuyển:</span>
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
            <span className="text-base">{formatMoney(shippingFee)}</span>
          </div>
        </div>
        <div className="bg-[#fafdff] px-4 py-6 border border-dotted border-[#00000017] flex justify-end gap-x-4 gap-y-1 flex-col md:flex-row md:items-center">
          <span>Tổng số tiền ({carts.length} sản phẩm):</span>
          <ProductPriceSale className="text-lg font-medium">{price}</ProductPriceSale>
        </div>
        <div className="flex items-center justify-between section-dotted">
          <h3>Voucher Shopbee</h3>
          <div className="flex gap-x-5">
            {appliedVoucher?.code && (
              <span className="text-[#23c27f]">Đã chọn 1 mã giảm giá: {appliedVoucher.code}</span>
            )}
            <button type="button" className="text-[#05a] text-[15px]" onClick={toggleModal}>
              Chọn Voucher
            </button>
          </div>
        </div>
        <div className="flex flex-col mt-3 lg:items-center gap-x-4 gap-y-2 section-dotted lg:flex-row">
          <h3 className="text-base font-medium">Phương thức thanh toán</h3>
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
        <div className="flex p-4 items-center gap-x-4 border-dotted border border-[#00000017] bg-[#fff]">
          {methodPayment === "money" && (
            <div>
              <p>Thanh toán khi nhận hàng</p>
              <p>
                Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu hộ.
              </p>
            </div>
          )}
          {methodPayment === "credit-card" && (
            <div className="flex flex-col lg:items-center lg:flex-row gap-x-4 gap-y-2">
              <div className="w-14 rounded-sm border border-[#00000024]">
                <img alt="visa" className="h-8 mx-auto w-11" src="/images/icon-visa.png" />
              </div>
              <span>Họ tên: {currentUser.creditCard.name}</span>
              <span>Số thẻ: {currentUser.creditCard.number}</span>
              <span>Hết hạn: {currentUser.creditCard.expiry}</span>
            </div>
          )}
        </div>
        <OrderPayment
          price={price}
          shippingFee={carts.length > 0 ? shippingFee : 0}
          promotion={appliedVoucher.value || 0}
          total={carts.length > 0 ? total : 0}
        />
        <div className="bg-[#fffcf5] border-dotted border border-[rgba(0,0,0,.09)] flex flex-wrap-reverse justify-end px-4 py-6 gap-y-3 lg:items-center lg:justify-between">
          <span className="maxsm:hidden">
            Nhấn Đặt hàng đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Shopbee
          </span>
          <Button primary onClick={handleCheckout} className="py-3 text-base px-14">
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
