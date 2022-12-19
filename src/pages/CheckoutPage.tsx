import { IPayloadBuyProduct, IVoucher } from "@types";
import { productAPI, shopAPI } from "apis";
import Button from "components/Button";
import ButtonOutline from "components/ButtonOutline";
import { IconGPS } from "components/Icons";
import Input from "components/Input";
import Logo from "components/Logo";
import { PATH } from "constants/path";
import useModal from "hooks/useModal";
import OrderPayment from "modules/Order/OrderPayment";
import OrderProduct from "modules/Order/OrderProduct";
import { ProductPriceSale } from "modules/Product/ProductPrice";
import ModalApplyVoucher from "modules/Voucher/ModalApplyVoucher";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "store/globalStore";
import { calcShippingFee, calcTotalPrice, formatDateVN, formatMoney } from "utils";
import { sweetAlertInfo, sweetAlertQuestion } from "utils/sweetalert2";

type MethodPaymentType = "money" | "credit-card";
const CheckoutPage = () => {
  const navigate = useNavigate();
  const { currentUser, carts, setCarts } = useStore((state) => state);
  const { isShow, toggleModal } = useModal();
  const [shippingFee, setShippingFee] = useState(0);
  const [note, setNote] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<IVoucher>(Object);
  const [methodPayment, setMethodPayment] = useState<MethodPaymentType>("money");
  const totalProductsPrice = useMemo(() => calcTotalPrice(carts, "price"), [carts]);
  const totalPayment = useMemo(
    () => totalProductsPrice + shippingFee - (appliedVoucher.value || 0) || 0,
    [totalProductsPrice, shippingFee, appliedVoucher.value]
  );
  useQuery({
    queryKey: ["shopinfo"],
    queryFn: () => shopAPI.getShopInfo(),
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(currentUser?.city),
    onSuccess({ data }) {
      setShippingFee(calcShippingFee(data.city.id, currentUser.city.id));
    }
  });
  const buyProductsMutation = useMutation({
    mutationFn: (payload: IPayloadBuyProduct) => productAPI.buyProducts(payload),
    onSuccess: ({ data, message }) => {
      toast.success(message);
      setCarts([]);
      navigate(`${PATH.order}/${data?._id}`);
    },
    onError(error: any) {
      toast.error(error?.message);
    }
  });
  const handleCheckout = () => {
    if (carts.length <= 0) {
      const navigateToCartPage = () => navigate(PATH.cart);
      sweetAlertInfo(
        "Giỏ hàng của bạn đang trống",
        "Vui lòng kiểm tra giỏ hàng và thử lại",
        navigateToCartPage
      );
      return;
    }
    if (!currentUser.fullname || !currentUser.phone || !currentUser.address) {
      const navigateToProfilePage = () => navigate(PATH.profile);
      sweetAlertInfo(
        "Thông tin nhận hàng đang trống",
        "Vui lòng kiểm tra thông tin và thử lại",
        navigateToProfilePage
      );
      return;
    }
    const orderItems = carts.map((cart) => ({
      quantity: cart.quantity,
      product: cart.product._id
    }));
    const values = {
      orderItems,
      shippingTo: currentUser.address,
      price: totalProductsPrice,
      note,
      shippingFee,
      promotion: appliedVoucher.value || 0,
      total: totalPayment,
      voucherCode: appliedVoucher.code,
      methodPayment
    };
    sweetAlertQuestion("Xác nhận", "Bạn có chắc chắc muốn thanh toán?", () =>
      buyProductsMutation.mutate(values)
    );
  };
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
        <div className="mt-3 gradient-line" />
        <div className="text-base font-medium rounded-tl-none rounded-tr-none section-white">
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
        </div>
        <div className="mt-3 section-white">
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
        </div>
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
        <div className="bg-[#fafdff] px-4 py-6 border border-dotted border-black017 flex justify-end gap-x-4 gap-y-1 flex-col md:flex-row md:items-center">
          <span>Tổng số tiền ({carts.length} sản phẩm):</span>
          <ProductPriceSale className="text-lg font-medium">{totalProductsPrice}</ProductPriceSale>
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
        <div className="flex p-4 items-center gap-x-4 border-dotted border border-black017 bg-[#fff]">
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
                <img alt="visa" className="h-8 mx-auto w-11" src="/icon-visa.png" />
              </div>
              <span>Họ tên: {currentUser.creditCard.name}</span>
              <span>Số thẻ: {currentUser.creditCard.number}</span>
              <span>Hết hạn: {currentUser.creditCard.expiry}</span>
            </div>
          )}
        </div>
        <OrderPayment
          totalProductsPrice={totalProductsPrice}
          shippingFee={carts.length > 0 ? shippingFee : 0}
          promotion={appliedVoucher.value || 0}
          totalPayment={carts.length > 0 ? totalPayment : 0}
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
        isShow={isShow}
        closeModal={toggleModal}
        appliedVoucher={appliedVoucher}
        setAppliedVoucher={setAppliedVoucher}
      />
    </>
  );
};

export default CheckoutPage;
