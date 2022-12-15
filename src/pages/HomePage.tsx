import HomeBanner from "modules/Home/HomeBanner";
import HomeCategories from "modules/Home/HomeCategories";
import HomeProducts from "modules/Home/HomeProducts";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Shopbee Việt Nam | Mua và Bán trên ứng dụng di động hoặc website</title>
      </Helmet>
      <HomeBanner />
      <HomeCategories />
      <HomeProducts />
    </>
  );
};

export default HomePage;
