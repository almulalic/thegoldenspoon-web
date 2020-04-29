import React from "react";
import axios from "axios";
import identities from "./identities";
import { Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";

// // Add a request interceptor
// axios.interceptors.request.use(
//   (config) => {
//     // Do something before request is sent
//     const token = localStorage.getItem("token");
//     jwt.verify(
//       token,
//       "8863a597700ad7fb2b2e42957d407e2df8ec14331f0aaff872c393be6a0f0b2e5bebc45f9af6fd5c1f5607498fd701e2",
//       (err, decodedToken) => {
//         if (!err) {
//           config.headers["x-token"] = `Bearer ${localStorage.getItem("token")}`;
//           config.headers["x-refresh-token"] = `Bearer ${localStorage.getItem(
//             "refreshToken"
//           )}`;
//         } else {
//           identities
//             .refreshToken({
//               refreshToken: localStorage.getItem("refreshToken"),
//             })
//             .then((refreshResponse) => {
//               console.log(refreshResponse);
//               localStorage.setItem("token", refreshResponse.data.token);
//             })
//             .catch(() => {
//               localStorage.clear();
//               return <Redirect to="/loginRegister" />;
//             });
//         }
//       }
//     );

//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

// // Add a response interceptor
// axios.interceptors.response.use(
//   function (response) {
//     // Do something with response data

//     return response;
//   },
//   function (error) {
//     // Do something with response error
//     const { config, response } = error;

//     return Promise.reject(error);
//   }
// );

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
          console.log(res);
          if (res.status === 200) {
            // 1) put token to LocalStorage
            console.log(res);
            localStorage.setItem("accessToken", res.data.accessToken);

            // 2) Change Authorization header
            axios.defaults.headers.common["x-token"] =
              "Bearer " + localStorage.getItem("accessToken");

            // 3) return originalRequest object with Axios.
            return axios(originalRequest);
          }
        });
    }

    // return Error object with Promise
    return Promise.reject(error);
  }
);
export default axios;
