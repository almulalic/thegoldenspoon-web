import React from "react";
import axios from "axios";
import identities from "./identities";
import { Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["x-token"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return identities
        .refreshToken({
          refreshToken: localStorage.getItem("refreshToken"),
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Refreshed");
            localStorage.setItem("accessToken", res.data.accessToken);

            axios.defaults.headers.common["x-token"] =
              "Bearer " + localStorage.getItem("accessToken");

            return axios(originalRequest);
          }
        })
        .catch(() => {
          localStorage.clear();
          window.location.reload();
        });
    } else if (error.response.status === 403) {
      localStorage.clear();
      window.location.reload();
    }

    // return Error object with Promise
    return Promise.reject(error);
  }
);
export default axios;
