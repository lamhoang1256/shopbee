import { IconPaymentList } from "components/_icons";
import classNames from "utils/classNames";

const customerCares = [
  "Trung Tâm Trợ Giúp",
  "Shopbee Mall",
  "Hướng Dẫn Mua Hàng",
  "Chăm Sóc Khách Hàng"
];
const abouts = [
  "Giới Thiệu Về Shopbee Việt Nam",
  "Tuyển Dụng",
  "Điều Khoản Shopbee",
  "Chính Sách Bảo Mật"
];
const socials = [
  { display: "Facebook", image: "/images/icon-facebook.png" },
  { display: "Instagram", image: "/images/icon-instagram.png" },
  { display: "Linked", image: "/images/icon-linked.png" }
];
const downloads = [
  { key: "download-playstore", image: "/images/download-playstore.png" },
  { key: "download-appstore", image: "/images/download-appstore.png" },
  { key: "download-appgallery", image: "/images/download-appgallery.png" }
];

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer
      className={classNames(
        "text-[#000000a6] bg-[#fbfbfb] py-10 border-t-4 border-orangeee4",
        className
      )}
    >
      <div className="layout-container">
        <div className="grid grid-cols-2 text-xs gap-x-2 gap-y-6 lg:grid-cols-5">
          <div>
            <h3 className="text-[#000000de] font-semibold">CHĂM SÓC KHÁCH HÀNG</h3>
            <ul className="flex flex-col mt-5 gap-y-3">
              {customerCares.map((item) => (
                <li key={item} className="cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#000000de] font-semibold">VỀ SHOPBEE</h3>
            <ul className="flex flex-col mt-5 gap-y-3">
              {abouts.map((item) => (
                <li key={item} className="cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#000000de] font-semibold">THANH TOÁN</h3>
            <IconPaymentList />
          </div>
          <div>
            <h3 className="text-[#000000de] font-semibold">THEO DÕI CHÚNG TÔI TRÊN</h3>
            <ul className="flex flex-col mt-5 gap-y-3">
              {socials.map((social) => (
                <li className="flex items-center gap-x-2" key={social.display}>
                  <img
                    key={social.display}
                    alt={social.display}
                    src={social.image}
                    className="w-[18px] h-[18px] cursor-pointer"
                  />
                  <span className="cursor-pointer">{social.display}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden lg:block">
            <h3 className="text-[#000000de] font-semibold">TẢI ỨNG DỤNG SHOPBEE NGAY THÔI</h3>
            <div className="flex gap-3 mt-5">
              <img
                src="/images/download-qrcode.png"
                alt="download-qrcode"
                className="w-20 h-20 cursor-pointer"
              />
              <div className="flex flex-col justify-between">
                {downloads.map((download) => (
                  <img
                    key={download.key}
                    alt={download.key}
                    src={download.image}
                    className="h-[22px] w-fit cursor-pointer"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="layout-container">
        <div className="my-10 py-7 border-t border-b border-[#0000001a] flex flex-col items-center justify-between md:flex-row">
          <span>©2022 Shopbee. Tất cả các quyền được bảo lưu.</span>
          <span>Ngôn ngữ: Tiếng Anh Tiếng Việt</span>
        </div>
        <div className="mt-8 text-xs md:text-center">
          <p className="mb-4"> Công ty TNHH Shoppee</p>
          <p>
            Địa chỉ: Tầng 22, Tòa nhà Inter Lotte Hà Nội, 54 Liễu Giai, phường Cống Vị, Quận Ba
            Đình, Hà Nội. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopbee.vn
          </p>
          <p>
            Mã số doanh nghiệp: 01067111173786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày
            10/02/2016
          </p>
          <p>©2015 - Bản quyền thuộc về Công ty TNHH MyShop</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
