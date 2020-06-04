import React, { useState, useEffect, useCallback } from "react";
import { Page } from "./../../elements/page/Page";
import { InputText } from "primereact/inputtext";
import { Stack } from "../../elements/stack/Stack";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import restaurants from "../../api/restaurants";
import { Column } from "primereact/column";
import "./RestaurantManager.scss";
import { ScrollPanel } from "primereact/scrollpanel";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { TabView, TabPanel } from "primereact/tabview";
import { Checkbox } from "primereact/checkbox";
import { Card } from "primereact/card";
import lookup from "../../api/lookup";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import { decodeCamelCase } from "../../shared/utils";
import { Availability } from "../../shared/types/RestaurantTypes";

export const RestaurantManager = () => {
  const [isEditVisible, setEditVisible] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [restaurantsData, setRestaurantsData] = useState();

  const [restaurantResorts, setRestaurantResorts] = useState([]);
  const [restaurantThemePark, setRestaurantThemePark] = useState([]);
  const [restaurantTypes, setRestaurantTypes] = useState([]);
  const [restaurantExperience, setRestaurantExperience] = useState([]);
  const [restaurantMealPeriod, setRestaurantMealPeriod] = useState([]);
  const [restaurantAvailability, setRestaurantAvailability] = useState([]);

  const Humanize = (arr) => {
    return arr.map((x) => {
      return decodeCamelCase(x);
    });
  };

  const fetchRestaurantsData = () => {
    restaurants
      .fetchNewRestaurants()
      .then((response) => {
        setRestaurantsData(response.data);
        setIsLoadingData(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingData(false);
      });
  };

  const fetchLookups = () => {
    lookup
      .FetchResorts()
      .then((response) => {
        setRestaurantResorts(Humanize(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
    lookup
      .FetchThemeParks()
      .then((response) => {
        setRestaurantThemePark(Humanize(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
    lookup
      .FetchRestaurantTypes()
      .then((response) => {
        setRestaurantTypes(Humanize(response.data));
      })
      .catch((err) => {
        console.log(err);
      });

    lookup
      .FetchRestaurantExperience()
      .then((response) => {
        setRestaurantExperience(Humanize(response.data));
      })
      .catch((err) => {
        console.log(err);
      });

    lookup
      .FetchResturantMealPeriod()
      .then((response) => {
        setRestaurantMealPeriod(Humanize(response.data));
      })
      .catch((err) => {
        console.log(err);
      });

    lookup
      .FetchResturantAvailability()
      .then((response) => {
        setRestaurantAvailability(Humanize(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoadingData(true);
    fetchRestaurantsData();
    fetchLookups();
  }, []);

  const header = (
    <div>
      RESTAURANTS MANAGER
      <div className="p-datatable-globalfilter-container">
        {/* <InputText
          type="search"
          onInput={(e) => this.setState({ globalFilter: e.target.value })}
          placeholder="Global Search"
        /> */}
      </div>
    </div>
  );

  const loadingBody = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <ProgressSpinner />
    </div>
  );

  const render = (rowData, row) => {
    if (row.field === "resort") return restaurantResorts[rowData.resortId];
    else if (row.field === "themePark")
      return restaurantThemePark[rowData.themeParkId];
    else if (row.field === "type") return restaurantTypes[rowData.type];
    else if (row.field === "experience")
      return restaurantExperience[rowData.experience];
    else if (row.field === "mealPeriod")
      return restaurantMealPeriod[rowData.mealPeriod];
    else if (row.field === "availability")
      return restaurantAvailability[rowData.availability];
  };

  const renderBool = (rowData, row) => {
    if (row.field === "isGoldenSpoonPoint")
      return rowData.isGoldenSpoonPoint ? "Y" : "N";
    else if (row.field === "isBonusPoint")
      return rowData.isBonusPoint ? "Y" : "N";
    else if (row.field === "hasMobileOrder")
      return rowData.hasMobileOrder ? "Y" : "N";
  };

  const [optionsTabActiveIndex, setOptionsTabActiveIndex] = useState(0);

  // FETCH SINGLE RESTAURANT

  const fetchRestaurant = (id, purpose, populate = true) => {
    restaurants
      .fetchRestaurant(id)
      .then((res) => {
        if (populate) {
          if (purpose == "modify") {
            if (res.data != 1) {
              res.data.resortId = restaurantResorts[res.data.resortId];
              res.data.themeParkId = restaurantThemePark[res.data.themeParkId];
              res.data.type = restaurantTypes[res.data.type];
              res.data.experience = restaurantExperience[res.data.experience];
              res.data.mealPeriod = restaurantMealPeriod[res.data.mealPeriod];
              res.data.availability =
                restaurantAvailability[res.data.availability];
              setModifiedData(res.data);
              setModifiedDataVisible(true);
            } else toast.error("Id not found or already deleted");
          } else {
            if (res.data != 1) setRemoveData(res.data);
            else {
              toast.error("Id not found or already deleted");
              setRemoveData({ name: "" });
            }
          }
        }
      })
      .catch((err) => console.log(err));
  };

  // ADD RESTAURANT

  const [addRestaurantData, setAddRestaurantData] = useState({
    name: "",
    resortId: "",
    themeParkId: "",
    land: "",
    pavilion: "",
    resortHotel: "",
    type: "",
    experience: "",
    mealPeriod: "",
    availability: "",
    cusine: "",
    isGoldenSpoonPoint: false,
    isBonusPoint: false,
    hasMobileOrder: false,
    createdAt: new Date(),
  });

  const addRestaurant = (body) => {
    body.resortId = restaurantResorts.indexOf(body.resortId);
    body.themeParkId = restaurantThemePark.indexOf(body.themeParkId);
    body.type = restaurantTypes.indexOf(body.type);
    body.experience = restaurantExperience.indexOf(body.experience);
    body.mealPeriod = restaurantMealPeriod.indexOf(body.mealPeriod);
    body.availability = restaurantAvailability.indexOf(body.availability);

    let flag = false;
    Object.values(body).forEach((x) => {
      if (x == -1) {
        flag = true;
        return;
      }
    });

    if (flag) {
      toast.error("Bad request, check dropdowns, some are missing or invalid");
      return;
    }

    restaurants
      .addNewRestaurant(body)
      .then((response) => {
        if (response.data == 1) {
          addRestaurantData.resortId = restaurantResorts.indexOf(body.resortId);
          addRestaurantData.themeParkId = restaurantThemePark.indexOf(
            body.themeParkId
          );
          addRestaurantData.type = restaurantTypes.indexOf(body.type);
          addRestaurantData.experience = restaurantExperience.indexOf(
            body.experience
          );
          addRestaurantData.mealPeriod = restaurantMealPeriod.indexOf(
            body.mealPeriod
          );
          addRestaurantData.availability = restaurantAvailability.indexOf(
            body.availability
          );

          toast.error("Id not found or already deleted");
        } else {
          setRestaurantsData({
            name: "",
            resortId: "",
            themeParkId: "",
            land: "",
            pavilion: "",
            resortHotel: "",
            type: "",
            experience: "",
            mealPeriod: "",
            availability: "",
            cusine: "",
            isGoldenSpoonPoint: false,
            isBonusPoint: false,
            hasMobileOrder: false,
            createdAt: new Date(),
          });
          toast.success("Restaurant successfully added");
          setRestaurantsData();
        }
        fetchRestaurantsData();
      })
      .catch((err) => {
        toast.error("Bad request, please check your input");
      });
  };

  const handleAddChange = useCallback((newValue, id) => {
    setAddRestaurantData((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  }, []);

  // MODIFY RESTAURANT
  const [isUpdatingRestaurant, setIsUpdatingRestaurant] = useState(false);
  const [modifyRestaurantId, setModifyRestaurantId] = useState();
  const [modifiedData, setModifiedData] = useState({
    name: "",
    resortId: "",
    themeParkId: "",
    land: "",
    pavilion: "",
    resortHotel: "",
    type: "",
    experience: "",
    mealPeriod: "",
    availability: "",
    cusine: "",
    isGoldenSpoonPoint: false,
    isBonusPoint: false,
    hasMobileOrder: false,
    createdAt: new Date(),
  });
  const [modifiedDataVisible, setModifiedDataVisible] = useState(false);

  const handleModifyChange = useCallback((newValue, id) => {
    setModifiedData((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  }, []);

  const modifyRestaurant = (modData) => {
    setIsUpdatingRestaurant(true);
    modData.resortId = restaurantResorts.indexOf(modData.resortId);
    modData.themeParkId = restaurantThemePark.indexOf(modData.themeParkId);
    modData.type = restaurantTypes.indexOf(modData.type);
    modData.experience = restaurantExperience.indexOf(modData.experience);
    modData.mealPeriod = restaurantMealPeriod.indexOf(modData.mealPeriod);
    modData.availability = restaurantAvailability.indexOf(modData.availability);

    restaurants
      .modifyRestaurnat(modData)
      .then((res) => {
        if (res.data == 1) {
          toast.error("Id not found or already deleted");
          setIsUpdatingRestaurant(false);
        } else {
          toast.success("Restaurant successfully modified");
          fetchRestaurantsData();
          setIsUpdatingRestaurant(false);
        }

        modData.resortId = restaurantResorts[modData.resortId];
        modData.themeParkId = restaurantThemePark[modData.themeParkId];
        modData.type = restaurantTypes[modData.type];
        modData.experience = restaurantExperience[modData.experience];
        modData.mealPeriod = restaurantMealPeriod[modData.mealPeriod];
        modData.availability = restaurantAvailability[modData.availability];
      })
      .catch((err) => {
        console.log(err);
        toast.error("Bad request, please check your input");
        modData.resortId = restaurantResorts[modData.resortId];
        modData.themeParkId = restaurantThemePark[modData.themeParkId];
        modData.type = restaurantTypes[modData.type];
        modData.experience = restaurantExperience[modData.experience];
        modData.mealPeriod = restaurantMealPeriod[modData.mealPeriod];
        modData.availability = restaurantAvailability[modData.availability];
        setIsUpdatingRestaurant(false);
      });
  };

  // REMOVE RESTAURANT

  const [removeItemId, setRemoveItemId] = useState();
  const [removeData, setRemoveData] = useState({
    name: "",
    createdAt: new Date(),
  });

  const removeRestaurant = (id) => {
    restaurants
      .removeRestaurant(id)
      .then((res) => {
        if (res.data == 1) toast.error("Id not found or already deleted");
        else {
          fetchRestaurantsData();
          toast.success("Restaurant successfully removed");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Bad request, please check your input");
      });
  };

  return (
    <Page>
      <Stack vertical spacing="loose">
        <Button label="Open edit window" onClick={() => setEditVisible(true)} />
        <Dialog
          visible={isEditVisible}
          maximized
          onHide={() => setEditVisible(false)}
        >
          <ScrollPanel>
            <div
              style={{
                padding: "2em",
                lineHeight: "1.5",
                width: "120vw",
              }}
            >
              <DataTable
                // ref={(el) => (this.dt = el)}
                value={restaurantsData}
                header={header}
                responsive
                className="RestaurantsManager-Table"
                dataKey="id"
                loading={isLoadingData}
                loadingBody={loadingBody}
                rowHover
                // globalFilter={this.state.globalFilter}
                // selection={this.state.selectedCustomers}
                // onSelectionChange={(e) =>
                //   this.setState({ selectedCustomers: e.value })
                // }
                paginator
                rows={10}
                emptyMessage="No resturants found"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[10, 25, 50]}
              >
                <Column
                  field="id"
                  header="ID"
                  sortable
                  filter
                  style={{ width: "7%" }}
                  filterPlaceholder="Filter"
                  frozen
                />
                <Column
                  field="name"
                  header="Name"
                  style={{ width: "15%" }}
                  sortable
                  filter
                  filterPlaceholder="Filter"
                />
                <Column
                  field="resort"
                  header="Resort"
                  style={{ width: "10%" }}
                  sortable
                  filter
                  filterPlaceholder="Filter"
                  body={render}
                />
                <Column
                  field="themePark"
                  header="ThemePark"
                  style={{ width: "10%" }}
                  sortable
                  filter
                  filterPlaceholder="Filter"
                  body={render}
                />
                <Column
                  field="land"
                  header="Land"
                  style={{ width: "10%" }}
                  sortable
                  filter
                  filterPlaceholder="Filter"
                />
                <Column
                  field="pavilion"
                  header="Pavilion"
                  style={{ width: "10%" }}
                  sortable
                  filter
                  filterPlaceholder="Filter"
                />
                <Column
                  field="resortHotel"
                  header="Resort Hotel"
                  style={{ width: "5%" }}
                  sortable
                  filter
                  filterPlaceholder="Filter"
                />
                <Column
                  field="type"
                  header="Type"
                  style={{ width: "7%" }}
                  sortable
                  filter
                  filterPlaceholder="Filter"
                  body={render}
                />
                <Column
                  field="experience"
                  header="Experience"
                  style={{ width: "7%" }}
                  sortable
                  filter
                  filterPlaceholder="Filter"
                  body={render}
                />
                <Column
                  field="mealPeriod"
                  header="Meal Period"
                  style={{ width: "7%" }}
                  sortable
                  filter
                  filterPlaceholder="Filter"
                  body={render}
                />
                <Column
                  field="availability"
                  header="Availability"
                  style={{ width: "7%" }}
                  sortable
                  filter
                  filterPlaceholder="Filter"
                  body={render}
                />
                <Column
                  field="cusine"
                  header="Cusine"
                  style={{ width: "7%" }}
                  sortable
                  filter
                  filterPlaceholder="Filter"
                />
                <Column
                  field="isGoldenSpoonPoint"
                  header="Golden Spoon"
                  style={{ width: "5%" }}
                  sortable
                  filter
                  filterPlaceholder="Filter"
                  body={renderBool}
                />
                <Column
                  field="isBonusPoint"
                  header="Bonus Point"
                  style={{ width: "5%" }}
                  sortable
                  filter
                  filterPlaceholder="Filter"
                  body={renderBool}
                />
                <Column
                  field="hasMobileOrder"
                  header="Mobile Order"
                  style={{ width: "5%" }}
                  sortable
                  filter
                  filterPlaceholder="Filter"
                  body={renderBool}
                />
                <Column
                  field="createdAt"
                  header="Date Created"
                  style={{ width: "7%" }}
                  sortable
                  body={(rowData) => {
                    return (
                      rowData.createdAt.slice(0, 10) +
                      " " +
                      rowData.createdAt.slice(11, 19)
                    );
                  }}
                  filter
                  filterPlaceholder="Filter"
                />
                <Column
                  field="modifiedAt"
                  header="Last Modified"
                  body={(rowData) => {
                    return (
                      rowData.modifiedAt.slice(0, 10) +
                      " " +
                      rowData.modifiedAt.slice(11, 19)
                    );
                  }}
                  style={{ width: "7%" }}
                  sortable
                  filter
                  filterPlaceholder="Filter"
                />
              </DataTable>
            </div>

            <TabView
              activeIndex={optionsTabActiveIndex}
              onTabChange={(e) => setOptionsTabActiveIndex(e.index)}
            >
              <TabPanel leftIcon="fas fa-plus" header="Add">
                <Card title="Add Restaurant">
                  <Stack vertical spacing="none" style={{ fontSize: "16px" }}>
                    <p>
                      <span style={{ fontWeight: "bold" }}>1. Adding - </span>
                      Adding restaurant is really simple, you just need to enter
                      values just as in excel and everything will be saved in
                      one click, note that you don't need to input Id, Created
                      Date or Modified Date because they are generated on the
                      server.
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        2. Dropdowns -{" "}
                      </span>
                      Type/Experience/.. dropdowns are marked as drop down
                      menu's because they are stored in the database by Id which
                      is generated on the server, if you find any missing
                      attributes please send me a message so I can add them.
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>3. Cusine - </span>
                      Cusine MUST be separated by space, database interpets
                      commas as a separator sign and will try to divide it into
                      multiple columns, also comma separation is not suitable
                      for searching and csv exports which can be vital for the
                      app.
                      <br /> <span style={{ fontWeight: "bold" }}>
                        Good:
                      </span>{" "}
                      American Turkish Asian
                      <br /> <span style={{ fontWeight: "bold" }}>
                        {" "}
                        Bad:{" "}
                      </span>{" "}
                      America,Turkish,Asian
                    </p>
                    <p style={{ fontWeight: "bold", color: "red" }}>
                      Please also note that,for now, data is not veified and
                      everything can pass, check the input before you click add,
                      but if you do make a mistake you can always edit it in
                      edit tab.
                    </p>
                  </Stack>

                  <div className="EditProfile-InnerCardContent">
                    <Stack vertical>
                      <Stack alignment="center">
                        <span className="p-float-label">
                          <InputText
                            id="restaurantName"
                            label="Restaurant Name"
                            value={addRestaurantData.name}
                            onChange={(e) =>
                              handleAddChange(e.target.value, "name")
                            }
                          />

                          <label html For="float-input">
                            Restaurant Name
                          </label>
                        </span>

                        <Dropdown
                          id="resortDropdown"
                          className="EditProfile-resortDropdown"
                          placeholder="Resort"
                          label="resort"
                          value={addRestaurantData.resortId}
                          options={restaurantResorts}
                          onChange={(e) => {
                            handleAddChange(e.target.value, "resortId");
                          }}
                          className="EditProfile-FullWidthDropdown"
                        />
                        <Dropdown
                          id="themeParkDropdown"
                          className="EditProfile-resortDropdown"
                          placeholder="Theme Park"
                          label="themePark"
                          value={addRestaurantData.themeParkId}
                          options={restaurantThemePark}
                          onChange={(e) =>
                            handleAddChange(e.target.value, "themeParkId")
                          }
                          className="EditProfile-FullWidthDropdown"
                        />

                        <span className="p-float-label">
                          <InputText
                            id="land"
                            label="Land"
                            value={addRestaurantData.land}
                            onChange={(e) =>
                              handleAddChange(e.target.value, "land")
                            }
                          />

                          <label html For="float-input">
                            Land{" "}
                            <span
                              style={{
                                color: "blue",
                                fontWeight: "bold",
                                fontSize: "10px",
                              }}
                            >
                              - optional{" "}
                            </span>
                          </label>
                        </span>

                        <span className="p-float-label">
                          <InputText
                            id="pavilion"
                            label="Pavilion"
                            value={addRestaurantData.pavilion}
                            onChange={(e) =>
                              handleAddChange(e.target.value, "pavilion")
                            }
                          />

                          <label html For="float-input">
                            Pavilion{" "}
                            <span
                              style={{
                                color: "blue",
                                fontWeight: "bold",
                                fontSize: "10px",
                              }}
                            >
                              {" "}
                              - optional{" "}
                            </span>
                          </label>
                        </span>

                        <span className="p-float-label">
                          <InputText
                            id="resortHotel"
                            label="Resort Hotel"
                            value={addRestaurantData.resortHotel}
                            onChange={(e) =>
                              handleAddChange(e.target.value, "resortHotel")
                            }
                          />

                          <label html For="float-input">
                            Resort Hotel{" "}
                            <span
                              style={{
                                color: "blue",
                                fontWeight: "bold",
                                fontSize: "10px",
                              }}
                            >
                              {" "}
                              - optional{" "}
                            </span>
                          </label>
                        </span>
                      </Stack>

                      <Stack alignment="center">
                        <Dropdown
                          id="typeDropdown"
                          className="EditProfile-resortDropdown"
                          placeholder="Type"
                          label="types"
                          value={addRestaurantData.type}
                          options={restaurantTypes}
                          onChange={(e) =>
                            handleAddChange(e.target.value, "type")
                          }
                          className="EditProfile-FullWidthDropdown"
                        />
                        <Dropdown
                          id="experience"
                          className="EditProfile-resortDropdown"
                          placeholder="Experience"
                          label="experience"
                          value={addRestaurantData.experience}
                          options={restaurantExperience}
                          onChange={(e) =>
                            handleAddChange(e.target.value, "experience")
                          }
                          className="EditProfile-FullWidthDropdown"
                        />
                        <Dropdown
                          id="mealPeriod"
                          className="EditProfile-resortDropdown"
                          placeholder="Meal Period"
                          label="mealPeriod"
                          value={addRestaurantData.mealPeriod}
                          options={restaurantMealPeriod}
                          onChange={(e) =>
                            handleAddChange(e.target.value, "mealPeriod")
                          }
                          className="EditProfile-FullWidthDropdown"
                        />
                        <Dropdown
                          id="availability"
                          className="EditProfile-resortDropdown"
                          placeholder="Availability"
                          label="availability"
                          value={addRestaurantData.availability}
                          options={restaurantAvailability}
                          onChange={(e) =>
                            handleAddChange(e.target.value, "availability")
                          }
                          className="EditProfile-FullWidthDropdown"
                        />

                        <span className="p-float-label">
                          <InputText
                            id="cusine"
                            label="Cusine"
                            ch
                            value={addRestaurantData.cusine}
                            onChange={(e) =>
                              handleAddChange(e.target.value, "cusine")
                            }
                          />

                          <label html For="float-input">
                            Cusine{" "}
                            <span
                              style={{
                                color: "blue",
                                fontWeight: "bold",
                                fontSize: "10px",
                              }}
                            >
                              {" "}
                              - max 160 charachters{" "}
                            </span>
                          </label>
                        </span>

                        <div>
                          <Checkbox
                            inputId="goldenSpoon"
                            onChange={() =>
                              handleAddChange(
                                !addRestaurantData.isGoldenSpoonPoint,
                                "isGoldenSpoonPoint"
                              )
                            }
                            checked={addRestaurantData.isGoldenSpoonPoint}
                          />
                          <label
                            htmlFor="goldenSpoon"
                            className="p-checkbox-label"
                            style={{
                              fontWeight: "bold",
                              userSelect: "none",
                              cursor: "pointer",
                            }}
                          >
                            Golden Spoon
                          </label>
                        </div>

                        <div>
                          <Checkbox
                            inputId="isBonusPoint"
                            onChange={() =>
                              handleAddChange(
                                !addRestaurantData.isBonusPoint,
                                "isBonusPoint"
                              )
                            }
                            checked={addRestaurantData.isBonusPoint}
                          />
                          <label
                            htmlFor="isBonusPoint"
                            className="p-checkbox-label"
                            style={{
                              fontWeight: "bold",
                              userSelect: "none",
                              cursor: "pointer",
                            }}
                          >
                            Bonus Point
                          </label>
                        </div>

                        <div>
                          <Checkbox
                            inputId="hasMobileOrder"
                            onChange={() =>
                              handleAddChange(
                                !addRestaurantData.hasMobileOrder,
                                "hasMobileOrder"
                              )
                            }
                            checked={addRestaurantData.hasMobileOrder}
                          />
                          <label
                            htmlFor="hasMobileOrder"
                            className="p-checkbox-label"
                            style={{
                              fontWeight: "bold",
                              userSelect: "none",
                              cursor: "pointer",
                            }}
                          >
                            Mobile Order
                          </label>
                        </div>
                        <Button
                          label="Add"
                          style={{ width: "100%" }}
                          onClick={() => {
                            addRestaurant(addRestaurantData);
                          }}
                        />
                      </Stack>
                    </Stack>
                  </div>
                </Card>
              </TabPanel>
              <TabPanel leftIcon="fas fa-edit" header="Edit">
                <Card title="Edit Restaurant">
                  <Stack vertical spacing="none" style={{ fontSize: "16px" }}>
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        1. Search and modify -{" "}
                      </span>
                      Modifing restaruant is as easy as adding, you just need to
                      enter ID of the item, click search and then edit the info
                      that you get
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        2. Editable columns -{" "}
                      </span>
                      Try to click on the column, if it turns into input field
                      it means that you can edit it like a normal spreadsheet
                      column, it will be saved when you click outside the cell.
                      If nothing happens it is not implemented yet and it will
                      be in near future.
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>3. Cusine - </span>
                      Cusine MUST be separated by space, database interpets
                      commas as a separator sign and will try to divide it into
                      multiple columns, also comma separation is not suitable
                      for searching and csv exports which can be vital for the
                      app.
                      <br /> <span style={{ fontWeight: "bold" }}>
                        Good:
                      </span>{" "}
                      American Turkish Asian
                      <br /> <span style={{ fontWeight: "bold" }}>
                        {" "}
                        Bad:{" "}
                      </span>{" "}
                      America,Turkish,Asian
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>4. Search - </span>
                      Items are searched by ID, it was implemented that way
                      because of execution time. You can use filter input fields
                      to find the restaurant you need and then use the ID
                    </p>
                    <p style={{ fontWeight: "bold", color: "red" }}>
                      Please also note that,for now, data is not veified and
                      everything can pass, check the input before you click add,
                      but if you do make a mistake you can always edit it in
                      edit tab.
                    </p>
                  </Stack>
                  <Stack>
                    <InputText
                      value={modifyRestaurantId}
                      onChange={(e) => setModifyRestaurantId(e.target.value)}
                    />
                    <Button
                      id="searchRestaurantModify"
                      label="Search"
                      onClick={() => {
                        fetchRestaurant(modifyRestaurantId, "modify", true);
                      }}
                    />
                  </Stack>
                  <br />
                  <br />
                  {modifiedDataVisible && (
                    <Stack spacing="loose">
                      <Stack alignment="center">
                        <span className="p-float-label">
                          <InputText
                            id="restaurantName"
                            label="Restaurant Name"
                            value={modifiedData.name}
                            onChange={(e) =>
                              handleModifyChange(e.target.value, "name")
                            }
                          />

                          <label html For="float-input">
                            Restaurant Name
                          </label>
                        </span>

                        <Dropdown
                          id="resortDropdown"
                          className="EditProfile-resortDropdown"
                          placeholder="Resort"
                          label="resort"
                          value={modifiedData.resortId}
                          options={restaurantResorts}
                          onChange={(e) => {
                            handleModifyChange(e.target.value, "resortId");
                          }}
                          className="EditProfile-FullWidthDropdown"
                        />
                        <Dropdown
                          id="themeParkDropdown"
                          className="EditProfile-resortDropdown"
                          placeholder="Theme Park"
                          label="themePark"
                          value={modifiedData.themeParkId}
                          options={restaurantThemePark}
                          onChange={(e) =>
                            handleModifyChange(e.target.value, "themeParkId")
                          }
                          className="EditProfile-FullWidthDropdown"
                        />

                        <span className="p-float-label">
                          <InputText
                            id="land"
                            label="Land"
                            value={modifiedData.land}
                            onChange={(e) =>
                              handleModifyChange(e.target.value, "land")
                            }
                          />

                          <label html For="float-input">
                            Land{" "}
                            <span
                              style={{
                                color: "blue",
                                fontWeight: "bold",
                                fontSize: "10px",
                              }}
                            >
                              - optional{" "}
                            </span>
                          </label>
                        </span>

                        <span className="p-float-label">
                          <InputText
                            id="pavilion"
                            label="Pavilion"
                            value={modifiedData.pavilion}
                            onChange={(e) =>
                              handleModifyChange(e.target.value, "pavilion")
                            }
                          />

                          <label html For="float-input">
                            Pavilion{" "}
                            <span
                              style={{
                                color: "blue",
                                fontWeight: "bold",
                                fontSize: "10px",
                              }}
                            >
                              {" "}
                              - optional{" "}
                            </span>
                          </label>
                        </span>

                        <span className="p-float-label">
                          <InputText
                            id="resortHotel"
                            label="Resort Hotel"
                            value={modifiedData.resortHotel}
                            onChange={(e) =>
                              handleModifyChange(e.target.value, "resortHotel")
                            }
                          />

                          <label html For="float-input">
                            Resort Hotel{" "}
                            <span
                              style={{
                                color: "blue",
                                fontWeight: "bold",
                                fontSize: "10px",
                              }}
                            >
                              {" "}
                              - optional{" "}
                            </span>
                          </label>
                        </span>
                      </Stack>

                      <Stack alignment="center">
                        <Dropdown
                          id="typeDropdown"
                          className="EditProfile-resortDropdown"
                          placeholder="Type"
                          label="types"
                          value={modifiedData.type}
                          options={restaurantTypes}
                          onChange={(e) =>
                            handleModifyChange(e.target.value, "type")
                          }
                          className="EditProfile-FullWidthDropdown"
                        />
                        <Dropdown
                          id="experience"
                          className="EditProfile-resortDropdown"
                          placeholder="Experience"
                          label="experience"
                          value={modifiedData.experience}
                          options={restaurantExperience}
                          onChange={(e) =>
                            handleModifyChange(e.target.value, "experience")
                          }
                          className="EditProfile-FullWidthDropdown"
                        />
                        <Dropdown
                          id="mealPeriod"
                          className="EditProfile-resortDropdown"
                          placeholder="Meal Period"
                          label="mealPeriod"
                          value={modifiedData.mealPeriod}
                          options={restaurantMealPeriod}
                          onChange={(e) =>
                            handleModifyChange(e.target.value, "mealPeriod")
                          }
                          className="EditProfile-FullWidthDropdown"
                        />
                        <Dropdown
                          id="availability"
                          className="EditProfile-resortDropdown"
                          placeholder="Availability"
                          label="availability"
                          value={modifiedData.availability}
                          options={restaurantAvailability}
                          onChange={(e) =>
                            handleModifyChange(e.target.value, "availability")
                          }
                          className="EditProfile-FullWidthDropdown"
                        />

                        <span className="p-float-label">
                          <InputText
                            id="cusine"
                            label="Cusine"
                            ch
                            value={modifiedData.cusine}
                            onChange={(e) =>
                              handleModifyChange(e.target.value, "cusine")
                            }
                          />

                          <label html For="float-input">
                            Cusine{" "}
                            <span
                              style={{
                                color: "blue",
                                fontWeight: "bold",
                                fontSize: "10px",
                              }}
                            >
                              {" "}
                              - max 160 charachters{" "}
                            </span>
                          </label>
                        </span>

                        <div>
                          <Checkbox
                            inputId="goldenSpoon"
                            onChange={() =>
                              handleModifyChange(
                                !modifiedData.isGoldenSpoonPoint,
                                "isGoldenSpoonPoint"
                              )
                            }
                            checked={modifiedData.isGoldenSpoonPoint}
                          />
                          <label
                            htmlFor="goldenSpoon"
                            className="p-checkbox-label"
                            style={{
                              fontWeight: "bold",
                              userSelect: "none",
                              cursor: "pointer",
                            }}
                          >
                            Golden Spoon
                          </label>
                        </div>

                        <div>
                          <Checkbox
                            inputId="isBonusPoint"
                            onChange={() =>
                              handleModifyChange(
                                !modifiedData.isBonusPoint,
                                "isBonusPoint"
                              )
                            }
                            checked={modifiedData.isBonusPoint}
                          />
                          <label
                            htmlFor="isBonusPoint"
                            className="p-checkbox-label"
                            style={{
                              fontWeight: "bold",
                              userSelect: "none",
                              cursor: "pointer",
                            }}
                          >
                            Bonus Point
                          </label>
                        </div>

                        <div>
                          <Checkbox
                            inputId="hasMobileOrder"
                            onChange={() =>
                              handleModifyChange(
                                !modifiedData.hasMobileOrder,
                                "hasMobileOrder"
                              )
                            }
                            checked={modifiedData.hasMobileOrder}
                          />
                          <label
                            htmlFor="hasMobileOrder"
                            className="p-checkbox-label"
                            style={{
                              fontWeight: "bold",
                              userSelect: "none",
                              cursor: "pointer",
                            }}
                          >
                            Mobile Order
                          </label>
                        </div>
                      </Stack>

                      <Button
                        disabled={isUpdatingRestaurant}
                        id="saveChanges"
                        label="Save Changes"
                        style={{ width: "100%" }}
                        onClick={() => {
                          modifyRestaurant(modifiedData);
                        }}
                      />
                    </Stack>
                  )}
                </Card>
              </TabPanel>
              <TabPanel leftIcon="fas fa-trash-alt" header="Remove">
                <Card title="Remove Restaurant">
                  <Stack vertical spacing="none" style={{ fontSize: "16px" }}>
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        1. Search and remove -{" "}
                      </span>
                      Removing restaruant is as easy as adding, you just need to
                      enter ID of the item, click search and then click on
                      remove the remove the item.
                    </p>

                    <p style={{ fontWeight: "bold", color: "red" }}>
                      Please also note that restaurants won't be deleted, they
                      will be remvoed from the list, so if you remove something
                      by accident it can be reverted, but please try to avoid
                      deleting something if possible because it will waste
                      memory
                    </p>
                  </Stack>
                  <InputText
                    value={removeItemId}
                    onChange={(e) => setRemoveItemId(e.target.value)}
                  />
                  <Button
                    label="Search"
                    onClick={() => {
                      fetchRestaurant(removeItemId, "remove", true);
                    }}
                  />
                  {removeData.name !== "" ? (
                    <Stack vertical spacing="tight">
                      <Stack vertical spacing="extraTight">
                        <span>
                          <span style={{ fontWeight: "bold" }}> Name: </span>
                          {removeData.name}
                        </span>
                        <span>
                          <span style={{ fontWeight: "bold" }}>
                            Created Date:{" "}
                          </span>
                          {removeData.createdAt}
                        </span>
                      </Stack>
                      <Stack vertical spacing="extraTight">
                        <p style={{ color: "red" }}>
                          Are you sure that you want to delete this item ?{" "}
                        </p>
                        <Button
                          label="Remove"
                          onClick={() => {
                            removeRestaurant(removeItemId);
                          }}
                        />
                      </Stack>
                    </Stack>
                  ) : (
                    <p>No item found or the field is blank </p>
                  )}
                </Card>
              </TabPanel>
            </TabView>
          </ScrollPanel>
        </Dialog>
      </Stack>
    </Page>
  );
};
