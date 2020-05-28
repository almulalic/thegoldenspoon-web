import { BASE_API_URL } from ".";
import apiClient from "./apiClient";

export default {
  FetchRestaurantTypes: (body) =>
    apiClient
      .get(BASE_API_URL + `/lookup/FetchRestaurantTypes`)
      .catch((err) => {
        console.log(err);
      }),
  FetchRestaurantExperience: (body) =>
    apiClient
      .get(BASE_API_URL + `/lookup/FetchRestaurantExperience`)
      .catch((err) => {
        console.log(err);
      }),
  FetchResturantMealPeriod: (body) =>
    apiClient
      .get(BASE_API_URL + `/lookup/FetchResturantMealPeriod`)
      .catch((err) => {
        console.log(err);
      }),
  FetchResturantAvailability: (body) =>
    apiClient
      .get(BASE_API_URL + `/lookup/FetchResturantAvailability`)
      .catch((err) => {
        console.log(err);
      }),
};