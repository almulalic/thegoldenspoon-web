import React from "react";
import "./BorderCard.scss";

export const BorderCard = ({ title, children }) => {
  return (
    <div class="au-card m-b-30">
      <div class="au-card-inner">
        <h3 class="title-2 m-b-40">{title}</h3>
        {children}
      </div>
    </div>
  );
};
