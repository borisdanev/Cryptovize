const useNearestPrice = () => {
  return (num) => {
    const digits = Math.round(num).toString().length;
    let divider;
    if (digits === 1) divider = 0.1;
    if (digits === 2) divider = 10;
    if (digits === 3) divider = 100;
    if (digits === 4) divider = 1000;
    if (digits === 5) divider = 10000;
    return Math.round(num / divider) * divider;
  };
};
export default useNearestPrice;
