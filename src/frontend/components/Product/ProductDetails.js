import React, { useState, useEffect } from "react";
import "./css/ProductPage.css";
import { useNavigate, useParams } from "react-router";
import Layout from "../common/Layout"
import { isProductInCart, isProductInWishlist } from "../../utils/cartUtils";
import { toast } from "react-toastify";
import { useProductData } from "../../contexts/productContext/productContext";
import { AiOutlineHeart, AiFillTag, AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";

export function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnWishlistDisabled, setWishlistBtnDisabled] = useState(false);
  // const { token } = useAuth();
  const { products, cart, dataDispatch, wishlist, changeTitle } = useProductData();

  const product = products?.find((product) => {
    return product.id === productId;
  });

  const isInCart = isProductInCart(cart, product?._id);
  const isInWishlist = isProductInWishlist(wishlist, product?._id);

  // const addToCartHandler = () => {
  //   token
  //     ? isInCart
  //       ? navigate("/cart")
  //       : addToCart(dataDispatch, product, token, toast, setBtnDisabled)
  //     : navigate("/login");
  // };

  // const addToWishlistHandler = () => {
  //   token
  //     ? isInWishlist
  //       ? navigate("/wishlist")
  //       : addToWishlist(dataDispatch, product, token, toast, setWishlistBtnDisabled)
  //     : navigate("/login");
  // };
  useEffect(() => {
    changeTitle(product?.title)
  })

  // if (products.length === 0) {
  //   setLoader(() => true);
  //   return <></>;
  // } else {
  // setLoader(() => false);

  return (
    <Layout>
      <div className="details-container ">

        <div className="details-left">

          <img className="details-img" src={product?.image} alt="" />

          <button
            className="details-add-to-cart"
            // onClick={() => addToCartHandler()}
            disabled={btnDisabled}
          >

            <AiOutlineShoppingCart className="details-cart-icon" /> {isInCart ? "Go to Cart" : "Add to Cart"}
          </button>


          {/* <button
              className="btn outlined-default  wishlist-btn"
              // onClick={() => addToWishlistHandler()}
              disabled={btnWishlistDisabled}
            >
              <i className="fa fa-heart-o" aria-hidden="true"></i>{" "}
              {isInWishlist ? "Go to Wishlist" : "Add to Wishlist"}
            </button> */}

        </div>

        <div className="details-right">
          <div className="details-right-upper">
            <div className="details-title">

              <div>
                <h2 className="details-title-header">{product?.title}</h2>
                <p className="star-ratings">
                  {product?.rating} 4.9 <AiFillStar className="star" />

                </p>
              </div>
              <AiOutlineHeart className="wishlist-icon" />
            </div>

            <div className="price"> <span className="MRP">M.R.P: ₹{product?.price}</span > <span>(Incl. of all taxes) </span> <span>(₹{product?.price / 4}/250g)</span></div>
            {/* <p className="actual-price">₹{product?.originalPrice}</p> */}
            {/* <p className="price-percentage">{product.percentageOff}% OFF</p> */}
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
            <p className="description-info">{product?.description}</p>
          </div>
          <div className="product-info">
            <h2 className="product-info-heading">Product Information</h2>

            <table>
              <tbody>
                <tr>
                  <td>Brand</td>
                  <td><p>{product?.Brand}</p></td>
                </tr>
                <tr> <td>Manufacturer</td>
                  <td><p>{product?.Manufacturer}</p></td> </tr>
                <tr> <td>Category</td>
                  <td><p>{product?.category}</p></td> </tr>
                <tr> <td> Sold By</td>
                  <td> <p>{product?.soldBy}</p></td> </tr>
                <tr> <td> Food Type</td>
                  <td> <p>{product?.foodType}</p></td> </tr>
                <tr> <td>Country of Origin</td>
                  <td><p>{product?.countryOfOrigin}</p></td> </tr>
                <tr> <td>  Net Quantity</td>
                  <td><p>{product?.quantity} {product?.scale}</p></td> </tr>
              </tbody>
            </table>

          </div>


        </div>

      </div>
    </Layout>
  )

}
