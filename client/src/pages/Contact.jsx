import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { colors } from "../constants";
import Typography from "@mui/material/Typography";
import callpic from "../images/call5.jpg";

import { makeStyles } from "@mui/styles";
import SearchInput from "../components/SearchInput";
const useStyles = makeStyles({
  container: {},
  lefContainer: {
    displah: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mainBlue,
  },
  rightContainer: {
    backgroundColor: colors.white,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    paddingLeft: 10,
    color: colors.white,
    width: "80%",
  },

  image: {
    width: 400,

    objectFit: "contain",

    borderRadius: 10,
  },
  title: {
    fontSize: 40,
    textAlign: "left",
    margin: 0,
  },

  text: {
    fontSize: 18,
    textAlign: "left",
    margin: 0,
    marginTop: 20,
  },
  shopnow: {
    fontSize: 16,
    textAlign: "left",
    margin: 0,
    marginTop: 20,
  },
  arc: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: colors.mainBlue,
    position: "absolute",
    right: "48%",
    zIndex: 1,
  },
  getintouch: {
    display: "flex",
    flexDirection: "row",
    alignItems: "self-start",
  },
  contactInfo: {
    color: colors.white,
    zIndex: 2,
  },
  imgdiv: {
    position: "absolute",
    right: "43%",
    zIndex: 1,

    left: -400,
    top: "20%",
  },
});

const Contact = () => {
  const classes = useStyles();
  return (
    <div>
      <Navbar active="Contact" />
      <Paper elevation={3} padding={0}>
        <Grid
          container
          padding={0}
          marginTop={10}
          flexDirection={{ sm: "column", md: "row" }}
          sx={{ position: "relative" }}
        >
          <Grid
            container
            item
            xs={12}
            md={6}
            padding={1}
            className={classes.lefContainer}
          >
            <Box
              className={classes.arc}
              visibility={{ sm: "hidden", md: "visible" }}
            />
            <Box
              visibility={{ xs: "hidden", sm: "hidden", md: "visible" }}
              className={classes.imgdiv}
            >
              <img src={callpic} alt="call" className={classes.image} />
            </Box>
            <Grid item sm={12} md={7}></Grid>
            <Grid
              item
              sm={12}
              md={5}
              flexDirection={"column"}
              justifyContent={"space-between"}
              height={"100%"}
              paddingTop={{ sm: 2, md: 7 }}
              paddingBottom={{ sm: 2, md: 7 }}
              className={classes.contactInfo}
            >
              <Box
                padding={1}
                className={classes.getintouch}
                marginBottom={{ sm: 1, md: 9 }}
              >
                <Typography variant="h4" gutterBottom>
                  get in touch
                </Typography>
              </Box>
              <Box padding={1}>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  paddingBottom={{ sm: 1, md: 3 }}
                  sx={{ textAlign: "left" }}
                >
                  contact@e-comm.ng
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  paddingBottom={{ sm: 1, md: 4 }}
                  sx={{ textAlign: "left" }}
                >
                  +234 4556 6665 34
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  sx={{ textAlign: "left" }}
                >
                  20 Prince Hakerem Lekki Phase 1, Lagos.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            padding={7}
            className={classes.rightContainer}
          >
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ textAlign: "left" }}
            >
              Full name
            </Typography>
            <TextField
              fullWidth
              label="Fullname"
              id="Fullname"
              sx={{ marginBottom: 3 }}
            />
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ textAlign: "left" }}
            >
              Email
            </Typography>
            <TextField
              fullWidth
              label="Email"
              id="Email"
              sx={{ marginBottom: 3 }}
            />
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ textAlign: "left" }}
            >
              Message
            </Typography>
            <TextField
              fullWidth
              label="Type your message"
              id="Message"
              multiline
              rows={10}
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid
        item
        container
        xs={12}
        md={12}
        justifyContent="center"
        marginTop={10}
      >
        <SearchInput />
      </Grid>
      <Footer />
    </div>
  );
};

export default Contact;
