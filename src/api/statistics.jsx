import axios from "axios";
import { BASE_API_URL } from "./index";
import apiClient from "./apiClient";

export default {
  fetchUserStatistics: (username) =>
    axios
      .get(BASE_API_URL + `/statistics/fetchUserStatistics/${username}`)
      .catch((err) => {
        console.log(err);
      }),
};
