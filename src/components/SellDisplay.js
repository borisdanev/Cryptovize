import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sellCrypto } from "../store";
import useGetDate from "../hooks/useGetDate";
import Trading from "./Trading";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const SellDisplay = () => {
  const [coinValue, setCoinValue] = useState(0);
  const [secondaryValue, setSecondaryValue] = useState(0);
  const dispatch = useDispatch();
  const date = useGetDate();
  const coin = useSelector((state) => state.coins);
  const primaryText = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <img src={coin.iconUrl} style={{ width: "30px", height: "30px" }} />
      <Typography sx={{ ml: 2 }} variant="h5">
        {coin.name}
      </Typography>
    </Box>
  );
  const calculateValue = () => {
    return (coin.price * coinValue).toFixed(4) !== 0
      ? (coin.price * coinValue).toFixed(4)
      : 0;
  };
  const onSubmit = () => {
    if (coinValue <= 0) return;
    dispatch(
      sellCrypto({
        value: secondaryValue,
        date,
        coin: {
          name: coin.name,
          quantity: coinValue,
          symbol: coin.symbol,
          iconUrl: coin.iconUrl,
          price: Number(coin.price).toFixed(4),
          id: coin.uuid,
        },
      })
    );
  };
  return (
    <Box>
      <Trading
        type="sell"
        value={coinValue}
        setValue={setCoinValue}
        secondaryValue={secondaryValue}
        setSecondaryValue={setSecondaryValue}
        coin={coin}
        calculateValue={calculateValue}
        primaryText={primaryText}
        onSubmit={onSubmit}
      />
    </Box>
  );
};
export default SellDisplay;
