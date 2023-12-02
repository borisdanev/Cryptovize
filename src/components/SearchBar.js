import { useState } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
const styles = {
  search: {
    position: "relative",
    borderRadius: "20px",
    backgroundColor: "#f2f2f2",
    "&:hover": {
      backgroundColor: "#e6e6e6",
    },
    color: "black",
    marginRight: "10px",
    marginLeft: "0px",
    width: "100%",
    maxWidth: "100%",
  },
  searchIcon: {
    padding: "10px",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: "10px 10px 10px 40px",
    width: "100%",
    color: "black",
  },
};
const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <form style={styles.search}>
      <Box style={styles.searchIcon}>
        <SearchIcon />
      </Box>
      <FormControl style={{ width: "100%" }}>
        <InputBase
          placeholder="Search..."
          style={styles.inputInput}
          inputProps={{ "aria-label": "search" }}
          className="search-bar"
          value={searchText}
          onChange={handleSearch}
        />
      </FormControl>
    </form>
  );
};

export default SearchBar;
