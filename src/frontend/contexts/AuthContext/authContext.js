import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { logInService, signUpService } from "../../services/API/Auth/auth_API";
import { ACTION_TYPE } from "../../utils";
import { useProductData } from "../productContext/productContext";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { dispatchData } = useProductData();
  const localStorageToken = JSON.parse(localStorage.getItem("login"));

  const [token, setToken] = useState(localStorageToken?.token);
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(localStorageUser?.user);



  const loginUser = async (userData) => {

    if (userData) {
      try {
        const {
          data: { foundUser, encodedToken },
          status,
        } = await logInService(userData);

        if (status === 200) {
          localStorage.setItem("login", JSON.stringify({ token: encodedToken }));
          setToken(encodedToken);
          localStorage.setItem("user", JSON.stringify({ user: foundUser }));
          setUser(foundUser);
          dispatchData({
            type: ACTION_TYPE.INITIAl_ADDRESS,
            payload: foundUser.address,
          });
        }
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
        setToken(encodedToken);
        localStorage.setItem("user", JSON.stringify({ user: createdUser }));
        setUser(createdUser);
        dispatchData({
          type: ACTION_TYPE.INITIAl_ADDRESS,
          payload: createdUser.address,
        });
      }
    } catch (error) {
      console.log("Error in login user", error);
    }
  };

  useEffect(() => {
    if (token) {
      dispatchData({
        type: ACTION_TYPE.INITIAl_ADDRESS,
        payload: user.address,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, loginUser, signUpUser, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
