import React from "react";
import { useState, useRef } from "react";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  bigImage: {
    width: 430,
    height: 320,
    objectFit: "contain",

    borderRadius: 4,
  },
  thumbnail: {
    width: 100,
    height: 100,

    objectFit: "contain",
    cursor: "pointer",
    margin: 0,
    padding: 0,
    display: "block",
  },
  thumbBox: {
    width: 102,
    height: 102,
    marginRight: 10,
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  thumbBox2: {
    width: 102,
    height: 102,
    marginRight: 10,
  },
  thumbContianer: {
    display: "flex",
    flexDirection: "row",
    margin: 0,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbClicked: {
    border: "2px solid violet",
  },
});

const ItemGallery = ({ imagesList }) => {
  const [activeThumb, setActiveThumb] = useState(0);
  const classes = useStyles();
  const ref = useRef(null);

  let mapped = imagesList.length > 4 ? imagesList.slice(0, 4) : imagesList;
  const addHover = () => {
    const div = ref.current;

    if (div) {
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <img src={imagesList[activeThumb]} alt="" className={classes.bigImage} />

      <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        {mapped.map((e, index) => {
          return (
            <div
              key={index}
              ref={ref}
              onClick={() => setActiveThumb(index)}
              onMouseEnter={() => (activeThumb === index ? null : addHover())}
              className={`${
                activeThumb === index
                  ? `${classes.thumbClicked}`
                  : `${classes.thumbBox}`
              }`}
            >
              <div className={classes.thumbContianer}>
                <img src={e} alt="thumbnail" className={classes.thumbnail} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemGallery;
