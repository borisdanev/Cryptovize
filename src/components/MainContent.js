import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useScreenSize from "../hooks/useScreenSize";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Display from "./Display";
import UserActions from "./UserActions";
import Buying from "../images/buy_crypto.png";
import Logo from "./Logo";
const MainContent = () => {
  const user = useSelector((state) => state.user);
  const [currentUser, setCurrentUser] = useState(user);
  const screenSize = useScreenSize();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  return (
    <Box sx={{ p: 3, px: screenSize < 1120 ? 0 : 3 }}>
      <Grid container>
        <Grid item sm={8} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {screenSize > 760 ? (
                <Box
                  sx={{
                    display: "flex",
                    backgroundColor: "#0b1c29",
                    borderRadius: "1rem",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={Buying}
                    style={{ width: "clamp(8rem,17vw,13rem)", mr: "0.5rem" }}
                  />
                  <Typography textAlign="center">
                    Don't miss out on the next big thing. Buy crypto now.
                  </Typography>
                </Box>
              ) : (
                <UserActions user={currentUser} />
              )}
            </Grid>
            <Grid item xs={12} md={6} sx={{ pl: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: "#0b1c29",
                  borderRadius: "1rem",
                  alignItems: "center",
                }}
              >
                <Logo
                  width="9.5rem"
                  style={{
                    width: "clamp(8rem, 11vw, 10rem)",
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                    marginRight: "0.5rem",
                  }}
                />
                <Typography textAlign="center">
                  Simplify your crypto experience with Cryptovize - the easiest
                  way to manage your digital assets.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Display />
        </Grid>
        {screenSize > 760 && (
          <Grid item xs={4}>
            <UserActions user={currentUser} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
export default MainContent;
