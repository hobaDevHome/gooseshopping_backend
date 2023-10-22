// @ts-nocheck
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { colors } from "../constants";
import { toast } from "react-toastify";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../redux/slice/cartSlice";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { makeStyles } from "@mui/styles";
import PurchaseHistory from "./History";

const useStyles = makeStyles({
  searchInputContainer: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 3,
    borderColor: colors.divider,
    borderWidth: 2,
    borderStyle: "solid",
  },
  blueButton: {
    color: colors.white,
    height: "100%",
    width: "100%",

    backgroundColor: colors.darkerBlue,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    borderRadius: 3,
    cursor: "pointer",
  },
  checkoutRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  divider: {
    width: "100%",
    height: 3,
    backgroundColor: colors.divider,
    marginBottom: 10,
  },
  searchButtonContianer: {
    width: 120,
    margin: 0,
    padding: 0,
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.ligthPink,
    color: colors.darkPink,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  itemImage: {
    width: 80,
    height: "auto",

    objectFit: "contain",
  },
  quantityContiner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.divider,
    borderRadius: 4,
    width: "50%",
    fontSize: 16,
    fontWeight: "bold",
    padding: "10px 15px",
  },
  addremoveButtonBox: {
    color: colors.mainBlue,
    fontSize: 22,
    cursor: "pointer",
    width: 30,
    height: 30,
  },
});

const Cart = () => {
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      <Navbar />
      {cartItems.length > 0 ? (
        <>
          <Grid container marginTop={5}>
            <Grid
              container
              item
              xs={12}
              padding={1}
              display={{ xs: "none", sm: "none", md: "flex" }}
            >
              <Grid item sm={6}>
                PRODUCT
              </Grid>
              <Grid item sm={2}>
                PRICE
              </Grid>
              <Grid item sm={2}>
                QTY
              </Grid>
              <Grid item sm={2}>
                UNIT PRICE
              </Grid>
              <Grid container item xs={12} padding={1} marginTop={2}>
                <div className={classes.divider} />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              display={{ md: "flex", sm: "none", xs: "none" }}
            >
              {cartItems.map((item) => {
                return <CartItemLargeScreens item={item} key={item.id} />;
              })}
            </Grid>
            <Grid
              container
              item
              xs={12}
              display={{ md: "none", sm: "flex", sx: "flex" }}
            >
              {cartItems.map((item) => {
                return <CartItemMobileScreens item={item} key={item.id} />;
              })}
            </Grid>
            <Grid item container xs={12} marginTop={3}>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                padding={1}
                justifyContent={"flex-start"}
                alignSelf={"flex-start"}
              >
                <div className={classes.searchInputContainer}>
                  <TextField
                    fullWidth
                    placeholder="Voucher code"
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    }}
                  />
                  <div className={classes.searchButtonContianer}>
                    <div className={classes.blueButton}>Search</div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4}></Grid>
              <Grid
                item
                container
                xs={12}
                sm={12}
                md={3.8}
                padding={1}
                marginRight={1}
                marginTop={{ sx: 2, md: 0 }}
              >
                <Grid
                  container
                  item
                  xs={12}
                  flexDirection={"column"}
                  alignItems={"end"}
                >
                  <div className={classes.checkoutRow}>
                    <Typography
                      variant="body2"
                      display="block"
                      gutterBottom
                      paddingBottom={{ sm: 1, md: 3 }}
                      sx={{ textAlign: "left" }}
                    >
                      Subtotal
                    </Typography>
                    <Typography
                      variant="body2"
                      display="block"
                      gutterBottom
                      paddingBottom={{ sm: 1, md: 3 }}
                      sx={{ textAlign: "left" }}
                    >
                      ${totalAmount}
                    </Typography>
                  </div>
                  <div className={classes.checkoutRow}>
                    <Typography
                      variant="body2"
                      display="block"
                      gutterBottom
                      paddingBottom={{ sm: 1, md: 3 }}
                      sx={{ textAlign: "left" }}
                    >
                      Shipping fee
                    </Typography>
                    <Typography
                      variant="body2"
                      display="block"
                      gutterBottom
                      paddingBottom={{ sm: 1, md: 3 }}
                      sx={{ textAlign: "left" }}
                    >
                      $20
                    </Typography>
                  </div>
                  <div className={classes.checkoutRow}>
                    <Typography
                      variant="body2"
                      display="block"
                      gutterBottom
                      paddingBottom={{ sm: 1, md: 3 }}
                      sx={{ textAlign: "left" }}
                    >
                      Coupon
                    </Typography>
                    <Typography
                      variant="body2"
                      display="block"
                      gutterBottom
                      paddingBottom={{ sm: 1, md: 3 }}
                      sx={{ textAlign: "left" }}
                    >
                      No
                    </Typography>
                  </div>
                  <div className={classes.checkoutRow}>
                    <div className={classes.divider} />
                  </div>
                  <div className={classes.checkoutRow}>
                    <Typography
                      variant="h5"
                      display="block"
                      gutterBottom
                      paddingBottom={{ sm: 1, md: 3 }}
                      sx={{ textAlign: "left" }}
                    >
                      TOTAL
                    </Typography>
                    <Typography
                      variant="h5"
                      display="block"
                      gutterBottom
                      paddingBottom={{ sm: 1, md: 3 }}
                      sx={{ textAlign: "left" }}
                    >
                      ${totalAmount - 20}
                    </Typography>
                  </div>
                  <div className={classes.checkoutRow}>
                    <div className={classes.blueButton} style={{ height: 60 }}>
                      <Link
                        to={`/chechout`}
                        style={{ textDecoration: "none", color: colors.white }}
                      >
                        <p>Check out</p>
                      </Link>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <div>
          <Typography variant="h6" gutterBottom marginTop={5}>
            Your cart is empty
          </Typography>
          <Link to={`/`} style={{ textDecoration: "none" }}>
            <Button variant="outlined" startIcon={<HomeOutlinedIcon />}>
              Back to Home
            </Button>
          </Link>
        </div>
      )}
      <PurchaseHistory />

      <Footer />
    </div>
  );
};

export default Cart;

const CartItemLargeScreens = ({ item }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteFromCart = () => {
    dispatch(cartActions.deleteItem(item.id));

    toast.success("Product deleted from cart");
  };
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        title: item.title,
        imageSrc: item.imageSrc,
        price: item.price,
      })
    );

    toast.success("Product added to cart");
  };
  const removeFromCart = () => {
    if (item) {
      dispatch(cartActions.decreaseItemQuantity(item));
      toast.success("Product removed from cart");
    }
  };

  return (
    <Grid
      key={item.id}
      container
      item
      xs={12}
      padding={1}
      alignItems={"center"}
    >
      <Grid item xs={0.5}>
        <div onClick={deleteFromCart} className={classes.deleteButton}>
          X
        </div>
      </Grid>
      <Grid item xs={1.5}>
        <Link to={`/products/${item.id}`} style={{ textDecoration: "none" }}>
          <img
            src={item.imageSrc[0]}
            alt="cartitem"
            className={classes.itemImage}
          />
        </Link>
      </Grid>
      <Grid item xs={4} sx={{ textAlign: "left", flexWrap: "wrap" }}>
        {item.title}
      </Grid>
      <Grid item xs={2} sx={{ textAlign: "center" }}>
        ${item.totalPrice}
      </Grid>
      <Grid
        item
        xs={2}
        sx={{ justifyContent: "center", alignItems: "start", display: "flex" }}
      >
        <div className={classes.quantityContiner}>
          <div onClick={removeFromCart} className={classes.addremoveButtonBox}>
            -
          </div>
          <div>{item.quantity}</div>
          <div onClick={addToCart} className={classes.addremoveButtonBox}>
            +
          </div>
        </div>
      </Grid>
      <Grid item xs={2}>
        ${item.price}
      </Grid>
    </Grid>
  );
};

const CartItemMobileScreens = ({ item }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteFromCart = () => {
    dispatch(cartActions.deleteItem(item.id));

    toast.success("Product deleted from cart");
  };
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        title: item.title,
        imageSrc: item.imageSrc,
        price: item.price,
      })
    );

    toast.success("Product added to cart");
  };
  const removeFromCart = () => {
    if (item) {
      dispatch(cartActions.decreaseItemQuantity(item));
      toast.success("Product removed from cart");
    }
  };
  return (
    <Grid
      key={item.id}
      container
      item
      xs={12}
      padding={2}
      sx={{ border: `1px solid #EBF0FF` }}
      borderRadius={4}
      margin={3}
      alignItems={"center"}
    >
      <Grid item xs={3}>
        <Link to={`/products/${item.id}`} style={{ textDecoration: "none" }}>
          <img
            src={item.imageSrc[0]}
            alt="cartitem"
            className={classes.itemImage}
          />
        </Link>
      </Grid>
      <Grid item container xs={9} paddingLeft={1}>
        <Grid item container xs={12} justifyContent="space-between">
          <Grid
            item
            xs={10}
            sx={{
              textAlign: "left",
              flexWrap: "wrap",
              color: colors.titleBlue,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {item.title}
          </Grid>
          <Grid item xs={2} onClick={deleteFromCart}>
            <DeleteOutlineOutlinedIcon
              style={{ color: "#9098B1", fontSize: 36, cursor: "pointer" }}
            />
          </Grid>
        </Grid>

        <Grid item container xs={12} marginTop={2}>
          <Grid
            item
            xs={6}
            sx={{
              textAlign: "left",
              color: colors.buttonBlue,
              fontWeight: "bold",
            }}
          >
            ${item.price}
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
            }}
          >
            <div className={classes.quantityContiner}>
              <div
                onClick={removeFromCart}
                className={classes.addremoveButtonBox}
              >
                -
              </div>
              <div>{item.quantity}</div>
              <div onClick={addToCart} className={classes.addremoveButtonBox}>
                +
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
