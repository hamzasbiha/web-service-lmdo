import React from "react";
import items from "../../../assets/manip/items.png";

import "./Banner.scss";

const Banner = () => {
  return (
    <div className="banner">
      <img alt="" src={items} />
    </div>
  );
};

export default Banner;
