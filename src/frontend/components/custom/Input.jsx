import React from "react";
import "./custom.css";
const Input = ({ inputInfo: { label, type, callback, name }, style = "" }) => {
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
      </div>
    </>
  );
};

export default Input;
