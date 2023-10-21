// @ts-nocheck
import useAtuh from "../hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchHistory,
  selectHistoryList,
  selectStatus,
  selectError,
} from "../redux/slice/PurchaseHistorySlice";
import Grid from "@mui/material/Grid";
import { colors } from "../constants";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Button from "@mui/material/Button";

const useStyles = makeStyles({
  divider: {
    width: "100%",
    height: 3,
    backgroundColor: colors.divider,
    marginBottom: 10,
  },

  itemImage: {
    width: 80,
    height: "auto",

    objectFit: "contain",
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
});

const PurchaseHistory = () => {
  const dispatch = useDispatch();
  const historyList = useSelector(selectHistoryList);
  const classes = useStyles();
  let list = [];

  const { currentUser } = useAtuh();

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  if (historyList.length > 0) {
    list = historyList.filter((e) => e.userid === currentUser.uid);
  }

  return (
    <div>
      <Grid container marginTop={5}>
        <Grid container item xs={12}>
          Your bought items
        </Grid>
        <div className={classes.checkoutRow}>
          <div className={classes.divider} />
        </div>

        {list.length > 0 ? (
          <>
            {list.map((purchase) => {
              return (
                <Grid container item xs={12} key={purchase.date}>
                  <Grid item xs={2}>
                    {purchase.date}
                  </Grid>
                  <Grid item xs={10}>
                    <Grid container item xs={12}>
                      {purchase.items.map((item) => {
                        return (
                          <Grid
                            key={item.id}
                            container
                            item
                            xs={12}
                            padding={1}
                          >
                            <Grid item xs={2}>
                              <img
                                src={item.imageSrc[0]}
                                alt="cartitem"
                                className={classes.itemImage}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={8}
                              sx={{ textAlign: "left", flexWrap: "wrap" }}
                            >
                              {item.title}
                            </Grid>
                            <Grid item xs={2} sx={{ textAlign: "center" }}>
                              ${item.totalPrice}
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </>
        ) : (
          <div>
            <Link to={`/`} style={{ textDecoration: "none" }}>
              <Button variant="outlined" startIcon={<HomeOutlinedIcon />}>
                Back to Home
              </Button>
            </Link>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default PurchaseHistory;
