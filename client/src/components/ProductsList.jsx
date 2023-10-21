import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import { colors } from "../constants";
import usePagination from "../Pagination";

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
  },
  paginationDiv: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.divider,
    justifyContent: "center",
  },
});

const ProductsList = ({ productsList }) => {
  const classes = useStyles();
  let [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const count = Math.ceil(productsList.length / PER_PAGE);
  const _DATA = usePagination(productsList, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <Grid container item xs={12} marginTop={7}>
      <Grid container item xs={12}>
        {_DATA.currentData().map((product) => {
          return (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              padding={1}
              key={product.id}
              sx={{
                display: "flex",

                justifyContent: "center",
                alignItems: "center",
              }}
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
      <Grid
        item
        xs={12}
        padding={1}
        marginTop={1}
        className={classes.paginationDiv}
      >
        <Pagination count={count} color="secondary" onChange={handleChange} />
      </Grid>
    </Grid>
  );
};

export default ProductsList;
