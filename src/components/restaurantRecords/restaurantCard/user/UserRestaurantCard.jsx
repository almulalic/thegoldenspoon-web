import React, { useState } from "react";
import { Stack } from "../../../../elements/stack/Stack";
import _ from "lodash";
import "./UserRestaurantCard.scss";
import { Rating } from "../../../rating/Rating";
import { SelectButton } from "primereact/selectbutton";
import { ProgressSpinner } from "primereact/progressspinner";
import restaurantRecord from "../../../../api/restaurantRecord";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const UserRestaurantCard = ({ restaurant }) => {
  // MAIN STATES
  const [selectedStatus, changeSelectedStatus] = useState(
    restaurant.record.status ?? 0
  );
  const [isFavorite, setIsFavorite] = useState(
    restaurant.record.isFavorite ?? 0
  );
  const [dateVisited, setDateVisited] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  // LOADING STATES
  const [isUpdatingRecord, setIsUpdatingRecord] = useState(false);

  const statusOptions = [
    { label: "Not Eaten Here", value: 0 },
    { label: "Booked for next trip", value: 1 },
    { label: "Eaten here", value: 2 },
  ];

  const handleStatusChange = (status) => {
    setIsUpdatingRecord(true);

    restaurantRecord
      .upsertRestaurantRecord({
        restaurantId: restaurant.id,
        status: status,
      })
      .then(() => {
        changeSelectedStatus(status);
        setIsUpdatingRecord(false);
      })
      .catch((err) => {
        setIsUpdatingRecord(false);
        console.log(err);
      });
  };

  const handleFavoriteChange = (favorite) => {
    setIsUpdatingRecord(true);

    restaurantRecord
      .upsertRestaurantRecord({
        restaurantId: restaurant.id,
        isFavorite: favorite,
      })
      .then(() => {
        setIsFavorite(favorite);
        setIsUpdatingRecord(false);
      })
      .catch((err) => {
        setIsUpdatingRecord(false);
        console.log(err);
      });
  };

  const handleDateChange = (date) => {
    setIsUpdatingRecord(true);

    restaurantRecord
      .upsertRestaurantRecord({
        restaurantId: restaurant.id,
        dateVisited: date,
      })
      .then(() => {
        setDateVisited(date);
        setIsUpdatingRecord(false);
      })
      .catch((err) => {
        setIsUpdatingRecord(false);
        console.log(err);
      });
  };

  return (
    <div className="RestaurantCard">
      {isUpdatingRecord ? (
        <Stack alignment="center" distribution="center">
          <ProgressSpinner />
        </Stack>
      ) : (
        <Stack alignment="center" distribution="center" vertical>
          <h3 style={{ fontWeight: "bold" }}>{restaurant.name}</h3>
          <Stack alignment="center" distribution="center">
            <SelectButton
              value={selectedStatus}
              options={statusOptions}
              className="RestaurantCard-StatusE"
              onChange={(e) => handleStatusChange(e.value)}
              // itemTemplate={renderStatusButton}
            />

            <p>Favorite: </p>
            {isFavorite ? (
              <i
                className="pi pi-star Rating--NotSelected"
                onClick={(e) => handleFavoriteChange(!isFavorite)}
              />
            ) : (
              <i
                className="pi pi-star-o Rating--Selected"
                onClick={(e) => handleFavoriteChange(!isFavorite)}
              />
            )}
            <Stack alignment="center">
              <p>Date visited</p>
              <Calendar
                value={dateVisited}
                onChange={(e) => handleDateChange(e.target.value)}
                showIcon={true}
              />
            </Stack>

            <Dialog
              header="Menu"
              visible={isModalVisible}
              style={{ width: "50vw" }}
              modal={true}
              onHide={() => setModalVisible(false)}
            >
              <Stack
                alignment="
                center"
              >
                <InputTextarea
                  rows={5}
                  cols={30}
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
              </Stack>
            </Dialog>
            <Stack>
              <p>Menu</p>
              <Button
                label="Show"
                icon="pi pi-info-circle"
                onClick={(e) => setModalVisible(true)}
              />
            </Stack>
          </Stack>
        </Stack>
      )}
    </div>
  );
};

export default UserRestaurantCard;
