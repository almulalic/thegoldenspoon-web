import axios from "axios";
import { BASE_API_URL } from "./index";
import apiClient from "./apiClient";

export default {
  fetchUserRecord: (username) =>
    apiClient
      .get(BASE_API_URL + `/restaurantRecord/fetchUserRecord/${username}`)
      .catch((err) => {
        console.log(err);
      }),
  upsertRestaurantRecord: (body) =>
    apiClient
      .put(BASE_API_URL + `/restaurantRecord/upsertRestaurantRecord`, body)
      .catch((err) => {
        console.log(err);
      }),
};
