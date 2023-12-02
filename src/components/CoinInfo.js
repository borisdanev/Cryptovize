import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
const CoinInfo = ({ name, price, change, marketCap, iconUrl }) => {
  return (
    <Box sx={{ mb: 3 }} onClick={() => console.log("here")}>
      <Grid container>
        <Grid xs={4} sx={{ display: "flex", alignItems: "center" }} item>
          <img
            src={iconUrl}
            style={{ display: "inlineBlock", width: "20px", height: "20px" }}
          />
          <Typography sx={{ display: "inline-block", ml: 2 }}>
            {name}
          </Typography>
        </Grid>
        <Grid xs={3} item>
          <Typography>{`$${price}`}</Typography>
        </Grid>
        <Grid xs={3} item>
          <Typography>{`$${
            (parseInt(marketCap) / 1000000000).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) + " Billion"
          }`}</Typography>
        </Grid>
        <Grid xs={2} item>
          <Typography
            color={`${change >= 0 ? "success.main" : "error.main"}`}
          >{`${change > 0 ? "+" + change : change}%`}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CoinInfo;
