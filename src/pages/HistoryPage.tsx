import ProductList from "modules/Product/ProductList";
import { Helmet } from "react-helmet-async";
import { getHistoryLocalStorage, removeHistoryLocalStorage, swalDelete } from "utils";

const HistoryPage = () => {
  const history = getHistoryLocalStorage();
  const handleClearHistory = () => {
    swalDelete(() => {
      removeHistoryLocalStorage();
      window.location.reload();
    });
  };
  return (
    <>
      <Helmet>
        <title>Lịch sử xem gần đây</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium">Lịch sử xem gần đây</h2>
        {history.length > 0 && (
          <button type="button" onClick={handleClearHistory}>
            Xóa tất cả
          </button>
        )}
      </div>
      {history.length > 0 ? (
        <ProductList products={history} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 h-[300px] mt-3">
          <img src="/history.png" alt="history" className="w-20 h-20" />
          <h3>Lịch sử xem trống</h3>
        </div>
      )}
    </>
  );
};

export default HistoryPage;
