"use client";
import style from "./button.module.css";

const Button = ({ item, currentLocation, handleClick }) => {
  return (
    <button
      className={`${style.button} ${
        item === currentLocation ? style.active : ""
      }`}
      onClick={() => handleClick(item)}
    >
      {item}
    </button>
  );
};

export default Button;
