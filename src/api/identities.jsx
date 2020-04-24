import axios from "axios";

export default {
  register: (body) =>
    axios.post(`/identity/register`, body).catch((err) => {
      console.log(err);
    }),
  login: (body) =>
    axios.post(`/identity/login`, body).catch((err) => {
      console.log(err);
    }),
  isUniqueEmail: (email) =>
    axios.get(`/identity/isUniqueEmail/${email}`).catch((err) => {
      console.log(err);
    }),
  isUniqueUsername: (username) =>
    axios.get(`/identity/isUniqueUsername/${username}`).catch((err) => {
      console.log(err);
    }),
};
