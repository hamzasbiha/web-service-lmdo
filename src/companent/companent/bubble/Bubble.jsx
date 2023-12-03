import React, { useState, useEffect } from "react";
import * as icon from "@mui/icons-material";
import "./Bubble.scss";
import { useDispatch, useSelector } from "react-redux";
import { showDrawer } from "../../../redux/Alert/AlertSlice";
import {
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";

const Bubble = () => {
  const [isBubbleVisible, setBubbleVisible] = useState(false);
  const [showAdditionalBalls, setShowAdditionalBalls] = useState(false);
  useEffect(function () {
    function handleScroll() {
      if (window.scrollY > 100) {
        setBubbleVisible(true);
      } else {
        setBubbleVisible(false);
        setShowAdditionalBalls(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return function () {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const options = {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: 50,
    };
    scroll.scrollToTop(options);
  };
  return (
    <div
      className={"bubble " + (isBubbleVisible ? "visible" : "")}
      style={{
        display: isBubbleVisible ? "" : "none",
        opacity: isBubbleVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div className="bubble-content">
        <div
          className={"ball"}
          style={{
            transition: "all 0.3s ease",
            top: 800,
            transform:
              "translateY(" + (showAdditionalBalls ? "-60" : "100px") + ")",
          }}
          onClick={() => scrollToTop()}
        >
          <icon.ArrowUpwardTwoTone />
        </div>
      </div>
    </div>
  );
};

export default Bubble;
