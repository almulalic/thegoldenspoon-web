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
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Stack } from "../../elements/stack/Stack";
import "./RestaurantRecords.scss";
import UserRestaurantCard from "./restaurantCard/user/UserRestaurantCard";
import GuestRestaurantCard from "./restaurantCard/guest/GuestRestaurantCard";
import restaurants from "../../api/restaurants";

export const RestaurantRecords = ({ props }) => {
  // MAIN STATES
  const [expandedRecords, setExpandedRecords] = useState([]);
  const [allRestaurantRecords, setAllRestaurantRecords] = useState([]);
  const [userRecords, setUserRecords] = useState([]);
  const [isGuest, setIsGuest] = useState(true);

  // ACCORDION STATES
  const [
    categoryActiveAccordionIndex,
    setCategoryActiveAccordionIndex,
  ] = useState([]);

  const [
    subcategoruActiveAccordionIndex,
    setSubcategoruActiveAccordionIndex,
    ,
  ] = useState([]);

  // LOADING STATES
  const [isFetchingRecords, setIsFetchingRecords] = useState(false);

  // LOCAL FUNCTIONS
  const [expandAllCategories, setExpandAllCategories] = useState(false);
  const [expandAllSubategories, setExpandAllSubcategories] = useState(false);

  const handleExpandAllCategories = (newState) => {
    setExpandAllCategories(newState);
    if (newState) setCategoryActiveAccordionIndex([0, 1, 2, 3, 4]);
    else setCategoryActiveAccordionIndex([]);
  };

  const handleExpandAllSubcategories = (newState) => {
    setExpandAllSubcategories(newState);
    setExpandAllCategories(newState);
    if (newState)
      setSubcategoruActiveAccordionIndex((prevState) =>
        Array.from(Array(39).keys())
      );
    else setSubcategoruActiveAccordionIndex([]);
  };

  // API
  const fetchUserRecords = (uid) => {
    setIsFetchingRecords(true);
    restaurantRecord
      .fetchUserRecord(uid)
      .then((userRecordsResponse) => {
        setUserRecords(userRecordsResponse.data);

        let _allRecords = GenerateFullData(userRecordsResponse.data);
        setAllRestaurantRecords(_allRecords);
        setExpandedRecords(GenerateExpandedData(_allRecords));
        setIsFetchingRecords(false);
      })
      .catch((err) => {
        console.log(err);
        setIsFetchingRecords(false);
      });
  };

  useEffect(() => {
    if (props.match.path === "/profile") {
      fetchUserRecords(JSON.parse(localStorage.getItem("user")).id);
      setIsGuest(false);
    } else {
      fetchUserRecords(props.match.params.uid);
      setIsGuest(true);
    }
  }, []);

  return (
    <div className="RestaurantRecords">
      <div className="RestaurantRecords-Navigation">
        <Toolbar>
          <Stack distribution="center" alignment="center">
            <Button
              label={
                (expandAllCategories ? `Contract` : `Expand`) +
                ` all categories`
              }
              onClick={() => {
                handleExpandAllCategories(!expandAllCategories);
              }}
              disabled={isFetchingRecords}
            />

            <Button
              label={
                (expandAllSubategories ? `Contract` : `Expand`) +
                ` all subcategories`
              }
              onClick={() => {
                handleExpandAllSubcategories(!expandAllSubategories);
              }}
              disabled={isFetchingRecords}
            />
          </Stack>
        </Toolbar>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="profile-container"
      >
        <div style={{ width: "600px", alignSelf: "center", textAlign: "left" }}>
          {isFetchingRecords ? (
            <Stack alignment="center" distribution="center">
              <ProgressSpinner />
            </Stack>
          ) : (
            <Accordion
              activeIndex={categoryActiveAccordionIndex}
              onTabChange={(e) => setCategoryActiveAccordionIndex(e.index)}
              multiple
            >
              {expandedRecords.map((category, categoryKey) => {
                return (
                  <AccordionTab header={category.name} key={categoryKey}>
                    <Accordion
                      activeIndex={subcategoruActiveAccordionIndex}
                      onTabChange={(e) =>
                        setSubcategoruActiveAccordionIndex(e.index)
                      }
                      multiple
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
                                      <div key={restaurantKey}>
                                        {isGuest ? (
                                          <GuestRestaurantCard
                                            restaurant={restaurant}
                                            key={restaurantKey}
                                          />
                                        ) : (
                                          <UserRestaurantCard
                                            restaurant={restaurant}
                                            key={restaurantKey}
                                          />
                                        )}
                                      </div>
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
