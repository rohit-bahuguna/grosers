import React from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { calcPercentage, isProductInWishlist } from "../../utils/cartUtils";
// import { addToWishlist, removeFromCart, updateQtyFromCart } from "../../../services";
import { useProductData } from "../../contexts/productContext/productContext";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCartData } from "../../contexts/cartContext/cartContext";
import { useAuthData } from "../../contexts/AuthContext/authContext";

export function CartProduct({ product }) {
  const { token } = useAuthData();
  const { dataDispatch, wishlist, updateProductQtyFromCart, removeProductFromCart } = useCartData()
  const navigate = useNavigate();

  const isInWishlist = isProductInWishlist(wishlist, product.id);

  const cartClickHandler = (type) => updateProductQtyFromCart(product._id, token, type);

  // const moveToWishlistHandler = () => {
  //   addToWishlist(dataDispatch, product, token, toast);
  //   removeProductFromCart(product._id, dataDispatch, token, toast);
  // };

  return (
    <div key={product._id} className="card horizontal-container">
      <div className="card-horizontal">
        <img className="card-img horizontal-img" src={product.image} alt={product.title} />

      </div>
      <div className="card-right">
        <div className="card-info">
          <div className="card-title">
            <div>
              <h2>{product.title} {product.quantity} {product.scale}</h2>
              <p className="sold-by">Sold By : {product.soldBy}</p>
            </div>
          </div>
          <div className="price">
            <p className="disc-price">₹{product.price}</p>
            <p className="actual-price">₹{product.originalPrice}</p>
            <p className="price-percentage">({product.percentageOff}% OFF)</p>
          </div>
          <div className="qty">

            <button
              className="qty-btn"
              onClick={() => product.qty > 1 && cartClickHandler("DEC_QTY")}
              disabled={product.qty > 1 ? false : true}
            >
              <AiOutlineMinus className="minus" />
            </button>
            <span className="qty-count">{product.qty}</span>
            <button
              className="qty-btn"
              onClick={() => cartClickHandler("INC_QTY")}
            >
              <AiOutlinePlus className="add" />
            </button>
          </div>
        </div>
        <div>
          <button
            className="remove-btn"
            onClick={() => {
              removeProductFromCart(product._id, token);
            }}
          >
            REMOVE
          </button>
          <button
            className="wishlist-btn"
          //  onClick={() => (isInWishlist ? navigate("/wishlist") : moveToWishlistHandler())}
          >
            {isInWishlist ? "ALREADY IN WISHLIST" : "MOVE TO WISHLIST"}
          </button>
        </div>
      </div>
    </div>
  );
}
