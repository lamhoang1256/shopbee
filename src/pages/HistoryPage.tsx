import { ProductGrid } from "modules/product";

const HistoryPage = () => {
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  const handleClearHistory = () => {
    localStorage.removeItem("history");
    window.location.reload();
  };
  return (
    <>
      <div className='flex items-center justify-between'>
        <h2 className='text-base font-medium'>Lịch sử xem gần đây</h2>
        {history.length > 0 && (
          <button type='button' onClick={handleClearHistory}>
            Xóa tất cả
          </button>
        )}
      </div>
      {history.length > 0 ? (
        <ProductGrid products={history} />
      ) : (
        <div className='flex flex-col items-center justify-center gap-2 h-[300px] mt-3'>
          <img src='/images/history.png' alt='history' className='w-20 h-20' />
          <h3>Lịch sử xem trống</h3>
        </div>
      )}
    </>
  );
};

export default HistoryPage;
