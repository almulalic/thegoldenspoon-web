import axios from "axios";
import { BASE_API_URL } from ".";
import apiClient from "./apiClient";

export default {
  register: (body) =>
    axios.post(BASE_API_URL + `/identity/register`, body).catch((err) => {
      console.log(err);
    }),
  login: (body) =>
    axios.post(BASE_API_URL + `/identity/login`, body).catch((err) => {
      console.log(err);
    }),
  isUniqueEmail: (email) =>
    axios
      .get(BASE_API_URL + `/identity/isUniqueEmail/${email}`)
      .catch((err) => {
        console.log(err);
      }),
  isUniqueUsername: (username) =>
    axios
      .get(BASE_API_URL + `/identity/isUniqueUsername/${username}`)
      .catch((err) => {
        console.log(err);
      }),
  confirmation: (token) =>
    axios.get(BASE_API_URL + `/identity/confirmation/${token}`).catch((err) => {
      console.log(err);
    }),
  validateToken: (token) =>
    axios
      .get(BASE_API_URL + `/identity/validateToken/${token}`)
      .catch((err) => {
        console.log(err);
      }),
  decodeToken: (token) =>
    axios.get(BASE_API_URL + `/identity/decodeToken/${token}`).catch((err) => {
      console.log(err);
    }),
  refreshToken: (body) =>
    axios.post(BASE_API_URL + `/identity/refreshToken`, body).catch((err) => {
      console.log(err);
    }),
};
