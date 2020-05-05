import React from "react";
import "./OverviewItem.scss";

export const OverviewItem = ({ heading, text, icon, version, chart }) => {
  return (
    <div className={`overview-item overview-item--${version}`}>
      <div className="overview__inner">
        <div className="overview-box clearfix">
          <div className="icon">
            <i className={icon}></i>
          </div>
          <div className="text">
            <h2>{heading}</h2>
            <span>{text}</span>
          </div>
        </div>
        {chart && (
          <div className="overview-chart">
            <canvas id="widgetChart1"></canvas>
          </div>
        )}
      </div>
    </div>
  );
};
