import axios from "axios";
import { BASE_API_URL } from "./index";
import apiClient from "./apiClient";

export default {
  fetchUserRecord: (username) =>
    apiClient
      .get(BASE_API_URL + `/restaurant/fetchUserRecord/${username}`)
      .catch((err) => {
        console.log(err);
      }),
  updateRestaurantRecord: (body) =>
    apiClient
      .post(BASE_API_URL + `/restaurant/updateRestaurantRecord`, body)
      .catch((err) => {
        console.log(err);
      }),
};
