import { useRef, useState, useEffect } from "react";
import useCheckActivity from "../hooks/useCheckActivity";
import useScreenSize from "../hooks/useScreenSize";
import { useDispatch } from "react-redux";
import { selectDisplay } from "../store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CoinSelector from "./CoinSelector";
import { AiOutlineUser } from "react-icons/ai";
import { styled } from "@mui/material";
const CustomButton = styled(Button)({
  border: "1px solid white",
  color: "white",
  borderRadius: "15px",
  "&:hover": {
    border: "1px solid white",
  },
});
const UserActions = ({ user: { firstName, wallet } }) => {
  const dispatch = useDispatch();
  const active = useCheckActivity();
  const [hoveringIcon, setHoveringIcon] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const screenSize = useScreenSize();
  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  const [activeDisplay, setActiveDisplay] = useState("Market Data");
  useEffect(() => {
    dispatch(selectDisplay(activeDisplay));
  }, [activeDisplay]);
  const styles = {
    UserIconWrapper: {
      display: "flex",
      width: screenSize > 760 ? "90px" : "2.5rem",
      height: screenSize > 760 ? "90px" : "2.5rem",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      bgcolor: "white",
      color: "black",
      mx: screenSize > 760 ? "auto" : 0,
      fontSize: screenSize > 760 ? "2.5rem" : "1.5rem",
    },
  };
  const actionsContainer = (
    <>
      <Grid container spacing={2}>
        {[
          { text: "Buy", value: "Buy Crypto" },
          { text: "Sell", value: "Sell Crypto" },
          { text: "Swap", value: "Swap" },
        ].map((item) => (
          <Grid
            item
            xs={3}
            sm={12}
            md={3}
            key={item.text}
            sx={{
              display: "flex",
              justifyContent: screenSize > 550 ? "center" : "start",
              mt: 2,
            }}
          >
            <CustomButton
              variant="outlined"
              onClick={() => setActiveDisplay(item.value)}
            >
              <Typography>{item.text}</Typography>
            </CustomButton>
          </Grid>
        ))}
      </Grid>
      <Typography sx={{ mt: screenSize > 550 ? 4 : 2, mb: 1 }}>Coin</Typography>
      <CoinSelector main />
    </>
  );
  return (
    <Box sx={{ px: screenSize < 1120 ? 1 : 3 }}>
      <Box
        sx={{
          bgcolor: "#1a1a1a",
          py: 2,
          borderRadius: "10px",
          mb: screenSize > 760 ? 4 : 0,
        }}
      >
        {screenSize > 760 ? (
          <>
            <Box
              sx={styles.UserIconWrapper}
              onClick={() => fileInputRef.current.click()}
              onMouseEnter={() => setHoveringIcon(true)}
              onMouseLeave={() => setHoveringIcon(false)}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />

              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  style={{ width: "100%", borderRadius: "inherit" }}
                />
              ) : (
                <AiOutlineUser />
              )}
            </Box>
            <Typography textAlign="center" className="h3" mt={2}>
              {firstName}
            </Typography>
            {active && (
              <Box textAlign="center">
                <Typography variant="h6">Your Balance</Typography>
                <Typography variant="h5">
                  {wallet.cash.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </Box>
            )}
          </>
        ) : (
          <Grid container sx={{ px: 2 }}>
            <Grid item s={6} xs={12}>
              <Grid container sx={{ mb: 2 }}>
                <Grid
                  item
                  xs={2}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    sx={styles.UserIconWrapper}
                    onClick={() => fileInputRef.current.click()}
                    onMouseEnter={() => setHoveringIcon(true)}
                    onMouseLeave={() => setHoveringIcon(false)}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />
                    {selectedImage ? (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        style={{ width: "100%", borderRadius: "inherit" }}
                      />
                    ) : (
                      <AiOutlineUser />
                    )}
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={9}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    textAlign={screenSize > 760 ? "center" : "start"}
                    className="h3"
                  >
                    {firstName}
                  </Typography>
                </Grid>
              </Grid>
              {active && (
                <Box textAlign={screenSize > 760 ? "center" : "start"}>
                  <Typography variant="h6">Your Balance</Typography>
                  <Typography variant="h5">
                    {wallet.cash.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid s={6} item xs={12}>
              {screenSize < 760 && actionsContainer}
            </Grid>
          </Grid>
        )}
      </Box>
      {screenSize > 760 && (
        <Box
          sx={{
            bgcolor: "#1a1a1a",
            py: 2,
            borderRadius: "10px",
            px: screenSize > 800 ? 3 : 1,
          }}
        >
          {actionsContainer}
        </Box>
      )}
    </Box>
  );
};
export default UserActions;
