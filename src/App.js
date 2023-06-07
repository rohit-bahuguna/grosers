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

      </Routes>
    </>
  );
}

export default App;