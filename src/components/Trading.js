import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useScreenSize from "../hooks/useScreenSize";
import useCheckTradingType from "../hooks/useCheckTradingType";
import { updateUser, clearError } from "../store";
import CoinSelector from "./CoinSelector";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import SouthIcon from "@mui/icons-material/South";
import SwapVertIcon from "@mui/icons-material/SwapVert";
const style = {
  input: {
    px: 1,
    height: "3rem",
    mt: 1,
    '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button':
      {
        display: "none",
      },
  },
};
const Trading = ({
  type,
  value,
  setValue,
  secondaryValue,
  setSecondaryValue,
  coin,
  calculateValue,
  primaryText,
  onSubmit,
  tradingCoin,
  setTradingCoin,
}) => {
  const currentUser = useSelector((state) => state.user);
  const checkType = useCheckTradingType(type);
  const dispatch = useDispatch();
  const screenSize = useScreenSize();
  useEffect(() => {
    const setData = async () => {
      await updateUser(currentUser);
    };
    if (!currentUser.error) setData();
  }, [currentUser]);
  useEffect(() => {
    const calculatedValue = calculateValue();
    if (calculatedValue > 0) setSecondaryValue(calculatedValue);
  }, [value, coin, tradingCoin]);
  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setValue(e.target.value);
      if (currentUser.error) dispatch(clearError());
    } else {
      setValue(0);
      setSecondaryValue(0);
    }
  };
  const handleSubmit = async (e) => {
    console.log("submitting");
    e.preventDefault();
    onSubmit();
    setValue(0);
    setSecondaryValue(0);
  };
  const primaryEl = (
    <Box sx={{ p: 3, bgcolor: "#1a1a1a", borderRadius: "15px" }}>
      {primaryText}
      <FormControl>
        <Typography>Ammount</Typography>
        <OutlinedInput
          sx={style.input}
          inputProps={{ min: 0, step: ".0001" }}
          value={value ? value : ""}
          type="number"
          startAdornment={
            <InputAdornment position="start">
              {checkType("$", coin.symbol)}
            </InputAdornment>
          }
          onChange={handleChange}
        />
        {currentUser.error && (
          <FormHelperText sx={{ color: "error.main", fontSize: "0.8rem" }}>
            {currentUser.error}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
  const secondaryEl = (
    <Box
      sx={{
        bgcolor: "#1a1a1a",
        borderRadius: "15px",
        p: 3,
        height: "100%",
      }}
    >
      <Typography variant="h4" sx={{ mt: 2 }}>
        {`${secondaryValue} ` +
          (type === "buy" || type === "swap"
            ? type === "buy"
              ? coin.symbol
              : tradingCoin.symbol
            : "USD")}
      </Typography>
      {type === "swap" && (
        <CoinSelector
          style={{
            mt: 1,
            width: "50%",
            bgcolor: "inherit",
            border: "1px solid rgba(255, 255, 255, 0.23)",
          }}
          setTradingCoin={setTradingCoin}
        />
      )}
    </Box>
  );
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ pt: 3, position: "relative" }}>
          <Grid item xs={12}>
            {primaryEl}
          </Grid>
          <Grid item xs={12}>
            {secondaryEl}
          </Grid>
          <Box
            sx={{
              position: "absolute",
              top: type === "swap" ? "50%" : "57%",
              p: 1,
              width: "3.2rem",
              height: "3.2rem",
              bgcolor: "#0b1c29",
              left: "48%",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {type === "buy" || type === "sell" ? (
              <SouthIcon />
            ) : (
              <SwapVertIcon />
            )}
          </Box>
        </Grid>
        <Box
          sx={{ width: screenSize > 900 ? "25%" : "33%", mx: "auto", mt: 3 }}
        >
          {type === "buy" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="h5">Total:</Typography>
              <Typography variant="h5">{`$${value}`}</Typography>
            </Box>
          )}
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "100%",
              bgcolor: "#0b1c29",
              color: "white",
              px: 2,
              py: 1,
              justifyContent: "space-between",
              borderRadius: "15px",
            }}
          >
            {type !== "swap" && (
              <img
                src={coin.iconUrl}
                style={{
                  width: screenSize > 600 ? "30px" : "25px",
                  height: screenSize > 600 ? "30px" : "25px",
                }}
                alt="coin logo"
              />
            )}
            {type !== "swap" ? (
              <Typography align="center">{`${checkType("Buy", "Sell")} ${
                coin.name
              }`}</Typography>
            ) : (
              <Typography>Swap</Typography>
            )}
          </Button>
        </Box>
      </form>
    </>
  );
};
export default Trading;
