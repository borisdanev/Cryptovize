const useGetPeriod = () => {
  return (period, timestamp) => {
    const date = new Date(timestamp * 1000);
    if (period === "24h") {
      const hours = date.getHours();
      const ampm = hours >= 12 ? "pm" : "am";
      const formattedHours = hours % 12 || 12;
      return formattedHours + ampm;
    }
    if (period === "7d" || period === "30d") {
      const month = date.toLocaleString("default", { month: "short" });
      const day = date.getDate();
      return `${month} ${day}`;
    }
  };
};
export default useGetPeriod;
