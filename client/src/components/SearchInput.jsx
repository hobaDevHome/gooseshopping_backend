import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { colors } from "../constants";

import Grid from "@mui/material/Grid";

const useStyles = makeStyles({
  searchInputContainer: {
    borderRadius: 3,
    border: `2px solid ${colors.buttonBlue}`,
  },
  searchButton: {
    width: "20%",
    color: colors.white,
    padding: "10px 20px",
    backgroundColor: colors.buttonBlue,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
  },
});

const SearchInput = () => {
  const classes = useStyles();
  return (
    <Grid
      item
      container
      xs={8}
      margin={"0 auto"}
      marginTop={8}
      flexDirection="row"
      justifyContent="space-between"
      className={classes.searchInputContainer}
    >
      <div>
        <TextField
          placeholder="Search .."
          sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
        />
      </div>

      <div className={classes.searchButton}>Search</div>
    </Grid>
  );
};

export default SearchInput;
