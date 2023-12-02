import { useSelector } from "react-redux";
import useScreenSize from "../hooks/useScreenSize";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CoinAsset from "./CoinAsset";
import Transaction from "./Transaction";
const WalletDisplay = () => {
  const coins = useSelector((state) => state.user.wallet.coins);
  const transactions = useSelector((state) => state.user.wallet.transactions);
  const screenSize = useScreenSize();
  return (
    <Box
      sx={{
        bgcolor: "#0b1c29",
        mt: 5,
        px: screenSize > 900 ? 3 : 1,
        pr: 0,
        height: "23rem",
        borderRadius: "12px",
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid
          item
          xs={6}
          className="scrollable-list"
          sx={{ overflowY: "auto", maxHeight: "100%" }}
        >
          <Box sx={{ py: 2 }}>
            <Typography sx={{ mb: 1 }} className="h6">
              My Assets
            </Typography>
            {coins.length > 0 ? (
              coins.map((item) => <CoinAsset key={item.symbol} coin={item} />)
            ) : (
              <Typography fontSize="1.3rem" color="info.main">
                No coins owned yet.
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          className="scrollable-list"
          sx={{ overflowY: "auto", maxHeight: "100%" }}
        >
          <Box sx={{ py: 2, pr: 1 }}>
            <Typography sx={{ mb: 1 }} className="h6">
              Latest Transactions
            </Typography>
            {transactions.length > 0 ? (
              transactions.map((transaction, i) => (
                <Transaction key={i} transaction={transaction} />
              ))
            ) : (
              <Typography fontSize="1.3rem" color="info.main">
                No transaction history
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default WalletDisplay;
