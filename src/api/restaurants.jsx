import axios from "axios";
import { BASE_API_URL } from "./index";

export default {
  fetchRestaurants: (body) =>
    axios
      .get(BASE_API_URL + `/restaurant/fetchRestaurants`, body)
      .catch((err) => {
        console.log(err);
      }),
  fetchCategories: (body) =>
    axios
      .get(BASE_API_URL + `/restaurant/fetchCategories`, body)
      .catch((err) => {
        console.log(err);
      }),
  fetchSubcategories: (body) =>
    axios
      .get(BASE_API_URL + `/restaurant/fetchSubcategories`, body)
      .catch((err) => {
        console.log(err);
      }),
};
