import React, { useState, useEffect } from "react";
import {
  GenerateFullData,
  GetStatusName,
  GenerateExpandedData,
} from "../../shared/RestaurantUtils";
import { Accordion, AccordionTab } from "primereact/accordion";
import { ProgressSpinner } from "primereact/progressspinner";
import restaurantRecord from "../../api/restaurantRecord";
import { Message } from "primereact/message";
import _ from "lodash";

import "./RestaurantRecords.scss";
import RestaurantCard from "./restaurantCard/RestaurantCard";

export const RestaurantRecords = () => {
  // MAIN STATES
  const [expandedRecords, setExpandedRecords] = useState([]);
  const [allRestaurantRecords, setAllRestaurantRecords] = useState([]);
  const [userRecords, setUserRecords] = useState([]);

  // ACCORDION STATES
  const [
    categoryActiveAccordionIndex,
    setCategoryActiveAccordionIndex,
  ] = useState();

  const [
    subcategoruActiveAccordionIndex,
    setSubcategoruActiveAccordionIndex,
    ,
  ] = useState();

  // LOADING STATES
  const [isFetchingRestaurants, setIsFetchinguserRecords] = useState(false);

  // API
  const fetchUserRecords = () => {
    restaurantRecord
      .fetchUserRecord(47)
      .then((userRecordsResponse) => {
        setUserRecords(userRecordsResponse.data);
        let _allRecords = GenerateFullData(userRecordsResponse.data);
        setAllRestaurantRecords(_allRecords);
        setExpandedRecords(GenerateExpandedData(_allRecords));
      })
      .catch((err) => {
        console.log(err);
        setIsFetchinguserRecords(false);
      });
  };

  useEffect(() => {
    fetchUserRecords();
  }, []);

  return (
    <div className="main">
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="container"
      >
        <div style={{ width: "400px", alignSelf: "center", textAlign: "left" }}>
          {isFetchingRestaurants ? (
            <ProgressSpinner />
          ) : (
            <Accordion
              activeIndex={categoryActiveAccordionIndex}
              onTabChange={(e) => setCategoryActiveAccordionIndex(e.index)}
            >
              {expandedRecords.map((category, categoryKey) => {
                return (
                  <AccordionTab header={category.name} key={categoryKey}>
                    <Accordion
                      activeIndex={subcategoruActiveAccordionIndex}
                      onTabChange={(e) =>
                        setSubcategoruActiveAccordionIndex(e.index)
                      }
                    >
                      {category.subcategories.map(
                        (subcategory, subcategoryKey) => {
                          return (
                            <AccordionTab
                              header={subcategory.name}
                              key={subcategoryKey}
                            >
                              {subcategory.restaurants.map(
                                (restaurant, restaurantKey) => {
                                  {
                                    return (
                                      <RestaurantCard
                                        restaurant={restaurant}
                                        key={restaurantKey}
                                      />
                                    );
                                  }
                                }
                              )}
                            </AccordionTab>
                          );
                        }
                      )}
                    </Accordion>
                  </AccordionTab>
                );
              })}
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
};
