import React, { useEffect, useState } from "react";
import identities from "../../api/identities";

export default function AccountConfirmation(props) {
  const [confirmationState, setConfirmationState] = useState("");

  //   export enum ConfirmationEnums {
  //     UserAlreadyConfirmed = 1,
  //     UserSuccessfullyConfirmed = 2,
  //     ConfirmationTokenRejected = 3,
  //     InternalServerError = 4,
  //   }

  useEffect(() => {
    identities
      .confirmation(props.match.params.token)
      .then((confirmationResponse) => {
        switch (confirmationResponse.data) {
          case 1:
            setConfirmationState("User already confirmed !");
            break;
          case 2:
            setConfirmationState("User successfully confirmed !");
            break;
          case 3:
            setConfirmationState("Confirmation token rejected !");
            break;
          case 4:
            setConfirmationState("Confrimation token malformed !");
            break;
          default:
            setConfirmationState("Internal server error !");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>{confirmationState}</div>;
}
