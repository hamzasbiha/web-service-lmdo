import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./CartItem.scss";
import { DeleteOutline } from "@mui/icons-material";
import {
  removeItemFromCart,
  updateCartItemQuantity,
} from "../../../../redux/cartSlice";
const CartItem = ({ item }) => {
  const user = useSelector((state) => state.user.client);
  const dispatch = useDispatch();
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
    if (item.QTE < item.stock) {
      dispatch(
        updateCartItemQuantity({
          id: item.id,
          QTE: item.QTE + 1,
        })
      );
    } else {
      alert("Stock is limited for this item");
      console.log("Stock is limited for this item");
    }
  };
  const handleChangetarget = (e) => {
    console.log("target type touch start");
  };
  return (
    <div className="cartItem">
      <img alt="item-img" src={item.images[0]} />
      <div className="details">
        <h1>{item.title.slice(40)} </h1>
        <span>{item.priceForPersonal} TND</span>
      </div>
      <div className="order-contrl">
        <button onClick={() => handleDecreaseQuantity(item)}>-</button>
        <span>{item.QTE}</span>
        <button onClick={() => handleIncreaseQuantity(item)}>+</button>
        <span onClick={() => dispatch(removeItemFromCart(item.id, item))}>
          <DeleteOutline />
        </span>
      </div>
    </div>
  );
};

export default CartItem;
