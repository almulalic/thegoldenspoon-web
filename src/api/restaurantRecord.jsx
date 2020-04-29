import axios from "axios";
import { BASE_API_URL } from "./index";
import apiClient from "./apiClient";

export default {
  fetchUserRecord: (id) =>
    axios
      .get(BASE_API_URL + `/restaurant/fetchUserRecord/${id}`)
      .catch((err) => {
        console.log(err);
      }),
  updateRestaurantRecord: (body) =>
    axios
      .post(BASE_API_URL + `/restaurant/updateRestaurantRecord`, body)
      .catch((err) => {
        console.log(err);
      }),
};
