import { memo } from "react";
import { Helmet } from "react-helmet-async";

const server = process.env.REACT_APP_API_SERVER;

interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
}

const Meta = ({ title, description, image }: MetaProps) => {
  return (
    <Helmet>
      {/* HTML Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} key="title" />
      <meta name="robots" content="index,follow" />
      <meta name="description" content={description} key="description" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" key="viewport" />
      <link rel="icon" href="/favicon.ico" key="favicon" />
      <link rel="canonical" href={server} key="canonical" />
      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content={title} key="gg-name" />
      <meta itemProp="description" content={description} key="gg-description" />
      <meta itemProp="image" content={image} key="gg-image" />
      {/* Facebook Meta Tags  */}
      <meta property="og:type" content="website" key="og-type" />
      <meta property="og:title" content={title} key="og-title" />
      <meta property="og:description" content={description} key="og-description" />
      <meta property="og:image" content={image} key="og-image" />
      <meta property="og:image:alt" content={description} key="og-image-alt" />
      <meta property="og:locale" content="vi_VN" key="og-locale" />
      <meta property="og:url" content={window.location.href} key="og-url" />
      {/* Twitter Meta Tags */}
      <meta property="twitter:card" content="summary_large_image" key="twitter-card" />
      <meta property="twitter:url" content={window.location.href} key="twitter-url" />
      <meta property="twitter:title" content={title} key="twitter-title" />
      <meta property="twitter:description" content={description} key="twitter-desc" />
      <meta property="twitter:image" content={image} key="twitter-image" />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Shopbee Việt Nam | Mua và Bán trên ứng dụng di động hoặc website",
  description:
    "Mua sắm trực tuyến hàng triệu sản phẩm ở tất cả ngành hàng...Giá tốt & nhiều ưu đãi. Mua và bán online trong 30 giây. Shopee đảm bảo nhận hàng hoặc hoàn tiền. Shopbee Đảm Bảo | Miễn Phí Vận Chuyển | Gợi Ý Hôm Nay",
  image: `/preview-home.png`
};

export default memo(Meta);
