import axios from "axios";
import { BASE_API_URL } from "./index";
import apiClient from "./apiClient";

export default {
  fetchUserStatistics: () =>
    apiClient
      .get(BASE_API_URL + `/statistics/fetchUserStatistics`)
      .catch((err) => {
        console.log(err);
      }),
  fetchGoldenSpoonProgress: () =>
    apiClient
      .get(BASE_API_URL + `/statistics/fetchGoldenSpoonProgress`)
      .catch((err) => {
        console.log(err);
      }),
};
