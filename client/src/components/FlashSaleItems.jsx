import React from "react";
import { Link } from "react-router-dom";

import FlashSaleProductCard from "./FlashSaleProductCard";

import Grid from "@mui/material/Grid";

const FlashSaleItems = ({ products }) => {
  return (
    <Grid container marginTop={-15} display={"flex"} justifyContent={"center"}>
      {products.map((product) => {
        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={product.id}
            marginBottom={2}
          >
            <Link to={`/products/${product.id}`}>
              <FlashSaleProductCard product={product} key={product.id} />
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FlashSaleItems;
