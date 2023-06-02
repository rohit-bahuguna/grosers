import "./App.css";
import { Route, Routes } from "react-router-dom";

import LogIn from "./frontend/components/Auth/Login";
import HomePage from "./frontend/components/Home/HomePage";
import Footer from "./frontend/components/common/Footer";
import MockMan from "mockman-js"
function App() {
  return (
    <>
      <Routes>
         <Route path="/mockman" element={<MockMan />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        {/* <Route path="/signup" element={<SignIn />} /> */}
      </Routes>
    </>
  );
}

export default App;