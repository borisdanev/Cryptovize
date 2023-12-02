const useGetDate = () => {
  const date = new Date();
  const currentDate = date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return currentDate;
};
export default useGetDate;
