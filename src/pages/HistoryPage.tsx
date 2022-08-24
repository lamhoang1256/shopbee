import { ProductGrid } from "modules/product";

const HistoryPage = () => {
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  const handleClearHistory = () => {
    localStorage.removeItem("history");
    window.location.reload();
  };
  return (
    <>
      <div>
        <button type='button' onClick={handleClearHistory}>
          Xóa
        </button>
      </div>
      <ProductGrid products={history} />
    </>
  );
};

export default HistoryPage;
