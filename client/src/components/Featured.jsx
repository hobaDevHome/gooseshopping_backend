import React from "react";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";

import { colors } from "../constants";
import FeaturedPic from "../images/featuredProduct.png";
import { makeStyles } from "@mui/styles";
import SearchInput from "./SearchInput";

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
    width: 150,
    height: 150,
    objectFit: "contian",
    display: "block",
  },

  producttitle: {
    fontSize: 18,
    textAlign: "left",
    margin: 0,
  },
  price: {
    fontSize: 24,
    textAlign: "left",
    color: colors.priceRed,
    fontWeight: "bold",
    padding: 0,
    margin: 0,
  },
  beforeprice: {
    fontSize: 22,
    color: "gray",
    fontWeight: "normal",
    textDecoration: "line-through",
  },
  rating: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 15,
  },
  searchInputContainer: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    margin: "50px auto",
    borderRadius: 3,
    borderColor: colors.buttonBlue,
    borderWidth: 2,
    borderStyle: "solid",
  },
  searchButton: {
    width: 120,
    height: 40,
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

const Featured = () => {
  const classes = useStyles();

  return (
    <Grid container item xs={12} marginTop={10}>
      <div className={classes.column}>
        <p className={classes.title}>FEATURED PRODUCTS</p>
      </div>
      <Grid container item xs={12} padding={1}>
        <Grid item xs={12} md={6} lg={4} padding={1}>
          <FeaturedItem />
        </Grid>
        <Grid item xs={12} md={6} lg={4} padding={1}>
          <FeaturedItem />
        </Grid>
        <Grid item xs={12} md={6} lg={4} padding={1}>
          <FeaturedItem />
        </Grid>
      </Grid>
      <SearchInput />
    </Grid>
  );
};

export default Featured;

const FeaturedItem = () => {
  const classes = useStyles();
  return (
    <div className={classes.row}>
      <div>
        <img src={FeaturedPic} alt="blue" className={classes.image} />
      </div>
      <div className={classes.column}>
        <div>
          <p className={classes.producttitle}>Blue Swade Nike Sneakers</p>
        </div>
        <div>
          <div className={classes.rating}>
            <Rating name="read-only" value={4} readOnly />
          </div>
          <p className={classes.price}>
            $499 <span className={classes.beforeprice}>$599</span>
          </p>
        </div>
      </div>
    </div>
  );
};
