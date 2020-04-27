import axios from "axios";
import { BASE_API_URL } from "./index";

export default {
  fetchUserRecord: (id) =>
    axios
      .get(BASE_API_URL + `/restaurant/fetchUserRecord/${id}`)
      .catch((err) => {
        console.log(err);
      }),
  updateRestaurantRecord: (body) =>
    axios
      .post(BASE_API_URL + `/restaurant/updateRestaurantRecord`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .catch((err) => {
        console.log(err);
      }),
};
