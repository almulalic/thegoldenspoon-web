import axios from "axios";
import { BASE_API_URL } from "./index";
import apiClient from "./apiClient";

export default {
  fetchAllUsers: () => apiClient.get(BASE_API_URL + `/user/fetchAllUsers`),
  fetchUser: (username) =>
    axios.get(BASE_API_URL + `/user/fetchUser/${username}`).catch((err) => {
      console.log(err);
    }),
};
