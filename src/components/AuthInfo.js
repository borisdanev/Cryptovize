import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IoMdClose } from "react-icons/io";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
const AuthInfo = ({ setInfoOpen }) => {
  return (
    <Box
      sx={{
        pt: 2,
        pb: 3,
        px: 1,
        position: "absolute",
        zIndex: 99,
        width: "80%",
        right: "3.5rem",
        top: "3.5rem",
        bgcolor: "#848884",
        color: "white",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <IconButton onClick={() => setInfoOpen(false)}>
          <IoMdClose />
        </IconButton>
      </Box>
      <Typography>
        Note: The email doesn't have to be your real email you can use
        non-existing email, or you can use these pre-made accounts:
      </Typography>
      {[
        { email: "some@gmail.com", password: "someforsome" },
        { email: "new@gmail.com", password: "secondforsecond" },
      ].map((user, i) => (
        <Grid
          container
          key={user.email}
          sx={{ border: "1px white solid", p: 1, mt: 1 }}
        >
          <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
            <Typography>{`User ${i + 1}`}</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{`email:${user.email}`}</Typography>
            <Typography>{`password:${user.password}`}</Typography>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};
export default AuthInfo;
