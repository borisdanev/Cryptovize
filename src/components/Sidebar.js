import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useScreenSize from "../hooks/useScreenSize";
import { selectDisplay, logOutUser } from "../store";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BiCategory, BiTrendingUp } from "react-icons/bi";
import { BsWalletFill } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import LogoutIcon from "@mui/icons-material/Logout";
import { BsSun } from "react-icons/bs";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Logo from "./Logo";
import { slide as Menu } from "react-burger-menu";
const drawerWidth = 240;
const Sidebar = ({ darkMode, handleModeChange }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("Market Data");
  const [isOpen, setIsOpen] = useState(false);
  const screenSize = useScreenSize();
  useEffect(() => {
    dispatch(selectDisplay(active));
  }, [active]);
  const Content = (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
      width={drawerWidth - 5}
    >
      <Box>
        <Logo style={{ width: "8rem", margin: "0" }} removedBackground={true} />
        <List sx={{ pt: "0" }}>
          {[
            { text: "Overview", icon: <BiCategory /> },
            {
              text: "Buy Crypto",
              icon: <AddCircleOutlineIcon />,
            },
            { text: "Sell Crypto", icon: <RemoveCircleOutlineIcon /> },
            { text: "Swap", icon: <SwapHorizIcon /> },
            { text: "Market Data", icon: <BiTrendingUp /> },
            { text: "Wallet", icon: <BsWalletFill /> },
            { text: "Send", icon: <MdSend /> },
          ].map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              sx={{
                bgcolor: item.text === active ? "#0b1c29" : "#121212",
              }}
            >
              <ListItemButton
                onClick={() => {
                  setActive(item.text);
                  setIsOpen(false);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <List>
        {[
          {
            text: "Dark Mode",
            icon: <BsSun />,
            comp: <Switch checked={true} />,
          },
          {
            text: "Log Out",
            icon: <LogoutIcon />,
            handleClick: () => dispatch(logOutUser()),
          },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={item.handleClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {item.comp && item.comp}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Box sx={{ positon: "relative", width: screenSize < 1440 ? "0" : "auto" }}>
      <CssBaseline />
      {screenSize > 1440 ? (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {Content}
        </Drawer>
      ) : (
        <Menu
          onOpen={() => setIsOpen(!isOpen)}
          onClose={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        >
          {Content}
        </Menu>
      )}
    </Box>
  );
};
export default Sidebar;
