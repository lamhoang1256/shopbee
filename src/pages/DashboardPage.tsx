import { DashboardNeedWork } from "modules/_dashboard";
import { Helmet } from "react-helmet-async";

const DashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>Trang tổng quan</title>
      </Helmet>
      <DashboardNeedWork />;
    </>
  );
};

export default DashboardPage;
