import DashboardOverview from "modules/Dashboard/DashboardOverview";
import { Helmet } from "react-helmet-async";

const DashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>Trang tổng quan</title>
      </Helmet>
      <DashboardOverview />;
    </>
  );
};

export default DashboardPage;
