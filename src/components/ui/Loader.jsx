import React from "react";
import "./Loader.css";

const Loader = ({ width, height }) => {
  return (
    <div
      className="flex justify-center items-center"
      style={{
        width: `${width}px`, 
        height: height ? `${height}px` : "100vh", // Full height if no height prop
      }}
    >
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
