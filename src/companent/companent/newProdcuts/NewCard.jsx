import React, { useEffect } from "react";
import Skeleton from "../../pages/Home/ProdcutLayout/ListProdcuts/skeleton/Skeleton";

import "./NewCard.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es";
const NewCard = ({ item }) => {
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.product.loding);
  const pending = useSelector((state) => state.product.pending);
  const error = useSelector((state) => state.product.error);

  return (
    <>
      {loading || pending ? (
        <Skeleton type="featr" />
      ) : (
        <div className="card">
          <Link to={`produit/${item.id}`} className="link">
            <div className="item-top">
              <div className="image">
                {<img src={item.images[0]} alt="" loading="lazy" /> || (
                  <Skeleton />
                )}
              </div>
            </div>
            <div className="content">
              <div className="card-title">
                {item.title.slice(0, 15) || <Skeleton />}....
              </div>
              <div className="card-price">
                <div className="price-start">
                  {!user || user.accountType === "Personal" && <h3>{item.priceForPersonal || <Skeleton />} TND</h3>}
                  {user.accountType === "Society" && <h3>{item.priceForPersonal || <Skeleton />} TND</h3>}
                </div>
                {
                  user.accountType === "Admin" && <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px"
                  }}> <div className="price-start">
                      <h3>Prix P {item.priceForPersonal || <Skeleton />} TND</h3>
                    </div>
                    <div className="price-start">
                      <h3>prix G {item.priceForCompany || <Skeleton />} TND</h3>
                    </div></div>
                }
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default NewCard;
