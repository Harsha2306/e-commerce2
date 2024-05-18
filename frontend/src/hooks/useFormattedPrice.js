const useFormattedPrice = (price) => {
  return !price
    ? ""
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
      }).format(price);
};

export default useFormattedPrice;
