import React from "react";
import "./GridLayoutFilter.scss";
import img1 from "../../../assets/resource/widget4.jpg";
import img2 from "../../../assets/resource/widget2.jpg";
import img3 from "../../../assets/resource/widget.jpg";
import img4 from "../../../assets/resource/widget5.jpg";
import { useTranslation } from "react-i18next";
const GridLayoutFilter = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="GridLayoutFilter">
      <div className="wrapper-grid">
        <div className="left">
          <div className="item-left">
            <div className="hover-effect">
              <h1>{t("Chien")}</h1>
            </div>
            <img src={img3} alt="widg-4" />
          </div>
        </div>
        <div className="right">
          <div className="row-1">
            <div className="hover-effect">
              <h1>{t("Oiseaux")}</h1>
            </div>
            <div className="image">
              <img alt="widg-1" src={img1} />
            </div>
          </div>
          <div className="row-1">
            <div className="hover-effect">
              <h1>{t("Chats")}</h1>
            </div>
            <div className="image">
              <img alt="widg-2" src={img2} />
            </div>
          </div>
          <div className="row-1">
            <div className="hover-effect">
              <h1>see All</h1>
            </div>
            <div className="image">
              <img src={img2} alt="" className="mainImg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridLayoutFilter;
