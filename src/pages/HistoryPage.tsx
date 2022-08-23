import { ProductGrid } from "modules/product";

const HistoryPage = () => {
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  return <ProductGrid products={history} />;
};

export default HistoryPage;
