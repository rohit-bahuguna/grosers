import React, { useState } from "react";
import Layout from "../common/Layout";
import Input from "../custom/Input";
import Button from "../custom/Button";
import { validateUserData } from "../../services/validation/signInValidater";
import { signInService } from "../../services/API/Auth/auth_API";
import "./auth.css";
import { Link } from "react-router-dom";
const LogIn = () => {
  const initialErrors = {
    passwordError: { message: "", error: false },
    emailError: { message: "", error: false },
  };
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(initialErrors);
  const [loading, setLoading] = useState(false);

  const getUserData = (e) => {
    setError(initialErrors);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const userSignIn = async (e) => {
    e.preventDefault();
    const { success, errors } = validateUserData(userData);

    if (success) {
      try {
        setLoading(true);
        const { data } = await signInService(userData);

      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {

      setLoading(false);
      setError({ ...error, ...errors });
    }
  };

  return (
    <Layout>
      <div className="signinouter">
        <div className="signinner">

          <h2 className="signup">Grosers</h2>
          <div className="signinform">
            <Input
              inputInfo={{
                type: "email",
                label: "Email",
                callback: getUserData,
                name: "email",
                error: error.emailError
              }}
              style={""}
            />
            <Input
              inputInfo={{
                type: "password",
                label: "Password",
                callback: getUserData,
                name: "password",
                error: error.passwordError
              }}
              className={""}
            />


            <Button
              title={!loading ? "Log In" : "Logging In"}
              callback={userSignIn}
              style={"signinbtn"}
            />
            <Button
              title={"Sign In as Guest"}
              callback={userSignIn}
              style={"signinguest"}
            />
            <p className="signinNewAccount">New here? <Link to="/signup"><span>Create account</span></Link> </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LogIn;
