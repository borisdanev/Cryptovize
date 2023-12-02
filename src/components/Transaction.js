import useScreenSize from "../hooks/useScreenSize";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import SwapVertIcon from "@mui/icons-material/SwapVert";
const Transaction = ({ transaction }) => {
  const screenSize = useScreenSize();
  const selectIcon = () => {
    if (transaction.type === 0)
      return (
        <Typography color="success.main">
          <SouthIcon />
        </Typography>
      );
    if (transaction.type === 1)
      return (
        <Typography color="error.main">
          <NorthIcon />
        </Typography>
      );
    if (transaction.type === 2) return <SwapVertIcon />;
  };
  return (
    <Grid container>
      <Grid item xs={8} md={6}>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            {selectIcon()}
          </Grid>
          <Grid item xs={10}>
            <Typography>
              {`${transaction.action} ${transaction.coin.name}`}
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", color: "gray" }}>
              {transaction.date}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4} md={6}>
        <Box textAlign="end">
          <Typography>{transaction.coin.quantity}</Typography>
          <Typography sx={{ color: "gray" }}>
            {transaction?.type !== 2
              ? Number(transaction.value).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              : ` ${Number(transaction.value).toFixed(4)}
            ${transaction?.tradingCoin?.symbol}`}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Transaction;
