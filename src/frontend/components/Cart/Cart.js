import React from "react";
import { useState, useEffect } from "react";

import "./css/Cart.css";
import { CartPrice } from "./CartPrice";
import { CartProduct } from "./CartProduct";
import { CouponModal } from "./CouponModal";
import { useProductData } from "../../contexts/productContext/productContext";
import { useCartData } from "../../contexts/cartContext/cartContext";
import Layout from "../common/Layout";
import { Link } from "react-router-dom";

export function Cart() {
  const { cart } = useCartData();
  const { changeTitle } = useProductData()
  const isCartHasItem = cart.length > 0;
  const [couponModal, setCouponModal] = useState(false);

  useEffect(() => { changeTitle("Cart") }, []);

  return (
    <Layout>
      <div className="cart-container">
        <div className="cart-main-container">
          {/* <h3>MY CART {isCartHasItem && `(${cart.length})`}</h3> */}
          <div className="cart-manage">
            <div className="cart-manage-item">
              {isCartHasItem ? (
                cart.map((product) => <CartProduct key={product._id} product={product} />)
              ) : (
                <div className="empty-cart">
                  <h2 > Your Cart Is Empty ! ☹️</h2>
                  <Link to="/products">
                    <button className="explore-products">
                      Explore Products
                    </button>
                  </Link>
                  <img src="/images/empty-cart.avif" className="empty-cart-image" />
                </div>
              )}
            </div>
            {isCartHasItem && <CartPrice setCouponModal={setCouponModal} />}
          </div>
          {couponModal && <CouponModal setCouponModal={setCouponModal} />}
        </div>
      </div>
    </Layout>
  );
}
