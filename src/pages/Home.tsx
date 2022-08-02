import { HomeBanner, HomeCategories, HomeFeatured } from "modules/home";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      {/* <HomeFlashSale /> */}
      <HomeCategories />
      {/* <HomeSuggest /> */}
      <HomeFeatured />
    </div>
  );
};

export default Home;
