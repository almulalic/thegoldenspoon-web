import React, { useState } from "react";
import { Stack } from "../../../../elements/stack/Stack";
import _ from "lodash";
import "./UserRestaurantCard.scss";
import { Rating } from "primereact/rating";
import { SelectButton } from "primereact/selectbutton";
import { ProgressSpinner } from "primereact/progressspinner";
import restaurantRecord from "../../../../api/restaurantRecord";

const UserRestaurantCard = ({ restaurant }) => {
  // MAIN STATES
  const [selectedStatus, changeSelectedStatus] = useState(
    restaurant.record.status ?? 0
  );
  const [isFavorite, setIsFavorite] = useState(
    restaurant.record.isFavorite ?? 0
  );
  // LOADING STATES
  const [isUpdatingRecord, setIsUpdatingRecord] = useState(false);

  const statusOptions = [
    { label: "Not Eaten Here", value: 0 },
    { label: "Booked for next trip", value: 1 },
    { label: "Eaten here", value: 2 },
  ];

  const handleStatusChange = (status, favorite) => {
    setIsUpdatingRecord(true);

    restaurantRecord
      .updateRestaurantRecord({
        restaurantId: restaurant.id,
        status: status,
        isFavorite: favorite,
      })
      .then(() => {
        changeSelectedStatus(status);
        setIsFavorite(favorite);
        setIsUpdatingRecord(false);
      })
      .catch((err) => {
        setIsUpdatingRecord(false);
        console.log(err);
      });
  };

  // const renderStatusButton = (option) => {
  //   return (
  //     <div
  //       style={{
  //         textAlign: "center",
  //         fontWeight: "bold",
  //         width: "100px",
  //         color: "black",
  //         background:
  //           option.value === 0
  //             ? "lightsalmon"
  //             : option.value === 1
  //             ? "lightgoldenrodyellow"
  //             : "lightgreen",
  //       }}
  //     >
  //       <div style={{ marginTop: "1em" }}>{option.label}</div>
  //     </div>
  //   );
  // };

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
              onChange={(e) => handleStatusChange(e.value, isFavorite)}
              // itemTemplate={renderStatusButton}
            />
            <div>
              Favorite:{" "}
              <Rating
                value={isFavorite}
                onChange={(e) => handleStatusChange(selectedStatus, e.value)}
                stars={1}
                cancel
              />{" "}
            </div>
          </Stack>
        </Stack>
      )}
    </div>
  );
};

export default UserRestaurantCard;
