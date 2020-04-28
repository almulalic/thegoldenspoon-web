import React, { useState } from "react";
import { Stack } from "../../../../elements/stack/Stack";
import _ from "lodash";
import "./GuestRestaurantCard.scss";
import { Rating } from "primereact/rating";
import { SelectButton } from "primereact/selectbutton";
import { ProgressSpinner } from "primereact/progressspinner";

const GuestRestaurantCard = ({ restaurant }) => {
  // MAIN STATES
  const [selectedStatus, changeSelectedStatus] = useState(
    restaurant.record.status ?? 0
  );
  const [isFavorite, setIsFavorite] = useState(
    restaurant.record.isFavorite ?? 0
  );

  const statusOptions = [
    { label: "Not Eaten Here", value: 0 },
    { label: "Booked for next trip", value: 1 },
    { label: "Eaten here", value: 2 },
  ];

  return (
    <div className="RestaurantCard">
      <Stack alignment="center" distribution="center" vertical>
        <h3 style={{ fontWeight: "bold" }}>{restaurant.name}</h3>
        <Stack alignment="center" distribution="center">
          <SelectButton
            value={selectedStatus}
            options={statusOptions}
            className="RestaurantCard-StatusE"
            disabled
            // itemTemplate={renderStatusButton}
          />
          <div>
            Favorite: <Rating value={isFavorite} stars={1} cancel disabled />{" "}
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default GuestRestaurantCard;
