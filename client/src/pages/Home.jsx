import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Featured from "../components/Featured";
import LatestNews from "../components/LatestNews";
import Perks from "../components/Perks";
import HomeAdd from "../components/HomeAdd";
import ProductSection from "../components/ProductSection";
import Hero from "../components/Hero";
import FlashSaleItems from "../components/FlashSaleItems";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const Home = ({ products, status }) => {
  return (
    <div>
      <Navbar active="Home" />

      <Hero />
      {status === "loading" ? (
        <Grid
          item
          xs={12}
          padding={1}
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          {products.length > 0 ? (
            <>
              <FlashSaleItems products={products.slice(0, 3)} />
              <ProductSection title="Best Seller" list={products.slice(5, 9)} />
            </>
          ) : (
            <h3>No data yet</h3>
          )}
        </>
      )}

      <HomeAdd />
      <Perks />
      <LatestNews />
      <Featured />
      <Footer />
    </div>
  );
};

export default Home;
