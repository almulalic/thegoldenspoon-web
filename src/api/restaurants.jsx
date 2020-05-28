import axios from "axios";
import { BASE_API_URL } from "./index";
import apiClient from "./apiClient";

export default {
  fetchRestaurants: (body) =>
    apiClient
      .get(BASE_API_URL + `/restaurant/fetchRestaurants`, body)
      .catch((err) => {
        console.log(err);
      }),
  fetchCategories: (body) =>
    apiClient
      .get(BASE_API_URL + `/restaurant/fetchCategories`, body)
      .catch((err) => {
        console.log(err);
      }),
  fetchSubcategories: (body) =>
    apiClient
      .get(BASE_API_URL + `/restaurant/fetchSubcategories`, body)
      .catch((err) => {
        console.log(err);
      }),
  fetchNewRestaurants: (body) =>
    apiClient
      .get(BASE_API_URL + `/restaurant/fetchNewRestaurants`, body)
      .catch((err) => {
        console.log(err);
      }),

  addNewRestaurant: (body) =>
    apiClient
      .put(BASE_API_URL + `/restaurant/addNewRestaurant`, body)
      .catch((err) => {
        console.log(err);
      }),

  fetchRestaurant: (id) =>
    apiClient
      .get(BASE_API_URL + `/restaurant/fetchRestaurant/${id}`)
      .catch((err) => {
        console.log(err);
      }),

  modifyRestaurnat: (id) =>
    apiClient
      .get(BASE_API_URL + `/restaurant/modifyRestaurant/${id}`)
      .catch((err) => {
        console.log(err);
      }),

  removeRestaurant: (id) =>
    apiClient
      .delete(BASE_API_URL + `/restaurant/removeRestaurant/${id}`)
      .catch((err) => {
        console.log(err);
      }),
};
