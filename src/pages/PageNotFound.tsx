import Button from "components/Button";
import { PATH } from "constants/path";
import { Helmet } from "react-helmet-async";

const PageNotFound = () => {
  return (
    <div className="layout-container">
      <Helmet>
        <title>Không tìm thấy trang</title>
      </Helmet>
      <div className="bg-white shadow1 max-w-[767px] rounded-lg mt-8 mx-auto text-center px-7 pb-10 pt-0">
        <img src="/images/page-404.jpg" alt="404" className="mx-auto w-full max-w-[400px]" />
        <h1 className="mb-4 -mt-4 md:text-lg font-semibold text-[#566278]">
          Trang bạn tìm không tồn tại. Vui lòng quay trở lại trang chủ.
        </h1>
        <Button primary to={PATH.home}>
          Quay về trang chủ
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
