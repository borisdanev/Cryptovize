import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyCrypto } from "../store";
import useGetDate from "../hooks/useGetDate";
import Trading from "./Trading";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const BuyDisplay = () => {
  const [value, setValue] = useState(0);
  const [secondaryValue, setSecondaryValue] = useState(0);
  const coin = useSelector((state) => state.coins);
  const date = useGetDate();
  const dispatch = useDispatch();
  const primaryText = <Typography variant="h4">{`${value} USD`}</Typography>;
  const calculateValue = () => {
    return (value / coin.price).toFixed(4) !== 0
      ? (value / coin.price).toFixed(4)
      : 0;
  };
  const onSubmit = () => {
    if (value <= 0) return;
    dispatch(
      buyCrypto({
        value,
        date,
        coin: {
          name: coin.name,
          quantity: secondaryValue,
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
        type="buy"
        value={value}
        secondaryValue={secondaryValue}
        setSecondaryValue={setSecondaryValue}
        setValue={setValue}
        coin={coin}
        calculateValue={calculateValue}
        primaryText={primaryText}
        onSubmit={onSubmit}
      />
    </Box>
  );
};
export default BuyDisplay;
