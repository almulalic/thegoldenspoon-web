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

  const PopulateLocalStorage = (accessToken, refreshToken) => {
    identities
      .decodeToken(accessToken)
      .then((decodedTokenResponse) => {
        localStorage.setItem(
          "user",
          JSON.stringify(decodedTokenResponse.data.user)
        );
      })
      .catch((err) => {
        console.log(err);
      });

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

        restaurants
          .fetchRestaurants()
          .then((restaurantsResponse) => {
            localStorage.setItem(
              "restaurants",
              JSON.stringify(restaurantsResponse.data)
            );

            localStorage.setItem(
              "categoriesAndSubcategories",
              JSON.stringify(MergeRestaurantData())
            );

            history.push("/records");
          })
          .catch((err) => {
            console.log(err);
            localStorage.clear();
            history.push({
              pathname: "/loginRegister",
              state: { error: "Restaurants API problem" },
            });
          });
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
        history.push({
          pathname: "/loginRegister",
          state: { error: "Restaurants Subcategories API problem" },
        });
      });
  };

  const ValidateToken = (accessToken, refreshToken) => {
    identities.validateToken(accessToken).then((tokenResponse) => {
      switch (tokenResponse.data) {
        case 1:
          PopulateLocalStorage(accessToken, refreshToken);
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
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
      ValidateToken(
        props.location.state.accessToken,
        props.location.state.refreshToken
      );
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
