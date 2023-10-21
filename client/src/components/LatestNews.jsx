import React from "react";
import Grid from "@mui/material/Grid";

import { newsItems } from "../data/data";

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
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 60,
    objectFit: "contian",
    display: "block",
  },

  newsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    margin: 0,
  },
  newsDescription: {
    fontSize: 18,
    textAlign: "left",
    marginTop: 10,
  },
});

const LatestNews = () => {
  const classes = useStyles();

  return (
    <Grid container item xs={12} marginTop={7}>
      <div className={classes.column}>
        <p className={classes.title}>LATEST NEWS</p>
      </div>
      <Grid container item xs={12} padding={1}>
        {newsItems.map((item, index) => {
          return (
            <Grid item xs={12} md={6} lg={4} padding={1} key={index}>
              <FeaturedItem item={item} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default LatestNews;

const FeaturedItem = ({ item }) => {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      <div>
        <img
          src={require(`../images/${item.logo}.png`)}
          alt="product"
          className={classes.image}
        />
      </div>
      <div className={classes.column}>
        <p className={classes.newsTitle}>{item.title}</p>
        <p className={classes.newsDescription}>{item.description}</p>
      </div>
    </div>
  );
};
