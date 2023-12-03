import React, { useEffect } from "react";
import * as Icon from "@mui/icons-material";
import "./Profile.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserApi, logout } from "../../../redux/client/ClientSlice";
import { fetchSingleCart, fetchallcart } from "../../../redux/cartSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const user = useSelector((state) => state.user.user);
  const token = sessionStorage.getItem("access");
  useEffect(() => {
    let token = sessionStorage.getItem("access");
    dispatch(fetchUserApi(token));
    if (user.id !== undefined) {
      dispatch(fetchSingleCart({ id: user.id, token: token }));
    }
  }, [dispatch, token]);
  const handleLogout = () => {
    dispatch(logout());
    navigator("/");
    return sessionStorage.removeItem("access");
  };

  return (
    <div className="profile">
      <div className="list-nav">
        <h1>Mon compte</h1>
        <div className="divier"></div>
        <Link to={""} className="link">
          <div className="item">
            <Icon.Person />
            <span>Votre Compte</span>
          </div>
        </Link>
        <Link to={"commande/pending"} className="link">
          <div className="item">
            <Icon.ShoppingCartCheckoutRounded /> <span>Vos commands</span>
          </div>
        </Link>
        <Link to={"commande/pending"} className="link">
          <div className="item">
            <Icon.Message /> <span>Message Box</span>
          </div>
        </Link>
        <Link className="link" to={"setting"}>
          <div className="item">
            <Icon.Settings /> <span>Gérez votre Compte</span>
          </div>
        </Link>
        <Link className="link" to={"update-password"}>
          <div className="item">
            <Icon.Security /> <span>modifier votre mot de passe</span>
          </div>
        </Link>
        <Link className="link" to={"adreese"}>
          <div className="item">
            <Icon.SignalCellularAlt2BarSharp /> <span>Adresses</span>
          </div>
        </Link>
        <Link className="link" to={"delete"}>
          <div className="item">
            <Icon.Dangerous /> <span>Fermer le compte</span>
          </div>
        </Link>
        <Link className="link" to={"verify-accounte"}>
          <div className="item">
            <Icon.VerifiedUser /> <span>Verifiy votre compte</span>
          </div>
        </Link>
        <Link className="link ">
          <div className="item isDeco" onClick={() => handleLogout()}>
            <Icon.Logout /> <span>Déconnexion</span>
          </div>
        </Link>
      </div>
      <div className="right">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
