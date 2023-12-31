import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { swapCrypto } from "../store";
import useGetDate from "../hooks/useGetDate";
import Trading from "./Trading";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const SwapDisplay = () => {
  const [value, setValue] = useState(0);
  const [secondaryValue, setSecondaryValue] = useState(0);
  const coin = useSelector((state) => state.coins);
  const [tradingCoin, setTradingCoin] = useState(coin);
  const date = useGetDate();
  const dispatch = useDispatch();
  const primaryText = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={coin.iconUrl}
        style={{ width: "30px", height: "30px" }}
        alt="coin logo"
      />
      <Typography sx={{ ml: 2 }} variant="h5">
        {coin.name}
      </Typography>
    </Box>
  );
  const makeCoin = (coin, value) => ({
    name: coin.name,
    quantity: value,
    symbol: coin.symbol,
    iconUrl: coin.iconUrl,
    price: Number(coin.price).toFixed(4),
    id: coin.uuid,
  });
  const calculateValue = () => {
    const currentCoinPrice = +coin.price;
    const tradingCoinPrice = +tradingCoin.price;
    return ((value * currentCoinPrice) / tradingCoinPrice).toFixed(6);
  };
  const onSubmit = () => {
    if (value <= 0) return;
    dispatch(
      swapCrypto({
        value: secondaryValue,
        date,
        coin: makeCoin(coin, value),
        tradingCoin: makeCoin(tradingCoin, secondaryValue),
      })
    );
  };
  return (
    <Box>
      <Trading
        type="swap"
        value={value}
        setValue={setValue}
        secondaryValue={secondaryValue}
        setSecondaryValue={setSecondaryValue}
        coin={coin}
        primaryText={primaryText}
        calculateValue={calculateValue}
        onSubmit={onSubmit}
        tradingCoin={tradingCoin}
        setTradingCoin={setTradingCoin}
      />
    </Box>
  );
};
export default SwapDisplay;
