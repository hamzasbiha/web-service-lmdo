import React from "react";
import items from "../../../assets/banner/swpng.png";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import * as Icon from "@mui/icons-material";
import lines from "../../../assets/lottie/linean.json";
import suprise from "../../../assets/lottie/surpirse.json";
import "./Banner.scss";

const Banner = () => {
  return (
    <div className="banner">
      {/* <img alt="" src={items} /> */}
      <div className="left-banner">
        <div className="lin-an">
          <Lottie animationData={lines} loop={false} />
        </div>
        <div className="txt-header">
          <h1>Best Food For </h1>
          <h1>Your Pet</h1>
        </div>
        <p>Help you pet maintain a healthier weight</p>
        <button>
          Shop Now
          <Link className="link" to={"/produits/"}>
            <div>
              <Icon.ArrowForwardIos className="icon-btn" />
            </div>
          </Link>
        </button>
      </div>
      <div className="right-banner">
        <img alt="" src={items} />
        <div className="lin-an">
          <Lottie animationData={suprise} loop={false} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
