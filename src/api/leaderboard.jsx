import { BASE_API_URL } from ".";
import apiClient from "./apiClient";

export default {
  fetchOverallLeaderbord: (body) =>
    apiClient
      .get(BASE_API_URL + `/leaderboard/fetchOverallLeaderbord`)
      .catch((err) => {
        console.log(err);
      }),
};
