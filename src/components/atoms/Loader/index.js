import React from "react";
import "./styles.scss";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="orbit-loader">
          <div className="orbit"></div>
          <div className="orbit"></div>
          <div className="orbit"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;