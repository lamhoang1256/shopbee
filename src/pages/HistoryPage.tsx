import { IProduct } from "@types";
import { ProductCard } from "modules/product";

const HistoryPage = () => {
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  return (
    <div className='my-3 product-grid'>
      {history?.map((product: IProduct) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
};

export default HistoryPage;
