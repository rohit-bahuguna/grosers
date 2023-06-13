import React, { useEffect } from "react";
import { useWishlistData } from "../../contexts/wishlistContext";
import WishlistCard from "./WishlistCard";
import "./css/Wishlist.css";
import { useProductData } from "../../contexts/productContext/productContext";
import Layout from "../common/Layout";
export function Wishlist() {
  const { wishlist, cart, dispatchWishlistData } = useWishlistData();
  const { changeTitle } = useProductData()
  const isWishlistHasItem = wishlist.length > 0;

  changeTitle("Wishlist")
  return (
    <Layout>
      <div className="wishlist-container">
        <div className="wishlist-main-container flex-center">
          <h3>MY WISHLIST {isWishlistHasItem && `(${wishlist.length})`}</h3>
          {isWishlistHasItem ? (
            <div className="wishlist-manage">
              <div className="wishlist">
                {wishlist.map((product) => (
                  <WishlistCard
                    key={product._id}
                    product={product}
                    cart={cart}
                    dispatchWishlistData={dispatchWishlistData}
                  />
                ))}
              </div>
            </div>
          ) : (
            <h1 className="text-center"> Your Wishlist Is Empty ! ☹️</h1>
          )}
        </div>
      </div>
    </Layout>
  );
}
