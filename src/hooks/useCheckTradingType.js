const useCheckTradingType = (type) => {
  return (primary, secondary) => {
    return type === "buy" ? primary : secondary;
  };
};
export default useCheckTradingType;
