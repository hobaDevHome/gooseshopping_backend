import React from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ProductCard from "./ProductCard";

const useStyles = makeStyles({
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
    textTransform: "uppercase",
  },
});

const ProductSection = ({ title, list }) => {
  const classes = useStyles();

  return (
    <Grid container marginTop={7}>
      <div className={classes.column}>
        <p className={classes.title}>{title}</p>
      </div>
      <Grid container item xs={12}>
        {list.map((product) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              padding={1}
              key={product.id}
              display={"flex"}
              justifyContent="center"
              alignItems="center"
            >
              <Link
                to={`/products/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <ProductCard product={product} />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default ProductSection;
