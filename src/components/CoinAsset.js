import useScreenSize from "../hooks/useScreenSize";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
const CoinAsset = ({ coin }) => {
  const screenSize = useScreenSize();
  return (
    <Box mb={2}>
      <Grid container justifyContent="space-between" spacing={5}>
        <Grid item xs={6}>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <Avatar
                src={coin.iconUrl}
                style={{
                  width:
                    screenSize > 1150
                      ? "2.3rem"
                      : screenSize > 750
                      ? "2rem"
                      : "1.7rem",
                  height:
                    screenSize > 1150
                      ? "2.3rem"
                      : screenSize > 750
                      ? "2rem"
                      : "1.7rem",
                }}
              />
            </Grid>
            <Grid item xs={5} md={6}>
              <Typography sx={{ fontSize: "1rem" }}>{coin.name}</Typography>
              <Typography sx={{ color: "gray" }}>{coin.symbol}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
            {Number(coin.quantity).toFixed(4)}
          </Typography>
          <Typography sx={{ color: "gray" }}>
            {Number(coin.price).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CoinAsset;
