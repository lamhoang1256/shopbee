import { HomeBanner, HomeCategories, HomeFeatured } from "modules/home";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Shopbee Việt Nam | Mua và Bán trên ứng dụng di động hoặc website</title>
      </Helmet>
      <HomeBanner />
      <HomeCategories />
      <HomeFeatured />
    </>
  );
};

export default HomePage;
