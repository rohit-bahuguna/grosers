import React from "react";
import "./custom.css";
const Input = ({ inputInfo: { label, type, callback, name, error }, style = "" }) => {
  console.log(error);
  return (
    <>
      <div className="input">
        <label htmlFor="" className="label">
          {label}
        </label>
        <input
          type={type}
          className={`${style} `}
          onChange={callback}
          name={name}
        />
        {
          error.status ? <p className="error">{error.error}</p> : ""
        }
      </div>
    </>
  );
};

export default Input;
