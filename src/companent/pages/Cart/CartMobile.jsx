import React, { useEffect, useState } from "react";
import "./CartMobile.scss";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromCart,
  updateCartItemQuantity,
} from "../../../redux/cartSlice";

function formatCurrency(value) {
  return value.toFixed(2); // Displaying prices with two decimal places
}

const OrderMobile = () => {
  const cartList = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const Navgation = useNavigate();
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const dispatch = useDispatch();
  const TAX_RATE = 0.05; // 5% tax rate
  const discount = 0.3; // 30% discount

  useEffect(() => {
    calculateTotalPrice();
  }, []);

  const calculateTotalPrice = () => {
    let subtotal = 0;

    cartList.forEach((item) => {
      const price =
        user.accountType === "Personal" || !user.accountType
          ? item.priceForPersonal
          : item.priceForCompany;

      subtotal += price * item.QTE;
    });

    const calculatedTax = subtotal * TAX_RATE;
    const discountedSubtotal = subtotal * (1 - discount);

    setTax(calculatedTax);
    setSubtotal(discountedSubtotal);

    return discountedSubtotal + calculatedTax;
  };

  const handleContinue = () => {
    // Add your logic for continuing the process here
    Navgation("/votre-pannier");
  };

  return (
    <div className="mobile-cart">
      <div className="top-section"> </div>
      <div className="wrapper">
        {cartList.length !== 0 ? (
          <div className="list-item">
            {cartList.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
            <div className="summary">
              <div className="row">
                <span>Subtotal: </span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="row">
                <span>Tax: </span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="row">
                <span>Total: </span>
                <span>{formatCurrency(subtotal + tax)}</span>
              </div>
              <div></div>
              <button onClick={handleContinue}>Continue</button>
            </div>
          </div>
        ) : (
          <div>
            <h1>
              No products yet. Go
              <span>
                <Link className="link">get your product now</Link>
              </span>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderMobile;
