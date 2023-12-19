// Skeleton.jsx
import React from "react";
import "./Skeleton.scss";

const Skeleton = ({ type }) => {
  const gridCount = 12;
  const FeaturedPost = () => {
    return (
      <div className={`card-sk ${type}`}>
        <div className="item-sk-top">
          <div className="image-sk"></div>
        </div>
        <div className="content-sk"></div>
        <div className="title-sk"></div>
        <div className="title-sk"></div>
      </div>
    );
  };
  const GridItem = () => {
    return (
      <div className="item-list-sk">
        <div className="item-top-sk"></div>
        <div className="title-sk"> </div>
        <div className="price-sk"> </div>
      </div>
    );
  };
  const CardInfoUser = () => {
    return (
      <div className="user-det-skele">
        <div className="list-info-skele">
        </div>
        <div className="list-info-skele">
        </div>
        <div className="list-info-skele">
        </div>
        <div className="list-info-skele">
        </div>
        <div className="list-info-skele">
        </div>
        <div className="list-info-skele">
        </div>
        <div className="list-info-skele">
        </div>
        <div className="list-info-skele">
        </div>
      </div>
    );
  };
  if (type === "featr") return <FeaturedPost />;
  if (type === "grid-item") return <GridItem />;
  if (type === "card-info") return <CardInfoUser />;
};

export default Skeleton;
