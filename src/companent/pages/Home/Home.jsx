import React, { useEffect } from "react";
import "./Home.scss";
import FeaturedProducts from "../../companent/featuredProuducts/FeaturedProducts";
import Banner from "../../companent/banner/Banner";
import Announcement from "../../companent/announcement/Announcement";
import { fetchUserApi } from "../../../redux/client/ClientSlice";
import { useDispatch } from "react-redux";
import { fetchSingleCart } from "../../../redux/cartSlice";
import { useSelector } from "react-redux";
import ProdcutLayout from "./ProdcutLayout/ProdcutLayout";
import MapStore from "../../Map/MapStore";
import { ToastContainer } from "react-toastify";
import CustomizedSnackbars from "./ProdcutLayout/snackBar/SnackBar";
import { fetchProdcuts } from "../../../redux/products/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  let token = sessionStorage.getItem("access");

  const user = useSelector((state) => state.user.user);
  const showSnackbar = user.notifcation === 'Notify';

  useEffect(() => {
    if (token) {
      dispatch(fetchUserApi(token));
      dispatch(fetchSingleCart({ id: user.id, token: token }));
      dispatch(fetchProdcuts());
    }
  }, [token]);

  return (
    <div className="home">
      <Banner />
      <ToastContainer />
      <FeaturedProducts type={"new"} />
      <ProdcutLayout />
      <Announcement />
      <FeaturedProducts type={"trending"} />
      <MapStore />

      {showSnackbar && <CustomizedSnackbars show={showSnackbar} />}
    </div>
  );
};

export default Home;
