import { useState } from "react";
import { useGetCoinsQuery } from "../store";
import useScreenSize from "../hooks/useScreenSize";
import CoinInfoList from "./CoinInfoList";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TuneIcon from "@mui/icons-material/Tune";
import Selector from "./Selector";
import Skeleton from "@mui/material/Skeleton";
const MarketDataDisplay = () => {
  const [category, setCategory] = useState("marketCap");
  const [order, setOrder] = useState("desc");
  const { data, error, isLoading } = useGetCoinsQuery({
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    orderBy: category,
    orderDirection: order,
  });
  const [openSelector, setOpenSelector] = useState(false);
  const screenSize = useScreenSize();
  if (isLoading) {
    return (
      <Box pt={5}>
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center" }}>
              <Skeleton
                variant="circular"
                width="2rem"
                height="2rem"
              ></Skeleton>
              <Skeleton
                sx={{ width: "90%", height: "3rem", marginLeft: "0.5rem" }}
              ></Skeleton>
            </Box>
          ))}
      </Box>
    );
  }
  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }
  const handleCategoryClick = (option) => {
    setCategory(option.value);
    setOrder(option.order);
    setOpenSelector(false);
  };
  const categories = [
    { name: "Market cap", value: "marketCap", order: "desc" },
    { name: "Higest Price", value: "price", order: "desc" },
    { name: "Lowest Price", value: "price", order: "asc" },
    { name: "Best Performance", value: "change", order: "desc" },
    { name: "Worst Performance", value: "change", order: "asc" },
  ];
  return (
    <Box
      sx={{
        mt: 3,
        height: "23rem",
        pb: 4,
        pl: screenSize > 1120 ? 0 : 1,
      }}
    >
      <Grid container sx={{ mb: 2, pr: 3 }}>
        <Grid xs={4} item>
          <Typography sx={{ mt: 1 }}>Name</Typography>
        </Grid>
        <Grid xs={3} item>
          <Typography sx={{ mt: 1 }}>Price</Typography>
        </Grid>
        <Grid xs={3} item>
          <Typography sx={{ mt: 1 }}>Market cap</Typography>
        </Grid>
        <Grid
          xs={2}
          item
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Typography sx={{ mt: 1 }}>24h</Typography>
          <IconButton
            aria-label="tune"
            onClick={() => setOpenSelector(!openSelector)}
          >
            <TuneIcon />
          </IconButton>
          {openSelector && (
            <Selector
              options={categories}
              active={category}
              handleOptionClick={handleCategoryClick}
              data={[{ value: "name", isText: true }]}
              style={{ bgcolor: "#262626", color: "white" }}
            />
          )}
        </Grid>
      </Grid>
      <Box
        className="scrollable-list"
        sx={{ overflowY: "scroll", height: "100%" }}
      >
        <CoinInfoList coins={data?.data?.coins} />
      </Box>
    </Box>
  );
};
export default MarketDataDisplay;
