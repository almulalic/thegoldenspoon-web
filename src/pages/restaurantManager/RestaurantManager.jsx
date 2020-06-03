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
        setRestaurantResorts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    lookup
      .FetchThemeParks()
      .then((response) => {
        setRestaurantThemePark(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    lookup
      .FetchRestaurantTypes()
      .then((response) => {
        setRestaurantTypes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    lookup
      .FetchRestaurantExperience()
      .then((response) => {
        setRestaurantExperience(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    lookup
      .FetchResturantMealPeriod()
      .then((response) => {
        setRestaurantMealPeriod(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    lookup
      .FetchResturantAvailability()
      .then((response) => {
        setRestaurantAvailability(response.data);
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

  const render = (rowData, row) => {
    if (row.field === "type") return restaurantTypes[rowData.type];
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

  const handleChange = useCallback((newValue, id) => {
    setRestaurantData((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  }, []);

  const handleModifyChange = useCallback((newValue, id) => {
    setModifiedData((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  }, []);

  // FETCH SINGLE RESTAURANT

  const fetchRestaurant = (id, purpose, populate = false) => {
    restaurants
      .fetchRestaurant(id)
      .then((res) => {
        if (populate) {
          if (purpose == "modify") {
            if (res.data != 1) setModifiedData(res.data);
            else setModifiedData({ name: "" });
          } else {
            if (res.data != 1) setRemoveData(res.data);
            else setRemoveData({ name: "" });
          }
        }
      })
      .catch((err) => console.log(err));
  };

  // ADD RESTAURANT

  const addRestaurant = (body) => {
    restaurants
      .addNewRestaurant(body)
      .then((response) => {
        if (response.data == 1) toast.error("Id not found or already deleted");
        else toast.success("Restaurant successfully added");
        fetchRestaurantsData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [restaurantData, setRestaurantData] = useState({
    name: "",
    resortId: 1,
    themeParkId: 1,
    land: "",
    pavilion: "",
    resortHotel: "",
    type: 0,
    experience: 0,
    mealPeriod: 0,
    availability: 0,
    cusine: "",
    isGoldenSpoonPoint: false,
    isBonusPoint: false,
    hasMobileOrder: false,
    createdAt: new Date(),
  });

  // MODIFY RESTAURANT

  const [modifyRestaurantId, setModifyRestaurantId] = useState();
  const [modifiedData, setModifiedData] = useState({
    name: "",
    resortId: 1,
    themeParkId: 1,
    land: "",
    pavilion: "",
    resortHotel: "",
    type: 0,
    experience: 0,
    mealPeriod: 0,
    availability: 0,
    cusine: "",
    isGoldenSpoonPoint: false,
    isBonusPoint: false,
    hasMobileOrder: false,
    createdAt: new Date(),
  });
  const [modifiedMessage, setModifiedMessage] = useState();
  const modifyRestaurant = (id) => {
    restaurants
      .modifyRestaurnat(id)
      .then((res) => {
        setModifiedMessage("Successfully modified!");
        fetchRestaurantsData();
      })
      .catch((err) => {
        console.log(err);
        setModifiedMessage("Error");
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
      .then((resp) => {
        toast.success("Item successfully removed");
        fetchRestaurantsData();
      })
      .catch((err) => console.log(err));
  };

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
                />
                <Column
                  field="themePark"
                  header="ThemePark"
                  style={{ width: "10%" }}
                  sortable
                  filter
                  filterPlaceholder="Filter"
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
              <TabPanel leftIcon="fas fa-plus" header="Add New">
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
                    <Stack alignment="center" vertical>
                      <Stack alignment="center">
                        <span className="p-float-label">
                          <InputText
                            id="restaurantName"
                            label="Restaurant Name"
                            value={restaurantData.name}
                            onChange={(e) =>
                              handleChange(e.target.value, "name")
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
                          value={restaurantData.resortId}
                          options={restaurantResorts}
                          onChange={(e) =>
                            handleChange(e.target.value, "resort")
                          }
                          className="EditProfile-FullWidthDropdown"
                        />
                        <Dropdown
                          id="themeParkDropdown"
                          className="EditProfile-resortDropdown"
                          placeholder="Theme Park"
                          label="themePark"
                          value={restaurantData.themeParkId}
                          options={restaurantThemePark}
                          onChange={(e) =>
                            handleChange(e.target.value, "themePark")
                          }
                          className="EditProfile-FullWidthDropdown"
                        />

                        <span className="p-float-label">
                          <InputText
                            id="land"
                            label="Land"
                            value={restaurantData.land}
                            onChange={(e) =>
                              handleChange(e.target.value, "land")
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
                            value={restaurantData.pavilion}
                            onChange={(e) =>
                              handleChange(e.target.value, "pavilion")
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
                            value={restaurantData.resortHotel}
                            onChange={(e) =>
                              handleChange(e.target.value, "resortHotel")
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
                          value={restaurantData.type}
                          options={restaurantTypes}
                          onChange={(e) => handleChange(e.target.value, "type")}
                          className="EditProfile-FullWidthDropdown"
                        />
                        <Dropdown
                          id="experience"
                          className="EditProfile-resortDropdown"
                          placeholder="Experience"
                          label="experience"
                          value={restaurantData.experience}
                          options={restaurantExperience}
                          onChange={(e) =>
                            handleChange(e.target.value, "experience")
                          }
                          className="EditProfile-FullWidthDropdown"
                        />
                        <Dropdown
                          id="mealPeriod"
                          className="EditProfile-resortDropdown"
                          placeholder="Meal Period"
                          label="mealPeriod"
                          value={restaurantData.mealPeriod}
                          options={restaurantMealPeriod}
                          onChange={(e) =>
                            handleChange(e.target.value, "mealPeriod")
                          }
                          className="EditProfile-FullWidthDropdown"
                        />
                        <Dropdown
                          id="availability"
                          className="EditProfile-resortDropdown"
                          placeholder="Availability"
                          label="availability"
                          value={restaurantData.availability}
                          options={restaurantAvailability}
                          onChange={(e) =>
                            handleChange(e.target.value, "availability")
                          }
                          className="EditProfile-FullWidthDropdown"
                        />

                        <span className="p-float-label">
                          <InputText
                            id="cusine"
                            label="Cusine"
                            ch
                            value={restaurantData.cusine}
                            onChange={(e) =>
                              handleChange(e.target.value, "cusine")
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
                              handleChange(
                                !restaurantData.isGoldenSpoonPoint,
                                "isGoldenSpoonPoint"
                              )
                            }
                            checked={restaurantData.isGoldenSpoonPoint}
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
                              handleChange(
                                !restaurantData.isBonusPoint,
                                "isBonusPoint"
                              )
                            }
                            checked={restaurantData.isBonusPoint}
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
                              handleChange(
                                !restaurantData.hasMobileOrder,
                                "hasMobileOrder"
                              )
                            }
                            checked={restaurantData.hasMobileOrder}
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
                        label="Add"
                        style={{ width: "100%" }}
                        onClick={() => {
                          addRestaurant(restaurantData);
                        }}
                      />
                    </Stack>
                  </div>
                </Card>
              </TabPanel>
              <TabPanel leftIcon="fas fa-edit" header="Edit">
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
                    Try to click on the column, if it turns into input field it
                    means that you can edit it like a normal spreadsheet column,
                    it will be saved when you click outside the cell. If nothing
                    happens it is not implemented yet and it will be in near
                    future.
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>3. Cusine - </span>
                    Cusine MUST be separated by space, database interpets commas
                    as a separator sign and will try to divide it into multiple
                    columns, also comma separation is not suitable for searching
                    and csv exports which can be vital for the app.
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
                    but if you do make a mistake you can always edit it in edit
                    tab.
                  </p>
                </Stack>
                <Stack>
                  <InputText
                    value={modifyRestaurantId}
                    onChange={(e) => setModifyRestaurantId(e.target.value)}
                  />
                  <Button
                    label="Search"
                    onClick={() => {
                      fetchRestaurant(modifyRestaurantId, "modify", true);
                    }}
                  />
                </Stack>
                <br />
                <br />
                {modifiedData.name !== "" && (
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
                        value={restaurantData.resortId}
                        options={restaurantResorts}
                        onChange={(e) => handleChange(e.target.value, "resort")}
                        className="EditProfile-FullWidthDropdown"
                      />
                      <Dropdown
                        id="themeParkDropdown"
                        className="EditProfile-resortDropdown"
                        placeholder="Theme Park"
                        label="themePark"
                        value={restaurantData.themeParkId}
                        options={restaurantThemePark}
                        onChange={(e) =>
                          handleChange(e.target.value, "themePark")
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
                      label="Save Changes"
                      style={{ width: "100%" }}
                      onClick={() => {
                        modifyRestaurant(modifiedData);
                      }}
                    />

                    <p style={{ fontWeight: "bold" }}>{modifiedMessage}</p>
                  </Stack>
                )}
              </TabPanel>
              <TabPanel leftIcon="fas fa-trash-alt" header="Remove">
                <Stack vertical spacing="none" style={{ fontSize: "16px" }}>
                  <p>
                    <span style={{ fontWeight: "bold" }}>
                      1. Search and remove -{" "}
                    </span>
                    Removing restaruant is as easy as adding, you just need to
                    enter ID of the item, click search and then click on remove
                    the remove the item.
                  </p>

                  <p style={{ fontWeight: "bold", color: "red" }}>
                    Please also note that restaurants won't be deleted, they
                    will be remvoed from the list, so if you remove something by
                    accident it can be reverted, but please try to avoid
                    deleting something if possible because it will waste memory
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
              </TabPanel>
            </TabView>
          </ScrollPanel>
        </Dialog>
      </Stack>
    </Page>
  );
};
