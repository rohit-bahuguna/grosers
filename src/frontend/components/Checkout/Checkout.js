import React, { useEffect, useState } from "react";

import { CheckoutPrice } from "./CheckoutPrice";
import "./Checkout.css";
import { useOrderData } from "../../contexts/orderContext";
import { ACTION_TYPE } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useProductData } from "../../contexts/productContext/productContext";
import { useCartData } from "../../contexts/cartContext/cartContext";
import { useAuthData } from "../../contexts/AuthContext/authContext";
import Layout from "../common/Layout";
import { OrderSummary } from "../OrderSummary/OrderSummary";

export function Checkout() {
  const { changeTitle } = useProductData();
  const { cart } = useCartData()
  const { addresses } = useAuthData()
  console.log(addresses);
  const { dispatch, orderAddress } = useOrderData();
  const [msg, setMsg] = useState(false);
  const navigate = useNavigate();

  const placedHandler = () => {

    setTimeout(() => {
      navigate("/order-summary");
    }, 1500);
  };
  useEffect(() => {
    cart.length === 0 && navigate("/products");
    changeTitle("Checkout");
  }, []);

  return (
    <Layout>
      <div className="checkout-container">
        {msg ? (
          <div>
            <h1 className="checkout-main-container flex-center  text-center">
              🥂 You order has successfully placed
            </h1>
            <OrderSummary />
          </div>
        ) : (
          <div className="checkout-main-container flex-center">
            <h3>CHECKOUT </h3>
            <div className="checkout-manage">
              <div className="checkout-manage-item ">
                {addresses &&
                  addresses.map(({ _id, name, houseNumber, street, city, state, country, pinCode, mobile }) => (
                    <div key={_id} className="address-checkout-container ">
                      <label className="select-input">
                        <input
                          type="radio"
                          name="radio"
                          className="radio-input-address"
                          checked={orderAddress._id === _id}
                          onChange={() =>
                            dispatch({
                              type: ACTION_TYPE.ORDER_ADDRESS,
                              payload: {
                                _id,
                                name,
                                street,
                                city,
                                state,
                                country,
                                pinCode,
                                mobile,
                              },
                            })
                          }
                        />
                        <p className="paragraph-md ">{houseNumber} , {name}</p>
                      </label>
                      <div className="address-details-checkout">
                        <p className="paragraph-sm">
                          {street}, {city},{state}. {pinCode}
                        </p>
                        <p className="paragraph-sm">{country}.</p>

                      </div>
                    </div>
                  ))

                }
                <button>
                  Add Address
                </button>
              </div>
              <CheckoutPrice setMsg={setMsg} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
