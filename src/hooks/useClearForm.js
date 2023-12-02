const useClearForm = () => {
  return (obj) => {
    Object.keys(obj).forEach((key) => {
      obj[key] = "";
    });
  };
};
export default useClearForm;
