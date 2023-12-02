import { createMuiTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#348c9d",
    },
  },
});
const CustomButton = ({ variant, color, children }) => {
  return (
    <ThemeProvider theme={customTheme}>
      <Button variant={variant} color={color}>
        {children}
      </Button>
    </ThemeProvider>
  );
};
export default CustomButton;
