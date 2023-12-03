import React from "react";
import Lottie from "lottie-react";
import notFound from "../../../assets/lottie/404.json";
import "./NotFound.scss";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="empty">
      <div className="btn-link-bk">
        <Link to={"/"} className="link">
          Go Back
        </Link>
      </div>
      <h1>404 Not Found</h1>
      <div className="lottie">
        <Lottie animationData={notFound} loop={true} />
      </div>
    </div>
  );
};

export default NotFound;
