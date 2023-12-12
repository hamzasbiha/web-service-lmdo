import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import animation1 from "../../../assets/lottie/animation1.json";
import Lottie from "lottie-react";
import { useLottie } from "lottie-react";
import { addtocart, updateCartItemQuantity } from "../../../redux/cartSlice";
import "./Product.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneProdcut } from "../../../redux/products/productSlice";
import FeaturedProducts from "../../companent/featuredProuducts/FeaturedProducts";

const Product = () => {
  const { id } = useParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const user = useSelector((state) => state.user.user);
  const [ImageLoad, setImageLoad] = useState(false);
  const cartlist = useSelector((state) => state.cart.cart);
  const [selecteImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.product.SingleProduct);
  const options = {
    animationData: animation1,
    loop: true,
  };
  const { View } = useLottie(options);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchOneProdcut(id));
    const img = new Image();
    img.onload = () => {
      setImageLoad(true);
    };
    img.src = selectedProduct.images;
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, [id, ImageLoad, windowWidth]);

  const getItemQuantityInCart = (itemId) => {
    const itemInCart = cartlist.find((item) => item.id === itemId);
    return itemInCart ? itemInCart.QTE : 1;
  };
  const handleDecreaseQuantity = (item) => {
    if (item.QTE > 1) {
      dispatch(
        updateCartItemQuantity({
          id: item.id,
          QTE: item.QTE - 1,
        })
      );
    }
  };

  const handleIncreaseQuantity = (item) => {
    if (getItemQuantityInCart(selectedProduct.id) === 1) {
      dispatch(
        addtocart({ ...selectedProduct, QTE: quantity }, selectedProduct.id)
      );
    } else {
      const currentQuantity = getItemQuantityInCart(item.id);
      if (currentQuantity < item.stock) {
        dispatch(
          updateCartItemQuantity({
            id: item.id,
            QTE: currentQuantity + 1,
          })
        );
      }
    }
  };
  console.log(user);
  return (
    <>
      <div className="product">
        <div className="left">
          {windowWidth > 900 ? (
            <>
              <div className="images">
                {ImageLoad ? (
                  selectedProduct.images.slice(0, 3).map((item, index) => {
                    return (
                      <React.Fragment key={item.id}>
                        <img
                          alt="list-img"
                          src={item}
                          onClick={() => setSelectedImage(index)}
                          loading="lazy"
                        />
                      </React.Fragment>
                    );
                  })
                ) : (
                  <Lottie animationData={animation1} loop={true} />
                )}
              </div>
              <div className="main-img">
                {ImageLoad ? (
                  <img alt="" src={selectedProduct.images[selecteImage]} loading="lazy" />
                ) : (
                  <Lottie
                    animationData={animation1}
                    loop={true}
                    color="#a7c957"
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <div className="main-img">
                {ImageLoad && (
                  <img alt="" src={selectedProduct.images[selecteImage]} />
                )}
              </div>
              <div className="images">
                {ImageLoad &&
                  selectedProduct.images.slice(0, 3).map((item, index) => {
                    return (
                      <React.Fragment key={item.id}>
                        <img
                          alt="list-img"
                          src={item}
                          onClick={() => setSelectedImage(index)}
                        />
                      </React.Fragment>
                    );
                  })}
              </div>
            </>
          )}
        </div>
        <div className="right">
          <h1>{selectedProduct.title}</h1>
          <div className="brand">
            <span>
              Brands:<span className="item">{selectedProduct.market}</span>
            </span>
          </div>
          <span>
            {user.accountType === "Society" && <span className="item-price ">
              {selectedProduct.priceForCompany}TND
            </span>}
            {!user || user.accountType === "Personal" && <span className="item-price ">
              {selectedProduct.priceForPersonal}TND
            </span>}
            {user.accountType === "Admin" && <div style={{
              display: "flex",
              flexDirection: "column",
              gap:"10px"
            }}><span className="item-price ">
                {selectedProduct.priceForPersonal}TND
              </span>
              <span className="item-price ">
                {selectedProduct.priceForCompany}TND
              </span></div>}
          </span>
          <span>
            quantity : <span className="item">{selectedProduct.quantity}</span>
          </span>
          <span>
            Categories :<span className="item">{selectedProduct.category}</span>
          </span>
          <div className="add-cart-dec">
            <button onClick={() => handleDecreaseQuantity(selectedProduct)}>
              -
            </button>
            <span>{getItemQuantityInCart(selectedProduct.id)}</span>
            <button onClick={() => handleIncreaseQuantity(selectedProduct)}>
              +
            </button>
            <button
              onClick={() => {
                dispatch(
                  addtocart(
                    { ...selectedProduct, QTE: quantity },
                    selectedProduct.id
                  )
                );
              }}
              className="btn-add"
            >
              Ajoute au pannier
            </button>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="divier"></div>
        <div>
          <h1>Description</h1>
          <p>{selectedProduct.content} </p>
        </div>
        <div>
          <h2>Features</h2>
          <ul>
            <li>{selectedProduct.content}</li>
          </ul>
        </div>
        <div>
          <h2>Quintity</h2>
          <ul>
            <li>25 kg</li>
          </ul>
        </div>
        <h1>Related Products</h1>
        <div className="similar">
          <FeaturedProducts />
        </div>
      </div>
    </>
  );
};

export default Product;
