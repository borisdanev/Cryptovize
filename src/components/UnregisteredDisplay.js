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
  const { setOpenRegisterForm } = useContext(RegisterModalContext);
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
        // variant={screenSize > 1200 ? "h5" : "h6"}
        className="unregistered-text h5"
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
          top: screenSize > 850 ? "35%" : "40%",
        }}
      >
        <img
          style={{
            width: "clamp(3.75rem, 10vw, 5.76rem)",
            height: "clamp(3.75rem, 10vw, 5.76rem)",
          }}
          src={Eth}
        />
      </Box>
      <Box
        sx={{
          ...classes.iconContainer,
          top: screenSize > 850 ? "55%" : "60%",
          right: "34%",
        }}
      >
        <img src={Btc} style={{ width: "3.75rem", height: "3.75rem" }} />
      </Box>
    </Box>
  );
};
export default UnregisteredDisplay;
