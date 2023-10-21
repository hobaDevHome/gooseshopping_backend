import React from "react";

import { colors } from "../constants";

import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";

const useStyles = makeStyles({
  container: {
    position: "relative",
    width: 320,
    height: 320,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.titleBlue,
    marginBottom: 15,
    marginTop: 5,
    position: "absolute",
    top: 10,
    left: 20,
    width: "50%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    argin: 0,
  },
  image: {
    width: 220,
    height: 140,
    objectFit: "contain",
    display: "block",
    borderRadius: 10,
    position: "relative",
  },

  price: {
    fontSize: 18,
    color: colors.mainBlue,
    fontWeight: "bold",
    padding: 0,
    margin: 0,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  discountDiv: {
    position: "absolute",
    top: 60,
    left: 20,
    fontWeight: "bold",
    fontSize: 18,
  },

  beforeprice: {
    color: "gray",
    fontWeight: "normal",
    textDecoration: "line-through",
  },
  discount: {
    color: colors.iconPink,
    marginLeft: 10,
  },
});

const FlashSaleProductCard = ({ product }) => {
  const classes = useStyles();
  let newPrice = Math.floor(
    product.price - (product.price * product.discount) / 100
  );

  return (
    <Card sx={{ width: 320, height: 320 }}>
      <CardActionArea className={classes.container}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            className={classes.image}
            src={product.imageSrc[0]}
            alt="super flash sale"
          />
          <p className={classes.title}>{product.title}</p>
          <p className={classes.price}>${newPrice}</p>

          {product.discount !== 0 && (
            <div className={classes.discountDiv}>
              <span className={classes.beforeprice}>${product.price}</span>
              <span className={classes.discount}>{product.discount}% Off</span>
            </div>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FlashSaleProductCard;
