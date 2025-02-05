import axios from "axios";
import { BASE_API_URL } from "./index";
import apiClient from "./apiClient";

export default {
  fetchAllUsers: () => apiClient.get(BASE_API_URL + `/user/fetchAllUsers`),
  fetchUser: (username) =>
    apiClient
      .get(BASE_API_URL + `/user/fetchUser${username ? "/" + username : ""}`)
      .catch((err) => {
        console.log(err);
      }),
};
