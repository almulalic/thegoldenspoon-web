import React, { useState, useEffect } from "react";
import "./LoginRedirect.scss";
import { ProgressSpinner } from "primereact/progressspinner";
import identities from "../../api/identities";
import { useHistory } from "react-router-dom";
import restaurants from "../../api/restaurants";
import { MergeRestaurantData } from "../../shared/RestaurantUtils";

export const LoginRedirect = (props) => {
  const [tokenValidationError, setTokenValidationError] = useState(false);

  let history = useHistory();

  const populateLocalStorage = (token) => {
    localStorage.setItem("token", token);

    restaurants
      .fetchCategories()
      .then((restaurantsCategoryResponse) => {
        localStorage.setItem(
          "restaurantCategories",
          JSON.stringify(restaurantsCategoryResponse.data)
        );
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
        history.push({
          pathname: "/loginRegister",
          state: { error: "Restaurants Category API problem" },
        });
      });

    restaurants
      .fetchSubcategories()
      .then((subcategoriesResponse) => {
        localStorage.setItem(
          "restaurantSubcategories",
          JSON.stringify(subcategoriesResponse.data)
        );
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
        history.push({
          pathname: "/loginRegister",
          state: { error: "Restaurants Subcategories API problem" },
        });
      });

    restaurants
      .fetchRestaurants()
      .then((restaurantsResponse) => {
        localStorage.setItem(
          "restaurants",
          JSON.stringify(restaurantsResponse.data)
        );
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
        history.push({
          pathname: "/loginRegister",
          state: { error: "Restaurants API problem" },
        });
      });

    localStorage.setItem(
      "categoriesAndSubcategories",
      JSON.stringify(MergeRestaurantData())
    );

    history.push("/profile");
  };

  const validateToken = (token) => {
    identities.validateToken(token).then((tokenResponse) => {
      console.log(tokenResponse);
      switch (tokenResponse.data) {
        case 1:
          populateLocalStorage(token);
          break;
        case 2:
          localStorage.clear();
          history.push({
            pathname: "/loginRegister",
            state: { error: "Token rejected" },
          });
          break;
        case 3:
          localStorage.clear();
          history.push({
            pathname: "/loginRegister",
            state: { error: "Token malformed" },
          });
          break;
        default:
          localStorage.clear();
          history.push({
            pathname: "/loginRegister",
            state: { error: "Internal server error" },
          });
          break;
      }
    });
  };

  useEffect(() => {
    if (props.location.state.previousLocation === "loginRegister")
      validateToken(props.match.params.token);
    else {
      localStorage.clear();
      history.push({
        pathname: "/404",
        state: { error: "Token malformed" },
      });
    }
  });

  return (
    <div className="loginRedirect">
      <div className="overlay">
        <div className="spinner">
          <ProgressSpinner strokeWidth="4" animationDuration="1s" />
          <h3>Please wait untill we get everything ready...</h3>
        </div>
      </div>
    </div>
  );
};
