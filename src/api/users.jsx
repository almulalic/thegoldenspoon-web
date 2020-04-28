import axios from "axios";
import { BASE_API_URL } from "./index";

export default {
  fetchAllUsers: () =>
    axios
      .get(BASE_API_URL + `/user/fetchAllUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .catch((err) => {
        console.log(err);
      }),
  fetchUser: (username) =>
    axios.get(BASE_API_URL + `/user/fetchUser/${username}`).catch((err) => {
      console.log(err);
    }),
};
