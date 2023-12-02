import { useContext } from "react";
import { useSelector } from "react-redux";
import { RegisterModalContext } from "../context/RegisterModalContext";
import useCheckActivity from "../hooks/useCheckActivity";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SearchBar from "./SearchBar";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import useScreenSize from "../hooks/useScreenSize";
const Header = ({ setOpenLoginForm }) => {
  const active = useCheckActivity();
  const user = useSelector((state) => state.user);
  const screenSize = useScreenSize();
  const { openRegisterForm, setOpenRegisterForm } =
    useContext(RegisterModalContext);
  return (
    <Box
      sx={{
        p: 3,
        ml: screenSize < 1440 ? 5 : 0,
        display: "flex",
      }}
    >
      <Grid container>
        <Grid item xs={active ? 12 : 8} md={8}>
          <SearchBar />
        </Grid>

        <Grid
          item
          xs={active ? 12 : 4}
          md={4}
          sx={{
            display: "flex",
            justifyContent: active ? "flex-start" : "flex-end",
          }}
        >
          {active ? (
            <Box>
              <Typography
                sx={{
                  fontSize: screenSize > 760 ? "1.1rem" : "1.1rem",
                  display: "inline-block",
                  ml: 3,
                }}
              >
                Address:
                {screenSize < 900 && <br />}
                <span
                  style={{
                    color: "#3ea7b8",
                  }}
                >
                  {user.id}
                </span>
              </Typography>
              <IconButton
                onClick={async () =>
                  await navigator.clipboard.writeText(user.id)
                }
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>
          ) : (
            <Box>
              <Button
                sx={{
                  mr: screenSize > 760 ? 3 : 0,
                  height: "100%",
                  textTransform: "none",
                  py: 0,
                  background: "#45b9cb",
                  "&:hover": {
                    background: "#0b1c29",
                  },
                }}
                variant="contained"
                onClick={() => setOpenRegisterForm(true)}
              >
                Register
              </Button>
              {screenSize > 760 && (
                <Button
                  sx={{
                    textTransform: "none",
                    height: "100%",
                    py: 0,
                    borderColor: "#45b9cb",
                    color: "#45b9cb",
                  }}
                  variant="outlined"
                  color="primary"
                  onClick={() => setOpenLoginForm(true)}
                >
                  Login
                </Button>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
export default Header;
