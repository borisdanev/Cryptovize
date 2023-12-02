import { useContext } from "react";
import { RegisterModalContext } from "../context/RegisterModalContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Eth from "../images/pngwing.com.png";
import Btc from "../images/bitcoin.png";
import useScreenSize from "../hooks/useScreenSize";
const classes = {
  iconContainer: {
    backgroundColor: "white",
    position: "absolute",
    borderRadius: "50%",
  },
};
const UnregisteredDisplay = () => {
  const { openRegisterForm, setOpenRegisterForm } =
    useContext(RegisterModalContext);
  const screenSize = useScreenSize();
  return (
    <Box
      sx={{
        mt: 5,
        p: 5,
        pl: screenSize > 1000 ? 5 : 2,
        backgroundColor: "#0b1c29",
        position: "relative",
        borderRadius: "10px",
      }}
    >
      <Typography
        color="white"
        variant={screenSize > 1200 ? "h5" : "h6"}
        style={{ width: "500px" }}
      >
        Ready to experience everything our platform has to offer? Register now!
      </Typography>
      <Button
        sx={{
          backgroundColor: "white",
          py: 1,
          px: 3,
          mt: 2,
          color: "black",
          "&:hover": {
            backgroundColor: "#212529",
            color: "white",
          },
        }}
        variant="contained"
        onClick={() => setOpenRegisterForm(true)}
      >
        Register
      </Button>
      <Box
        sx={{
          ...classes.iconContainer,
          right: screenSize > 1120 ? "15%" : screenSize > 950 ? "5%" : "1%",
          top: screenSize > 850 ? "15%" : "36%",
        }}
      >
        <img
          style={{
            width: screenSize > 870 ? "90px" : "60px",
            height: screenSize > 870 ? "90px" : "60px",
          }}
          src={Eth}
        />
      </Box>
      <Box
        sx={{
          ...classes.iconContainer,
          top: screenSize > 850 ? "46%" : "53%",
          right: "34%",
        }}
      >
        <img src={Btc} style={{ width: "60px", height: "60px" }} />
      </Box>
    </Box>
  );
};
export default UnregisteredDisplay;
