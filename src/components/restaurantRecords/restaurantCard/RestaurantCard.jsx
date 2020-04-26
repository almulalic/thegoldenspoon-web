import React, { useState } from "react";
import { Message } from "primereact/message";
import { GetStatusName } from "../../../shared/RestaurantUtils";
import { Stack } from "../../../elements/stack/Stack";
import _ from "lodash";
import "./RestaruantCard.scss";
import { Rating } from "primereact/rating";

const RestaurantCard = ({ restaurant }) => {
  const [isFavorite, setIsFavorite] = useState(restaurant.record.isFavorite);
  console.log(restaurant);
  return (
    <div>
      {_.isEmpty(restaurant.record) ? (
        <div className="restaurantCard">
          <p>You didnt eat in this restaurant yet</p>
        </div>
      ) : (
        <div className="restaurantCard">
          <Stack alignment="center" distribution="center">
            <Message
              severity="info"
              text={GetStatusName(restaurant.record.status)}
            />
            <p>
              Favorite:{" "}
              <Rating
                value={isFavorite}
                onChange={(e) => setIsFavorite(e.value)}
                stars={1}
                cancel={1}
              />{" "}
            </p>
          </Stack>
        </div>
      )}
    </div>
  );
};

export default RestaurantCard;
