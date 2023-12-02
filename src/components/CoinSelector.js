import { useEffect, useState } from "react";
import { useGetCoinsQuery } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { selectCoin } from "../store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Selector from "./Selector";
const CoinSelector = ({ main, style, setTradingCoin }) => {
  const dispatch = useDispatch();
  const [openSelector, setOpenSelector] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const currentCoin = useSelector((state) => state.coins);
  const { data, error, isLoading } = useGetCoinsQuery({
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    orderBy: "marketCap",
    orderDirection: "desc",
  });
  const coins = data?.data?.coins;
  useEffect(() => {
    if (main) {
      setSelectedOption(data?.data?.coins[0]);
      dispatch(selectCoin(data?.data?.coins[0]));
    } else setSelectedOption(currentCoin);
  }, [data]);
  if (isLoading) return <div>Loading...</div>;
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    main ? dispatch(selectCoin(option)) : setTradingCoin(option);
    setOpenSelector(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "rgb(18, 18, 18)",
        p: 1,
        position: "relative",
        ...style,
      }}
      onClick={() => setOpenSelector(!openSelector)}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#262626",
            p: 1,
          }}
        >
          <img
            src={selectedOption?.iconUrl}
            style={{ width: "20px", height: "20px" }}
          />
        </Box>
        <Typography ml={1} mr={3}>
          {selectedOption?.name}
        </Typography>
        <Typography>{selectedOption?.symbol}</Typography>
      </Box>
      <ExpandMoreIcon />
      {openSelector && (
        <Selector
          options={coins}
          handleOptionClick={handleOptionClick}
          style={{ bgcolor: "#262626", color: "white", height: "10rem" }}
          data={[
            { value: "iconUrl", isText: false },
            { value: "name", isText: true },
            { value: "symbol", isText: true },
          ]}
        />
      )}
    </Box>
  );
};
export default CoinSelector;
