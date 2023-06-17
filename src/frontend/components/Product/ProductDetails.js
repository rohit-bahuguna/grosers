import React, { useState, useEffect } from "react";
import "./css/ProductPage.css";
import { useNavigate, useParams } from "react-router";
import Layout from "../common/Layout"
import { isProductInCart, isProductInWishlist } from "../../utils/cartUtils";
import { toast } from "react-toastify";
import { useProductData } from "../../contexts/productContext/productContext";
import { AiOutlineHeart, AiFillTag, AiOutlineShoppingCart, AiFillStar, AiFillHeart } from "react-icons/ai";
import { useAuthData } from "../../contexts/AuthContext/authContext";
import { useCartData } from "../../contexts/cartContext/cartContext";
import { useWishlistData } from "../../contexts/wishlistContext";

export function ProductDetails() {
  const { productId } = useParams();
  // console.log("product", productId);
  const navigate = useNavigate();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnWishlistDisabled, setWishlistBtnDisabled] = useState(false);
  // const { token } = useAuthData();
  const { products, changeTitle } = useProductData();
  const { cart, addProductToCart } = useCartData();
  const { wishlist, addProductToWishlist, removeProductFromWishlist } = useWishlistData()
  const { token } = useAuthData();

  const product = products?.find((item) => {
    return item.id === productId;
  });



  const { _id, id, image, title, rating, description, originalPrice, percentageOff, price, Brand, Manufacturer, soldBy, quantity, scale, category, countryOfOrigin, foodType } = product

  const isInCart = isProductInCart(cart, id);
  const isInWishlist = isProductInWishlist(wishlist, id);

  console.log(isInWishlist);
  const addToCartHandler = () => {
    token
      ? isInCart
        ? navigate('/cart')
        : addProductToCart(product, token)
      : navigate('/login');
  };


  const wishlistHandler = () => {
    token
      ? isInWishlist
        ? removeProductFromWishlist(id, token)
        : addProductToWishlist(product, token)
      : navigate('/login');
  };

  useEffect(() => {
    changeTitle(title)
  }, [])

  // if (products.length === 0) {
  //   setLoader(() => true);
  //   return <></>;
  // } else {
  // setLoader(() => false);

  return (
    <Layout>
      <div className="details-container ">

        <div className="details-left">

          <img className="details-img" src={image} alt="" />

          <button
            className="details-add-to-cart"
            onClick={() => addToCartHandler()}
            disabled={btnDisabled}
          >


            <AiOutlineShoppingCart className="details-cart-icon" /> {isInCart ? "Go to Cart" : "Add to Cart"}
          </button>




        </div>

        <div className="details-right">
          <div className="details-right-upper">
            <div className="details-title">

              <div>
                <h2 className="details-title-header">{title}</h2>
                <p className="star-ratings">
                  {rating} 4.9 <AiFillStar className="star" />

                </p>
              </div>
              {isInWishlist ? <AiFillHeart className=' inWishlist-icon' onClick={wishlistHandler} /> : <AiOutlineHeart className="wishlist-icon " onClick={wishlistHandler} />}
            </div>

            <div className="price"> <span className="MRP">M.R.P: ₹{price}</span > <span>(Incl. of all taxes) </span> <span>(₹{price / 4}/250g)</span></div>
            <p className="actual-price">₹{originalPrice}</p>
            <p className="price-percentage">{percentageOff}% OFF</p>
          </div>

          <div className="msg">

            <p className="tag-msg">
              <AiFillTag className="tag" /> <span>Fastest Delivery</span>
            </p>
            <p className="tag-msg">
              <AiFillTag className="tag" /> <span>Inclusive of All Taxes</span>
            </p>
            <p className="tag-msg">
              <AiFillTag className="tag" /> <span>Cash On Delivery Available</span>
            </p>
          </div>
          <div className="description">
            <h2>Description</h2>
            <p className="description-info">{description}</p>
          </div>
          <div className="product-info">
            <h2 className="product-info-heading">Product Information</h2>

            <table>
              <tbody>
                <tr>
                  <td>Brand</td>
                  <td><p>{Brand}</p></td>
                </tr>
                <tr> <td>Manufacturer</td>
                  <td><p>{Manufacturer}</p></td> </tr>
                <tr> <td>Category</td>
                  <td><p>{category}</p></td> </tr>
                <tr> <td> Sold By</td>
                  <td> <p>{soldBy}</p></td> </tr>
                <tr> <td> Food Type</td>
                  <td> <p>{foodType}</p></td> </tr>
                <tr> <td>Country of Origin</td>
                  <td><p>{countryOfOrigin}</p></td> </tr>
                <tr> <td>  Net Quantity</td>
                  <td><p>{quantity} {scale}</p></td> </tr>
              </tbody>
            </table>

          </div>


        </div>

      </div>
    </Layout>
  )

}
