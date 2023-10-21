import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeAdd from "../components/HomeAdd";

import Grid from "@mui/material/Grid";
import Filters from "../components/Filters";
import ProductsList from "../components/ProductsList";

const Category = ({ category, products }) => {
  const [productsList, setproductsList] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const filterProducts = (item, value) => {
    setFilter(item);
    setFilterValue(value);
  };

  useEffect(() => {
    if (products) {
      const prdocuts = products.filter((item) => item.category === category);

      if (filter !== "") {
        const filteredProducts = prdocuts.filter(
          (e) => e[filter] === filterValue
        );
        setproductsList(filteredProducts);
      } else {
        setproductsList(prdocuts);
      }
    }
  }, [filter, filterValue, category, products]);

  return (
    <div>
      <Navbar active={`${category[0].toUpperCase() + category.slice(1)}`} />
      {products ? (
        <Grid container marginTop={{ md: 10, sm: 0 }}>
          <Grid container item sm={12} md={3}>
            <Filters products={productsList} filterProducts={filterProducts} />
          </Grid>
          <Grid container item sm={12} md={9}>
            <Grid
              container
              item
              xs={12}
              display={{ xs: "none", sm: "none", md: "flex" }}
            >
              <HomeAdd />
            </Grid>
            <Grid container item xs={12}>
              {productsList.length > 0 && (
                <ProductsList productsList={productsList} />
              )}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <h3>No Data yet</h3>
      )}

      <Footer />
    </div>
  );
};

export default Category;
