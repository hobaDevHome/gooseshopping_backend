import React from "react";
import Grid from "@mui/material/Grid";
import background from "../images/hero1.jpg";

import { colors } from "../constants";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    backgroundColor: colors.mainBlue,
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",

    width: "100%",
    height: 560,
  },
  lefContainer: {
    displah: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    paddingLeft: 10,
    color: colors.white,
    width: "70%",
  },

  title: {
    fontSize: 50,
    textAlign: "left",
    margin: 0,
    fontWeight: "bold",
  },
});

const Hero = () => {
  const classes = useStyles();

  return (
    <Grid container padding={1} className={classes.container}>
      <Grid
        container
        item
        xs={12}
        md={6}
        padding={1}
        className={classes.lefContainer}
      >
        <div className={classes.column}>
          <p className={classes.title}>Super Flash Sale 50% Off</p>
        </div>
      </Grid>

      <Grid container item xs={12} md={6} padding={1}></Grid>
    </Grid>
  );
};

export default Hero;
