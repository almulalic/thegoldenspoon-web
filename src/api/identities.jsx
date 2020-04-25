import axios from "axios";
import { BASE_API_URL } from "./index";

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
};
