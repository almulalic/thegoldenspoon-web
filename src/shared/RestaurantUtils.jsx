export const GenerateFullData = (userData) => {
  let _fullData = JSON.parse(localStorage.getItem("restaurants"));
  return _fullData.map((restaurant) => {
    let temp = userData.find((x) => x.restaurantId === restaurant.id);
    if (temp)
      return Object.assign({}, restaurant, {
        record: temp,
      });
    else
      return Object.assign({}, restaurant, {
        record: {},
      });
  });
};

export const MergeRestaurantData = () => {
  let _categoryData = JSON.parse(localStorage.getItem("restaurantCategories"));
  let _subcategoryData = JSON.parse(
    localStorage.getItem("restaurantSubcategories")
  );

  _categoryData.map((category) => {
    return (category.subcategories = []);
  });

  _subcategoryData.map((subcategory) => {
    _categoryData[subcategory.categoryId - 1].subcategories.push(subcategory);
  });

  return _categoryData;
};

export const GetStatusName = (statusId) => {
  switch (statusId) {
    case 0:
      return "Not eaten here";
    case 1:
      return "Booked for Next Trip";
    case 2:
      return "Eaten here";
  }
};

export const GenerateExpandedData = (restaurantData) => {
  let _categoriesAndSubcategories = JSON.parse(
    localStorage.getItem("categoriesAndSubcategories")
  );

  _categoriesAndSubcategories.map((category) => {
    category.subcategories.map((subcategory) => {
      subcategory.restaurants = restaurantData.filter(
        (restaurant) => restaurant.subcategoryId === subcategory.id
      );
    });
  });

  return _categoriesAndSubcategories;
};
