import React from "react";
import Grid from "@mui/material/Grid";
import addpic from "../images/addPic.png";

import { colors } from "../constants";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    backgroundColor: colors.mainBlue,
    marginTop: 60,
    maxHeight: 350,
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
    width: "80%",
  },

  image: {
    width: "auto",
    height: 300,
    objectFit: "contain",
    marginTop: -80,
  },
  title: {
    fontSize: 40,
    textAlign: "left",
    margin: 0,
  },

  text: {
    fontSize: 18,
    textAlign: "left",
    margin: 0,
    marginTop: 20,
  },
  shopnow: {
    fontSize: 16,
    textAlign: "left",
    margin: 0,
    marginTop: 20,
  },
});

const HomeAdd = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      padding={1}
      className={classes.container}
      marginTop={15}
      flexDirection={{ md: "column-reverse", lg: "row" }}
    >
      <Grid item xs={12} md={6} padding={5} className={classes.lefContainer}>
        <div className={classes.column}>
          <p className={classes.title}>Adidas Men Running Sneakers</p>
          <p className={classes.text}>
            Performance and design. Taken right to the edge.
          </p>
          <p className={classes.shopnow}>SHOP NOW.</p>
        </div>
      </Grid>

      <Grid container item xs={12} md={6} padding={1}>
        <img src={addpic} className={classes.image} alt="add" />
      </Grid>
    </Grid>
  );
};

export default HomeAdd;
