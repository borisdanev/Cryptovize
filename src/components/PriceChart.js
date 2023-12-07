import { useEffect, useState } from "react";
import useNearestPrice from "../hooks/useNearestPrice";
import useGetPeriod from "../hooks/useGetPeriod";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const PriceChart = ({ data, period }) => {
  const [chartData, setChartData] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const getNearestPrice = useNearestPrice();
  const getPeriod = useGetPeriod();
  useEffect(() => {
    const chunkSize = Math.ceil(data?.length / 7);
    const dividedArrays = Array.from({ length: 7 }, (_, i) =>
      data?.slice(i * chunkSize, (i + 1) * chunkSize)
    );
    let chartData = dividedArrays.map((arr) => arr?.shift());
    let maxPrice = data?.reduce(
      (max, obj) => (obj.price > max ? obj.price : max),
      0
    );
    maxPrice = getNearestPrice(maxPrice);
    setMaxPrice(maxPrice);
    chartData = chartData.map((item) => ({
      ...item,
      timestamp: getPeriod(period, item?.timestamp),
    }));
    setChartData(chartData.reverse());
  }, [data, period]);
  return (
    <div>
      <ResponsiveContainer width="95%" height={330}>
        <AreaChart
          width={"50rem"}
          height={"18.75rem"}
          data={chartData}
          syncId="anyId"
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" dy={5} />
          <YAxis
            tickCount={6}
            domain={[0, maxPrice + getNearestPrice(maxPrice / 3) * 2]}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#0b1c29"
            fill="#0b1c29"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default PriceChart;
