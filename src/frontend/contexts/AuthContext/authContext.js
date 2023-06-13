import axios from "axios";
import { createContext, useContext, useState, useEffect, useReducer } from "react";
import { logInService, signUpService } from "../../services/API/Auth/auth_API";
import { ACTION_TYPE } from "../../utils";
import { useProductData } from "../productContext/productContext";
import { authReducer, initialState } from "../../reducer/authReducer";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, initialState);


  const loginUser = async (userData) => {

    if (userData) {
      try {
        const {
          data: { foundUser, encodedToken }

        } = await logInService(userData);


        localStorage.setItem("login", JSON.stringify({ token: encodedToken }));
        localStorage.setItem("user", JSON.stringify({ user: { ...foundUser, status: true } }));



        dispatch({
          type: ACTION_TYPE.SET_TOKEN,
          payload: encodedToken,
        });
        dispatch({
          type: ACTION_TYPE.SET_USER,
          payload: { ...foundUser, status: true }
        });

        dispatch({
          type: ACTION_TYPE.INITIAl_ADDRESS,
          payload: foundUser.addresses,
        });


      } catch (error) {
        console.log("Error in login user", error);
      }
    }
  };

  const signUpUser = async (userData) => {
    try {
      const {
        data: { createdUser, encodedToken },
        status,
      } = await signUpService(userData);
      if (status === 201) {

        localStorage.setItem("signup", JSON.stringify({ token: encodedToken }));
        localStorage.setItem("user", JSON.stringify({ user: { ...createdUser, status: true } }));

        dispatch({
          type: ACTION_TYPE.SET_TOKEN,
          payload: encodedToken,
        });
        dispatch({
          type: ACTION_TYPE.SET_USER,
          payload: { ...createdUser, status: true }
        });

      }
    } catch (error) {
      console.log("Error in login user", error);
    }
  };



  return (
    <AuthContext.Provider value={{ ...state, loginUser, signUpUser, dispatchAuthData: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthData = () => useContext(AuthContext);

export { useAuthData, AuthProvider };
