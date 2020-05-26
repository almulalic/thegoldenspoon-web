import React from "react";
import { useHistory } from "react-router-dom";

export const SidebarItem = ({
  icon,
  text,
  additionalIcon,
  pageLink = text,
}) => {
  let history = useHistory();
  const handlePageChange = (e) => {
    e.preventDefault();
    history.push(`/${pageLink}`);
  };

  return (
    <li className="has-sub">
      <a className="js-arrow" onClick={(e) => handlePageChange(e)}>
        <i className={icon}></i>
        {text}
        {additionalIcon && (
          <span className="arrow">
            <i className={additionalIcon}></i>
          </span>
        )}
      </a>
    </li>
  );
};
