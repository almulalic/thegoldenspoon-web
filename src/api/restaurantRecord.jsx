import axios from "axios";

export default {
  fetchRestaurants: (body) =>
    axios.get(`/restaurant/fetchRestaurants`, body).catch((err) => {
      console.log(err);
    }),
  fetchCategories: (body) =>
    axios.get(`/restaurant/fetchCategories`, body).catch((err) => {
      console.log(err);
    }),
  fetchSubcategories: (body) =>
    axios.get(`/restaurant/fetchSubcategories`, body).catch((err) => {
      console.log(err);
    }),
  fetchUserRecord: (id) =>
    axios.get(`/restaurant/fetchUserRecord/${id}`).catch((err) => {
      console.log(err);
    }),
};
