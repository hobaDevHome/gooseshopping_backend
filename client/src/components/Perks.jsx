import React from "react";
import Grid from "@mui/material/Grid";

import { perks } from "../data/data";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingTop: 0,
    margin: 0,
    paddingLeft: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  image: {
    width: 60,
    height: 60,
    objectFit: "contain",
    display: "block",
    marginBottom: 40,
  },

  newsTitle: {
    fontSize: 22,
    fontWeight: "bold",

    margin: 0,
  },
  newsDescription: {
    fontSize: 18,

    marginTop: 10,
  },
});

const Perks = () => {
  return (
    <Grid container marginTop={{ xs: 30, sm: 15, md: 10 }}>
      <Grid container item xs={12} padding={1}>
        {perks.map((item) => {
          return (
            <Grid item xs={12} md={6} lg={4} padding={1} key={item.title}>
              <FeaturedItem item={item} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Perks;

const FeaturedItem = ({ item }) => {
  const classes = useStyles();

  return (
    <div className={classes.column}>
      <img
        src={require(`../images/${item.logo}.png`)}
        alt="product"
        className={classes.image}
      />
      <p className={classes.newsTitle}>{item.title}</p>
      <p className={classes.newsDescription}>{item.description}</p>
    </div>
  );
};
