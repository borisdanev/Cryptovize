import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
const Selector = ({ options, handleOptionClick, data, style }) => {
  const styles = {
    Modal: {
      ...style,
      position: "absolute",
      zIndex: "99",
      top: "110%",
      right: "0",
      borderRadius: "7px",
      overflowY: "auto",
    },
  };
  return (
    <Box className="scrollable-list" sx={styles.Modal}>
      <List>
        {options.map((option) => (
          <ListItem sx={{ p: 0 }} key={option.name}>
            <ListItemButton onClick={() => handleOptionClick(option)}>
              {data.map((item, i) =>
                item.isText ? (
                  <Typography key={i} sx={{ ml: data.length > 1 ? 2 : 0 }}>
                    {option[item.value]}
                  </Typography>
                ) : (
                  <img
                    key={i}
                    src={option[item.value]}
                    style={{ width: "15px", height: "15px" }}
                  />
                )
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default Selector;
