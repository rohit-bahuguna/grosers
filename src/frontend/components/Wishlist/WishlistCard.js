import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthData } from "../../contexts/AuthContext/authContext";

import { calcPercentage, isProductInCart } from "../../utils/cartUtils";
import { toast } from "react-toastify";
import { useWishlistData } from "../../contexts/wishlistContext";
import { useCartData } from "../../contexts/cartContext/cartContext";

export default function WishlistCard({ product, cart, dataDispatch }) {
  const { token } = useAuthData();
  const navigate = useNavigate();
  const isInCart = isProductInCart(cart, product._id);
  const { removeProductFromWishlist } = useWishlistData()
  const { addProductToCart } = useCartData()
  const moveToCartHandler = () => {
    removeProductFromWishlist(product._id, token);
    addProductToCart(product, token);
  };

  return (
    <div className="wishlist-item">
      <img src={product.img} alt="" />
      <div className="item-info">
        <header>
          <div className="item-desc">
            <h4 className="card-title-header">{product.title}</h4>
            <p className="card-description">{product.soldBy}</p>
            <div className="price">
              <p className="disc-price">₹{product.price}</p>
              <p className="actual-price">₹{product.originalPrice}</p>
              <p className="price-percentage">
                {" "}
                ({calcPercentage(product.price, product.originalPrice)}% OFF)
              </p>
            </div>
          </div>
          <div className="delete-icon">
            <i
              className="fa fa-trash-o"
              aria-hidden="true"
              onClick={() => removeProductFromWishlist(product._id, token)}
            />
          </div>
        </header>

        <button
          className="btn default move-to-cart"
          onClick={() => (isInCart ? navigate("/cart") : moveToCartHandler())}
        >
          {isInCart ? "Already in Cart" : "Move to Cart"}
        </button>
      </div>
    </div>
  );
}
