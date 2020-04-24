import React, { useState, useEffect } from "react";
import restaurantRecord from "../../api/restaurantRecord";
import { Accordion, AccordionTab } from "primereact/accordion";
import _ from "lodash";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";

const ProfileTest = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [userRecords, setUserRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [isFetchingRestaruants, setIsFetchinguserRecords] = useState(false);
  const [areuserRecordsEmpty, setAreuserRecordsEmpty] = useState(true);
  const [categoriesFullData, setCategoriesFullData] = useState([]);

  // const mergeCategoriesAndSubcategories = (categories, subcategories) => {
  //   let _categoriesFullData = subcategories.map((subcategorie) => {
  //     switch (subcategorie.categoryId) {
  //       case 1:
  //         categories;
  //     }
  //   });

  //   setCategoriesFullData(_categoriesFullData);
  //   setIsFetchinguserRecords(false);
  // };

  console.log(categoriesFullData);

  const generateFullData = (fullData, userData) => {
    let _allRecords = fullData.map((restaurant) => {
      if (userData[restaurant.id + 1] != null)
        return Object.assign({}, restaurant, {
          record: userData[restaurant.id + 1],
        });
      else
        return Object.assign({}, restaurant, {
          record: {},
        });
    });

    setAllRecords(_allRecords);
    setIsFetchinguserRecords(false);
  };

  // const fetch = () => {
  //   restaurantRecord.fetchCategories().then((resp) => {
  //     localStorage.setItem("categories", JSON.stringify(resp));
  //   });
  //   restaurantRecord.fetchSubcategories().then((resp) => {
  //     localStorage.setItem("subcategories", JSON.stringify(resp));
  //     mergeCategoriesAndSubcategories(
  //       JSON.parse(localStorage.getItem("categories"), resp)
  //     );
  //   });
  // };

  const fetchUserRecords = () => {
    restaurantRecord
      .fetchUserRecord(47)
      .then((userRecordsResponse) => {
        setUserRecords(userRecordsResponse.data);
        generateFullData(
          JSON.parse(localStorage.getItem("restaurants")),
          userRecordsResponse.data
        );
      })
      .catch((err) => {
        console.log(err);
        setIsFetchinguserRecords(false);
      });
  };

  useEffect(() => {
    setIsFetchinguserRecords(true);
    fetchUserRecords();
    // fetch();
  }, []);

  const [activeAccordionIndex, setActiveAccordionIndex] = useState();

  const getStatusName = (statusId) => {
    switch (statusId) {
      case 0:
        return "Not eaten here";
      case 1:
        return "Booked for Next Trip";
      case 2:
        return "Eaten here";
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="main">
      <div style={{ width: "400px", alignSelf: "center", textAlign: "left" }}>
        {isFetchingRestaruants ? (
          <ProgressSpinner />
        ) : (
          <Accordion
            activeIndex={activeAccordionIndex}
            onTabChange={(e) => setActiveAccordionIndex(e.index)}
          >
            {allRecords.map((restaurant, key) => {
              return (
                <AccordionTab header={restaurant.name} key={key}>
                  {_.isEmpty(restaurant.record) ? (
                    <p> You didnt eat in this restaurant yet</p>
                  ) : (
                    <div>
                      <Message
                        severity="info"
                        text={getStatusName(restaurant.record.status)}
                      />
                      <p>IsFavorite: {restaurant.record.isFavorite}</p>
                    </div>
                  )}
                </AccordionTab>
              );
            })}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default ProfileTest;
