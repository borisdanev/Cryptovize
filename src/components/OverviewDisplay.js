import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetCoinPriceQuery } from "../store/apis/cryptoApi";
import useScreenSize from "../hooks/useScreenSize";
import PriceChart from "./PriceChart";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
const OverviewDisplay = () => {
  const coin = useSelector((state) => state.coins);
  const [period, setPeriod] = useState("24h");
  const [activeButton, setActiveButton] = useState("24h");
  const { data, error, isLoading } = useGetCoinPriceQuery({
    id: coin.uuid,
    period,
  });
  const screenSize = useScreenSize();
  const CustomButton = styled(Button)({
    borderColor: "white",
    color: "white",
    borderRadius: "1rem",
    marginRight: "0.7rem",
    "&:hover": {
      border: "1px solid white",
      color: screenSize < 800 && "black",
      backgroundColor: screenSize < 800 && "white",
    },
  });
  const periods = [
    { label: "3 hours", value: "3h" },
    { label: "24 hours", value: "24h" },
    { label: "7 days", value: "7d" },
    { label: "30 days", value: "30d" },
  ];
  return (
    <Box sx={{ pt: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
        {periods.map((item) => (
          <CustomButton
            key={item.value}
            variant="outlined"
            className="h6"
            sx={{
              backgroundColor: activeButton === item.value && "white",
              color: activeButton === item.value && "black",
            }}
            c
            onClick={() => {
              setPeriod(item.value);
              setActiveButton(item.value);
            }}
          >
            <Typography sx={{ margin: 0 }}>{item.label}</Typography>
          </CustomButton>
        ))}
      </Box>
      <PriceChart data={data?.data?.history} period={period} />
    </Box>
  );
};
export default OverviewDisplay;
