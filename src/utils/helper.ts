export const formatVNDCurrency = (money: number) => {
  return money.toLocaleString("vi", { style: "currency", currency: "VND" });
};

export const formatCash = (num: number) => {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1).replace(/\.0$/, "")}b`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}m`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return num;
};