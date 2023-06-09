import "./App.css";
import { Route, Routes } from "react-router-dom";

import LogIn from "./frontend/components/Auth/Login";
import HomePage from "./frontend/components/Home/HomePage";
import Footer from "./frontend/components/common/Footer";
import MockMan from "mockman-js"
import SignUp from "./frontend/components/Auth/SignUp";
import { ProductListing } from "./frontend/components/Product/Product";
import { ProductDetails } from "./frontend/components/Product/ProductDetails";
import { Cart } from "./frontend/components";
import { Checkout } from "./frontend/components/Checkout/Checkout";
import { OrderSummary } from "./frontend/components/OrderSummary/OrderSummary";
import { UserProfile } from "./frontend/components/UserProfile/UserProfile";
import { Wishlist } from "./frontend/components/Wishlist/Wishlist";

function App() {
  return (
    <>
      <Routes>
        <Route path="/mockman" element={<MockMan />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/products/:category" element={<ProductListing />} />
        <Route path="/product-details/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;