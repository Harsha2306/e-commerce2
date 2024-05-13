const useGetPrice = (itemPrice, itemDiscount) => {
  const hasDiscount = itemDiscount === 0 ? false : true;
  let discountedPrice;
  if (itemDiscount) {
    discountedPrice = Math.round(itemPrice - itemPrice * (itemDiscount / 100));
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(hasDiscount ? discountedPrice : itemPrice);
};

export default useGetPrice;
