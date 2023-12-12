import React, { useEffect } from "react";
import items from "../../../assets/banner/swpng.png";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import lines from "../../../assets/lottie/linean.json";
import { useAnimate, usePresence, motion } from "framer-motion";
import "./Banner.scss";

const Banner = () => {
  const [isPresence, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();
  return (
    <div className="banner">
      {/* <img alt="" src={items} /> */}
      <div className="left-banner">
        <div className="lin-an">
          <Lottie animationData={lines} loop={false} />
        </div>
        <motion.div
          animate={{ x: 20 }}
          transition={{ ease: "easeOut", duration: 2 }}
          className="txt-header"
          ref={scope}
        >
          <h1>Best Food For </h1>
          <h1>Your Pet</h1>
        </motion.div>
        <motion.div
          animate={{ x: 20 }}
          transition={{ ease: "easeOut", duration: 2 }}
          className="txt-header"
        >
          <p>Help you pet maintain a healthier weight</p>
        </motion.div>

        <button>
          Shop Now
          <Link className="link" to={"/produits/"}>
            <div>
              <ArrowForwardIos className="icon-btn" />
            </div>
          </Link>
        </button>
      </div>
      <motion.div
        animate={{ y: 2}}
        transition={{ ease: "easeOut", duration: 3 }}
        className="right-banner"
      >
        <motion.div
          animate={{ y: -20 }}
          transition={{ ease: "easeOut", duration: 3 }}
        >
          <img alt="" src={items} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;
