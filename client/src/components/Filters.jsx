import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { colors } from "../constants";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  column: {
    marginTop: 60,
    marginRight: 30,
    width: "100%",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 20,
    cursor: "pointer",
  },
  fliterBox: {
    backgroundColor: colors.divider,
    padding: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  colorsDiv: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorButton: {
    "width": 28,
    "height": 28,
    "borderRadius": 14,
    "marginRight": 15,
    "marginTop": 10,
    "transition": "0.3s",
    "cursor": "pointer",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  clear: {
    backgroundColor: colors.darkerBlue,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    cursor: "pointer",
    color: colors.white,
  },
});

const Filters = ({ products, filterProducts }) => {
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");

  const classes = useStyles();

  useEffect(() => {
    if (brand) {
      filterProducts("brand", brand);
    }
    if (color) {
      filterProducts("color", color);
    }
  }, [brand, filterProducts, color]);

  const onItemCLicked = (item, value) => {
    filterProducts(item, value);
  };

  const clearFilters = () => {
    let item = "";
    let value = "";
    filterProducts(item, value);
    setBrand("");
    setColor("");
  };

  const getFilterNames = (factor) => {
    let categories = products.map((e) => e[factor]);
    categories = categories.filter(
      (e, index) => categories.indexOf(e) === index
    );

    return categories;
  };

  const colros = getFilterNames("color");
  const brands = getFilterNames("brand");

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };
  return (
    <Grid container>
      <Grid
        item
        container
        xs={12}
        marginTop={5}
        padding={3}
        columnSpacing={1}
        display={{ xs: "flex", sm: "flex", md: "none" }}
      >
        <Grid item xs={4}>
          <div onClick={clearFilters} className={classes.clear}>
            <DeleteIcon style={{ marginRight: 10, marginLeft: 10 }} />
            <p>Clear filters</p>
          </div>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="brand-select">Brands</InputLabel>
            <Select
              labelId="brand-select"
              id="brand-select"
              value={brand}
              label="Brand"
              onChange={handleBrandChange}
            >
              {brands.map((brand, index) => {
                return (
                  <MenuItem value={brand} key={brand}>
                    {brand}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="brand-select">Colors</InputLabel>
            <Select
              labelId="color-select"
              id="color-select"
              value={color}
              label="Color"
              onChange={handleColorChange}
            >
              {colros.map((color) => {
                return (
                  <MenuItem value={color} key={color}>
                    {color}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        display={{ xs: "none", sm: "none", md: "flex" }}
      >
        <div className={classes.column}>
          <div onClick={clearFilters} className={classes.clear}>
            <DeleteIcon style={{ marginRight: 10, marginLeft: 10 }} />
            <p>Clear filters</p>
          </div>
          {brands.length > 0 && (
            <FitlesBox
              list={brands}
              title="Brand"
              products={products}
              onItemCLicked={onItemCLicked}
            />
          )}
          {colros.length > 0 && (
            <FitlesBox
              list={colros}
              title="Color"
              products={products}
              onItemCLicked={onItemCLicked}
            />
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default Filters;

const FitlesBox = ({ list, title, products, onItemCLicked }) => {
  const onSelected = (item, value) => {
    onItemCLicked(item, value);
  };

  const classes = useStyles();
  return (
    <Grid
      item
      container
      xs={12}
      className={classes.fliterBox}
      marginBottom={4}
      flexDirection={"column"}
      alignItems={"start"}
    >
      <Typography variant="h6" gutterBottom sx={{ textTransform: "uppercase" }}>
        {title}
      </Typography>
      {title === "Color" ? (
        <div className={classes.colorsDiv}>
          {list.map((e, index) => {
            return (
              <div
                key={index}
                className={classes.colorButton}
                style={{ backgroundColor: e }}
                onClick={() => onSelected("color", e)}
              ></div>
            );
          })}
        </div>
      ) : (
        <>
          {list.map((item, index) => {
            let selectedFitler = products.filter((e) => e.brand === item);

            return (
              <Link
                key={index}
                underline="none"
                sx={{ fontSize: 20 }}
                className={classes.listItem}
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => onSelected("brand", item)}
                >
                  {item}
                </div>
                <div>{selectedFitler.length}</div>
              </Link>
            );
          })}
        </>
      )}
    </Grid>
  );
};
