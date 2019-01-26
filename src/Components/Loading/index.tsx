import React from "react";
import "./style.scss";

export const Loading = () => {
  return (
    <div className="lds-ripple">
      <div />
      <div />
    </div>
  );
};

export default Loading;
