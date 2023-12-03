import React, { useState } from "react";
import "./Featured.scss";
import NewCard from "../newProdcuts/NewCard";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
const FeaturedProducts = ({}) => {
  const { t, i18n } = useTranslation();
  const data = useSelector((state) => state.product.Product);
  const filtreddata = [...data].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="featured">
      <div className="wrapper">
        <h1>{t("fetPord")}</h1>
        <div className="center">
          {filtreddata.slice(0, 5).map((item) => {
            return <NewCard item={item} key={item.id} /> || <Skeleton />;
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
