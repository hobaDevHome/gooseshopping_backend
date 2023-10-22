import useAtuh from "../hooks/useAuth";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchHistory,
  selectHistoryList,
} from "../redux/slice/PurchaseHistorySlice";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { colors } from "../constants";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";

const useStyles = makeStyles({
  divider: {
    width: "100%",
    height: 3,
    backgroundColor: colors.divider,
    marginBottom: 15,
    marginTop: 15,
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

  if (!currentUser) {
    return;
  }
  if (historyList.length > 0) {
    list = historyList.filter((e) => e.userid === currentUser.uid);
  }

  return (
    <Paper
      sx={{
        maxWidth: "80%",
        margin: "60px auto",
        borderRadius: 10,
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            borderRadius: 2,
            backgroundColor: colors.divider,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Your previous orders
          </Typography>
        </Grid>

        {list.length > 0 && (
          <>
            {list.map((purchase, index) => {
              return (
                <>
                  <Grid container item xs={12} key={purchase.date}>
                    <Grid item xs={12} md={2} sx={{ fontWeight: "bold" }}>
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(purchase.date)}
                    </Grid>

                    <Grid item xs={12} md={10}>
                      <Grid container item xs={12}>
                        {purchase.items.map((item, index) => {
                          return (
                            <>
                              <Grid
                                key={item.id}
                                container
                                item
                                xs={12}
                                padding={1}
                              >
                                <Grid item xs={2}>
                                  <Link
                                    to={`/products/${item.id}`}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <img
                                      src={item.imageSrc[0]}
                                      alt="cartitem"
                                      className={classes.itemImage}
                                    />
                                  </Link>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  md={8}
                                  sx={{
                                    textAlign: "left",
                                    flexWrap: "wrap",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {item.title}
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  md={2}
                                  sx={{ textAlign: "center" }}
                                >
                                  ${item.totalPrice}
                                </Grid>
                              </Grid>
                              {index < purchase.items.length - 1 && (
                                <div className={classes.checkoutRow}>
                                  <div className={classes.divider} />
                                </div>
                              )}
                            </>
                          );
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                  {index < list.length - 1 && (
                    <div className={classes.checkoutRow}>
                      <div className={classes.divider} />
                    </div>
                  )}
                </>
              );
            })}
          </>
        )}
      </Grid>
    </Paper>
  );
};

export default PurchaseHistory;
