import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import Rating from "@mui/material/Rating";
import { CardActionArea } from "@mui/material";

import { colors } from "../constants";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.titleBlue,
    marginBottom: 15,
    width: "80%",
    alignSelf: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  image: {
    width: "100%",
    height: 180,
    objectFit: "contain",
    display: "block",
  },

  rating: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
  },

  price: {
    fontSize: 18,
    color: colors.mainBlue,
    fontWeight: "bold",
    padding: 0,
    margin: 0,
  },
  beforeprice: {
    color: "gray",
    fontWeight: "normal",
    textDecoration: "line-through",
    marginLeft: 10,
  },
  discount: {
    color: colors.iconPink,
    marginLeft: 10,
  },
  hotBox: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  hotRect: {
    width: 60,
    height: 30,
    backgroundColor: colors.iconPink,
    color: colors.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(true);

  const classes = useStyles();
  let newPrice = Math.floor(
    product.price - (product.price * product.discount) / 100
  );

  return (
    <Card sx={{ maxWidth: 270, marginBottom: 2 }}>
      <CardActionArea>
        <CardContent sx={{ position: "relative" }}>
          <img
            className={classes.image}
            src={product.imageSrc[0]}
            alt="product"
            onLoad={() => setLoading(false)}
          />

          <div style={{ display: loading ? "block" : "none" }}>
            <LinearProgress />
          </div>
          <p className={classes.title}>{product.title}</p>
          <div className={classes.rating}>
            <Rating name="read-only" value={product.rating} readOnly />
          </div>

          <p className={classes.price}>
            ${newPrice}
            {product.discount !== 0 && (
              <>
                <span className={classes.beforeprice}>${product.price}</span>
                <span className={classes.discount}>
                  {product.discount}% Off
                </span>
              </>
            )}
          </p>
          {product.hot && (
            <div className={classes.hotBox}>
              <div className={classes.hotRect}>HOT</div>
            </div>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
