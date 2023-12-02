import { useState } from "react";
import { RegisterModalContext } from "./context/RegisterModalContext";
import Sidebar from "./components/Sidebar";
import Box from "@mui/material/Box";
import Header from "./components/Header";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import MainContent from "./components/MainContent";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
      dark: "#115293",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      s: 550,
      sm: 760,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
const responsiveTheme = responsiveFontSizes(theme);
const App = () => {
  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const handleModeChange = () => setDarkMode(!darkMode);
  return (
    <RegisterModalContext.Provider
      value={{ openRegisterForm, setOpenRegisterForm }}
    >
      <ThemeProvider theme={responsiveTheme}>
        <Box sx={{ display: "flex" }}>
          <Sidebar darkMode={darkMode} handleModeChange={handleModeChange} />
          <RegisterForm
            openModal={openRegisterForm}
            setOpenModal={setOpenRegisterForm}
            setOpenLoginForm={setOpenLoginForm}
          />
          <LoginForm
            openModal={openLoginForm}
            setOpenModal={setOpenLoginForm}
          />
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Header setOpenLoginForm={setOpenLoginForm} />
            <MainContent />
          </Box>
        </Box>
      </ThemeProvider>
    </RegisterModalContext.Provider>
  );
};
export default App;
