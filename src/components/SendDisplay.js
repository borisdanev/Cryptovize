import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, sendCrypto, updateUser } from "../store";
import useGetDate from "../hooks/useGetDate";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
const SendDisplay = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [ammount, setAmmount] = useState(0);
  const currentUser = useSelector((state) => state.user);
  const receiver = useSelector((state) => state.user.wallet.receiver);
  const coin = useSelector((state) => state.coins);
  const date = useGetDate();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleUpdate = async () => {
      await updateUser(currentUser);
      await updateUser(receiver);
    };
    if (!currentUser.error) handleUpdate();
  }, [currentUser, receiver]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const users = await getUsers();
    const receiver = users.find((user) => user.id === walletAddress);
    setWalletAddress("");
    setAmmount("");
    dispatch(
      sendCrypto({
        receiver,
        coin: {
          name: coin.name,
          quantity: ammount,
          symbol: coin.symbol,
          iconUrl: coin.iconUrl,
          price: Number(coin.price).toFixed(4),
          id: coin.uuid,
        },
        value: ammount,
        date,
      })
    );
  };
  return (
    <Box sx={{ mt: 5 }}>
      <Box sx={{ bgcolor: "#1a1a1a", px: 3, py: 2 }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormControl sx={{ width: "100%", mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Receiver Address
            </Typography>
            <OutlinedInput
              value={walletAddress}
              placeholder="Enter wallet address"
              sx={{ height: "2.5rem", width: "100%" }}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
            {currentUser.error && (
              <FormHelperText sx={{ color: "error.main" }}>
                {currentUser.error}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Ammount
            </Typography>
            <OutlinedInput
              value={ammount || ""}
              sx={{
                px: 1,
                height: "3rem",
                '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button':
                  {
                    display: "none",
                  },
              }}
              inputProps={{ min: 0, step: ".0001" }}
              type="number"
              startAdornment={
                <InputAdornment position="start">{coin?.symbol}</InputAdornment>
              }
              onChange={(e) => setAmmount(e.target.value)}
            />
          </FormControl>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              sx={{ width: "10rem", bgcolor: "#0b1c29", borderRadius: "15px" }}
              type="submit"
            >
              Send Coin
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
export default SendDisplay;
